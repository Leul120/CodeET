const User=require('../models/UserModel')
const Course=require('../models/CourseModel')
const jwt=require('jsonwebtoken')
const catchAsync=require('../utils/catchAsync')
const AppError=require('../utils/appError')
const {promisify}=require('util')
const crypto=require('crypto')
const {authSchema}=require('../models/validateSchema')
const UserModel = require('../models/UserModel')
const signToken=id=>{
    return jwt.sign({id:id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}
const signRefreshToken=(id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}
exports.signup=catchAsync(async (req,res,next)=>{
    const result=await authSchema.validateAsync(req.body)
    console.log(result)
    const newUser=await User.create({
        name:result.name,
        email:result.email,
        password:result.password,
        passwordConfirm:result.passwordConfirm,
        role:result.role,
        emailToken:crypto.randomBytes(64).toString("hex")
    })
    const token= signToken(newUser._id)
    res.status(201).json({
        status:'success',
        token,
        data:{
            user:newUser
        }
    })})
exports.login=catchAsync(async (req,res,next)=>{
    const {email,password}=req.body 
    
    const token=''
   
    if(!email||!password){
        return next(new AppError('Please provide email and password!',400))
    }else{
        const user= await User.findOne({email:email}).select('+password')
        console.log(user)
        if(!user || !await user.correctPassword(password,user.password)){
            return next(new AppError('Incorrect email or password',401))
        }
    const token= signToken(user._id)
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    // res.cookie("authorization",token,{
    //     path:'/'
    // })
    // res.setHeader('Set-Cookie', 'authorization==lmmlmlkm; Path=/');
    console.log(res.headers)
    res.status(200).json({
        status:"success",
        token,
        user
    })}
})
exports.protect=catchAsync(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1]
    }
    
    if(!token){
        return next(new AppError('You are not logged in! Please log in to get access',401))
    }
    const decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    const currentUser=await User.findById(decoded.id)
    if(!currentUser){
        return next(new AppError('The user belonging to this token does no longer exist.',401))
    }

    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError('User recently changed password! Please log in again',401))
    }
    req.user=currentUser
    next()
}) 
exports.restrictTo=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have the permission to perform this action',403))
        }
        next()
    }
}
exports.forgetPassword=catchAsync(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return next(new AppError('There is no user with this email address',404));
    }
    const resetToken=user.createPasswordResetToken()
    await user.save({validateBeforeSave:false})
})
exports.resetPassword=catchAsync(async(req,res,next)=>{
const hashedToken=crypto.createHash('sha256').update(req.params.token).digest('hex')
const user=await User.findOne({passwordResetToken:hashedToken,passwordResetExpires:{$gt:Date.now()}})
if(!user){
    return next(new AppError('Token is invalid or has expired',401))
}
user.password=req.body.password
user.passwordConfirm=req.body.passwordConfirm
user.passwordResetToken=undefined
user.passwordResetExpires=undefined
await user.save()
})
exports.checkEnrollment=catchAsync(async(req,res)=>{
    const {courseID}=req.params;
    const user=await User.findById(req.user._id)
    const ids=[]
    const length=user.courses.length
    for(let i=0;i<length;i++){
        ids.push(user.courses[i].toString())
    }
    res.json({
        status:ids.includes(courseID),
        course:await Course.findById(courseID)
    })
}) 
exports.verifyEmail=async (req,res)=>{
    try{
        const emailToken=req.body.emailToken;
        if(!emailToken)return res.status(404).json("Email token not found...")
            const user=await User.findOne({emailToken});
        if(user){
            user.emailToken=null;
            user.isVerified=true;
            await user.save()
            const token=signToken(user._id);
            res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token,
                isVerified:user?.isVerified
            })
        }else{
            res.status(404).json("Email verification failed,invalid token!")
        }
    }catch(error){
            console.log(error)
            res.status(500).json(error.message)
        }
}