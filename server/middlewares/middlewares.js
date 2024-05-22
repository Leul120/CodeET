const authPage=(permissions)=>{
    return (req,res,next)=>{
        const userCode=req.body.code
        if(permissions.includes(userCode)){
            next()
        }
        else{
            return res.status(401).json("You dont have the permission")
        }
    }

}
const authCourse=(req,res,next)=>{

}
module.exports={authPage,authCourse}