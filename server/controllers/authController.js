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

const nodemailer = require('nodemailer');
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
const createPasswordResetToken=(id,expires)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET,{
        expiresIn:expires
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
        verificationCode:result.verificationCode
    })
    const token= signToken(newUser._id)
    await User.findOneAndUpdate({_id:newUser._id},{token:token})
    let mailOptions = {
    from: '"CodeET" <codeetgo@gmail.com>', // Sender address
    to: req.body.email, // List of recipients
    subject: 'Verify Your Email Address', // Subject line
    text: 'Welcome to CodeET!', // Plain text body
    html: `
        <p>Hi ${req.body.name},</p>
        <p>Welcome to CodeET! Please verify your email address by inserting this code in your verifying page:</p>
        <p>
           ${req.body.verificationCode}
        </p>
        <p>If you didn't create an account with CodeET, please ignore this email.</p>
        <p>Thanks, CodeET Team</p>
    `
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
        message:"Email sent successfully, Please check your email to verify and please check the spams folder in your email if you don't find it in your inbox",
            token,
            newUser})
})
    })
async function removeUnverifiedUsers() {
  try {
    const unverifiedUsers = await User.find({
      isVerified: false,
      created_at: { $lte: new Date(Date.now() - 5 * 60 * 1000) },
    });
    for (let i=0;i<unverifiedUsers.length;i++) {
        const id=unverifiedUsers[i]._id
      await User.findOneAndDelete({_id:id})
    }
  } catch (err) {
    console.error('Error removing unverified users:', err);
  }
}
setInterval(removeUnverifiedUsers, 5 * 60 * 1000);
exports.verifyEmail=catchAsync(async(req,res)=>{
       const verificationCode=req.body.verificationCode
       const user=await User.findOne({_id:req.params.userID})
       console.log(verificationCode)
        if(verificationCode==user.verificationCode){
            console.log("true")
            await User.findOneAndUpdate({_id:user._id},{isVerified:true}) 
            console.log(user)
        res.status(201).json({
            status:'success',
            message:"Email verified successfully!",
            user      
    })
    const t=await User.findOneAndUpdate({_id:user._id},{token:"",isLogged:true})
    console.log(t)
}  else{
    console.log("incorrect")
    res.status(400).json({
        message:"Incorrect Code. Please try again"
    })
}
    })
exports.login=catchAsync(async (req,res,next)=>{
    const {email,password}=req.body 
    
    
   
    if(!email||!password){
        return next(new AppError('Please provide email and password!',400))
    }else{
        let user= await User.findOne({email:email}).select('+password')
        if(!user || !await user.correctPassword(password,user.password) ||!user.isVerified){
            return next(new AppError('Incorrect email or password',401))
        }else{
            if(!user.isLogged){
    const token= signToken(user._id)
    user=await User.findOneAndUpdate({email:email}, {  isLogged: true  },{ new: true });
    
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
    const user=await User.findOneAndUpdate({_id:userID},{isLogged:false},{new:true})
    console.log(user)
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





exports.forgetPassword=catchAsync(async(req,res,next)=>{
    console.log(req.body.email)
    const user=await User.findOne({email:req.body.email})
    console.log("hello")
    if(!user){
        return next(new AppError('There is no user with this email address',404));
    }
    const resetToken=createPasswordResetToken(user._id,Date.now() + 10 * 60 * 1000)
    const hashedToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    await User.findByIdAndUpdate(user._id, {
        passwordResetToken: hashedToken,
        passwordResetExpires: Date.now() + 10 * 60 * 1000 // Token expires in 10 minutes
    });
    let mailOptions = {
    from: '"CodeET" <codeetgo@gmail.com>', // Sender address
    to: req.body.email, // List of recipients
    subject: 'Reset Your Password', // Subject line
    text: 'Greetings from the team.', // Plain text body
    html: `
        <p>Hi ${user.name},</p>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <p>
            <a href="http://code-et.vercel.app/resetPassword/${resetToken}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </p>
        <p>If you didn't request a password reset, please ignore this email.</p>
        <p>Thanks, Team</p>
    `
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
    const email=req.body.email
    const password=await bcrypt.hash(req.body.password, 12)
    const user=await User.findOneAndUpdate({email:email},{
        password:password,
        passwordResetToken:undefined,
        passwordResetExpires:undefined
    },{ new: true })
    console.log(user)

        res.status(200).json({message:"Password Reset Successfully"})
})     
   








