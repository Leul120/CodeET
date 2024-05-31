const User = require('../models/UserModel');

const catchAsync = require('../utils/catchAsync');
const nodemailer=require('nodemailer')
const {v4:uuid}=require('uuid')
require('dotenv').config()
const emailSender=(req,res)=>{
  const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:"leulmelkamu16@gmail.com",
      pass:"leul@123"
    }
  })
  const mailOptions={
    from:"leulmelkamu15@gmail.com",
    to:'leulmelkamu16@gmail.com',
    subject:`Message from `,
    text:"hello"
  }
  transporter.sendMail(mailOptions,(error,info)=>{
    if(error){

      // res.send("error")
    }
    else{
     
      // res.send("success")
    }
  })
}
// emailSender()
  const getUsers = catchAsync(async (req, res,next) => {
    const users=await User.find();
      res.status(200).json({ 
        status:"success",
        results:users.length,
        data:{ users}
         });
})

const postUser =catchAsync(async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user._id);
    } catch (error) {
       
        res.status(500).json({ error: 'Internal server error' });
    }
})
const getUser = catchAsync(async (req, res) => {
    
    const userID = req.params.userID;
    const user = await User.findOne({ _id: userID });

    if (!user) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json({ user });
})

module.exports = { getUsers, postUser,getUser };
