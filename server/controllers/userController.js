const User = require('../models/UserModel');

const catchAsync = require('../utils/catchAsync');


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
      return res.status(404).json({ error: 'user not found' });
    }

    res.status(200).json({ user });
})

module.exports = { getUsers, postUser,getUser };
