const User=require('../models/UserModel')
const Course=require('../models/CourseModel')
const jwt=require('jsonwebtoken')
const catchAsync=require('../utils/catchAsync')
const AppError=require('../utils/appError')
const {promisify}=require('util')
const crypto=require('crypto')
const {authSchema}=require('../models/validateSchema')
const UserModel = require('../models/UserModel')
const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");
const bcrypt=require('bcrypt')
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
let transporter = nodemailer.createTransport({
    service: 'gmail', // Example using Gmail
    auth: {
        user: 'codeetgo@gmail.com',
        pass: "ajtr hgyi yqsz tkgv"
    }
});
const createPasswordResetToken=(id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}
exports.signup=catchAsync(async (req,res,next)=>{
    const result=await authSchema.validateAsync(req.body)
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
    
    
   
    if(!email||!password){
        return next(new AppError('Please provide email and password!',400))
    }else{
        let user= await User.findOne({email:email}).select('+password')
        if(!user || !await user.correctPassword(password,user.password)){
            return next(new AppError('Incorrect email or password',401))
        }else{
            if(!user.isLogged){
    const token= signToken(user._id)
    user=await User.findOneAndUpdate({email:email}, {  isLogged: true  },{ new: true });
    
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    // res.cookie("authorization",token,{
    //     path:'/'
    // })
    // res.setHeader('Set-Cookie', 'authorization==lmmlmlkm; Path=/');
    res.status(200).json({
        status:"success",
        token,
        user
    })}else{
        res.status(500).json({
            status:"failed",
            message:"you have already logged in on another device"
        })
    }
}}
})
exports.logout=catchAsync(async (req,res)=>{
    const userID=req.params.userID
    await User.findOneAndUpdate({_id:userID},{isLogged:false},{new:true})

    res.status(200).json({ok:true})
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

const nodemailer = require('nodemailer');




exports.forgetPassword=catchAsync(async(req,res,next)=>{
    console.log(req.body.email)
    const user=await User.findOne({email:"melete@gmail.com"})
    console.log("hello")
    if(!user){
        return next(new AppError('There is no user with this email address',404));
    }
    const resetToken=createPasswordResetToken(user._id)
    const hashedToken=crypto.createHash('sha256').update(token).digest('hex')
    await User.findByIdAndUpdate(user._id, {
        passwordResetToken: hashedToken,
        passwordResetExpires: Date.now() + 10 * 60 * 1000 // Token expires in 10 minutes
    });
    let mailOptions = {
    from: '"CodeET" <codeetgo@gmail.com>', // Sender address
    to: req.body.email, // List of recipients
    subject: 'Reset Your Password', // Subject line
    text: 'Greetings from the team.', // Plain text body
    html: `<p>Hi ${user.name},</p><p>We received a request to reset your password. Click the link below to reset it:</p><button><a href="http://code-et.vercel.app/resetPassword/${resetToken}">Reset Password</a></button> <p>If you didn't request a password reset, please ignore this email.</p><p>Thanks, Team</p>`
};
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        res.status(400).json({
            status:400,
            message:"An Error Occured"})
        console.log(error)
    }
    console.log('Email sent successfully:', info.response);
    res.status(200).json({status:200,
        message:"Email sent successfully, Please check your email to verify and please check the spams folder in your email if you don't find it in your inbox"})
});
})

exports.resetPassword=catchAsync(async (req,res,next)=>{
        const token=req.params.resetToken
         const hashedToken=crypto.createHash('sha256').update(token).digest('hex')
         const user=await User.findOne({passwordResetToken:hashedToken})
         if(!user){
            return next(AppError('Token is invalid or has expired', 400))
         }
        
        
        res.status(200).json({
            status: 200,
            message: 'Email verified successfully'
        });

    })
exports.updateForgottenPassword=catchAsync(async(req,res)=>{
    const user=await User.findOne({email:req.params.email})
    user.password = await bcrypt.hash(req.body.newPassword, 12);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        res.status(200).json({message:"Password Reset Successfully"})
})     
   








