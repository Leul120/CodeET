/* 
    CHAPA API PAYMENT INTEGRATION TEST
    Required: Chapa secret key || GET THE KEY BY REGISTERING @ https://dashboard.chapa.co/register
*/

const Course=require('../models/CourseModel')
const User=require('../models/UserModel')
const axios=require('axios')

const CHAPA_URL = "https://api.chapa.co/v1/transaction/initialize"
 // || register to chapa and get the key


// req header with chapa secret key


exports.pay= async (req, res) => {
        const courseID=req.params.courseID
        // const course=await Course.findById(courseID)
        
        const userID=req.params.userID
        console.log(userID)
        console.log(courseID)
        // const user=await User.findById(req.params.userID)
         // chapa redirect you to this url when payment is successful
        const CALLBACK_URL = `${process.env.MAIN_URL}/api/verify-payment/${courseID}/${userID}/`
        const RETURN_URL = `http://localhost:3000`

        // a unique reference given to every transaction
        const TEXT_REF = "tx-myecommerce12345-" + Date.now()
        const {amount,email,first_name,last_name}=req.body
        // form data
        const data = {
            amount:amount, 
            currency: "ETB",
            email: email,
            first_name: first_name,
            last_name: last_name,
            tx_ref: TEXT_REF,
            callback_url: CALLBACK_URL + TEXT_REF,
            return_url: RETURN_URL,
           
        }

    console.log(data)
        try{
        const response=await axios.post("https://api.chapa.co/v1/transaction/initialize", data, {
    headers: {
        Authorization: `Bearer ${process.env.CHAPA_AUTH}`
    },
    timeout: 10000 // increase timeout to 10 seconds
})
        const responsed=response.data
        console.log(response.data.data.checkout_url)
        res.status(200).json({
            responsed
            
    })}catch(err) {
        if (err.response && err.response.data) {
            const { message, status, data } = err.response.data;
            console.error('Chapa API Error:', message, status, data);
            // Provide a user-friendly error message or handle the error accordingly
        } else {
            console.error('Network Error:', err.message);
        }
    };
}

// verification endpoint
exports.verifyPayment= async (req, res) => {
        const courseID=req.params.courseID.toString()
        const userID=req.params.userID.toString()
        console.log("verifying")
        //verify the transaction 
        await axios.get("https://api.chapa.co/v1/transaction/verify/" + req.params.id,{
            headers: {
                Authorization:`Bearer ${process.env.CHAPA_AUTH}`
            }
        } )
            .then(async (response) => {
                const responsed=response.data
                console.log("Payment was successfully verified")
                const user=await User.findByIdAndUpdate(userID, { $push: { courses: courseID } });
                console.log(user)
                await Course.findByIdAndUpdate(courseID, { $inc: { bought: 1 } });
                res.status(200).json({
                    status:"success",
                    responsed
                })
            }) 
            .catch((err) => console.log("Payment can't be verfied", err))
}
exports.success=(req,res)=>{
    res.status(200).json({
        status:"Success"
    })
}
// app.get("/api/payment-success", async (req, res) => {
//     res.render("success")
// })


