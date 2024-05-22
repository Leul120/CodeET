const Joi=require('@hapi/joi')
const authSchema=Joi.object({
    name:Joi.string().required().trim(),
    email:Joi.string().email().lowercase().required(),
    password:Joi.string().min(8).required(),
    passwordConfirm:Joi.ref('password'),
    role:Joi.string().valid('user','admin').default('user'),
    passwordChangedAt:Joi.date(),
    passwordResetToken:Joi.string(),
    passwordResetExpires:Joi.date(),
})
module.exports={
    authSchema
}