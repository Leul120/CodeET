const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const crypto=require('crypto')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide name'],
        trim:true,
    },
    
    email:{
        type:String,
        required:[true,'Must provide email'],
        unique:true,
        lowercase:true,
        // validate:[validator.isEmail,'Please provide a valid email']

    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:8,
        select:false,

        
    },
    passwordConfirm:{
        type:String,
        required:[true,'please confirm  a password'],
    },
    isVerified:{type:Boolean,default:false},
    emailToken:String,
    courses:[String],
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date
})

// Middleware to hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

// Method to compare passwords
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter=function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp=parseInt(this.passwordChangedAt.getTime()/1000,10)
        return JWTTimestamp<changedTimestamp
    } 
    return false
}
userSchema.methods.createPasswordResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    console.log({resetToken})
    this.passwordResetExpires=Date.now()+10*60*1000

    return resetToken
}

module.exports=mongoose.model('User',userSchema)