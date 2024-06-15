const Course=require('../models/CourseModel')
const User=require('../models/UserModel')
const ApiFeatures=require('../utils/ApiFeatures')
const catchAsync=require('../utils/catchAsync')
const AWS=require('aws-sdk')
require('dotenv').config();

const aliasTopCourses = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-Rating,Price';
  req.query.fields = 'Title,Price,Rating,Description,Difficulty';
  next();
};

const getAllCourses = catchAsync(async (req, res) => {
    
      const features=new ApiFeatures(Course.find(),req.query).filter().sort().search().limitFields().pagination()
      const courses=await features.query;
      res.status(200).json({ 
        result:courses.length,
        courses });
    
  })
  
const PostCourses= catchAsync(async (req,res,next)=>{
    const course=await Course.create(req.body)
    res.status(201).json({course})

})


const getCourse = catchAsync(async (req, res) => {
    
      const courseID = req.params.courseID;
      const course = await Course.findOne({ _id: courseID });
  
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      res.status(200).json({ course });
  })
const updateCourse=catchAsync(async (req,res)=>{
    
        const courseID=req.params.courseID
        const course=await Course.findOneAndUpdate({_id:courseID},req.body,{
            new:true,
            // runValidators:true,
        })
        res.status(200).json({course})
})
const deleteCourse=catchAsync(async (req,res)=>{
        const courseID=req.params.courseID;
        const course1 = await Course.findOne({ _id: courseID });
        const deletedcourse=course1.Title;
        await Course.findOneAndDelete({_id:courseID})
        res.status(200).json(`${deletedcourse} deleted suceessfully`)
})
const getCourseStat=catchAsync(async (req,res)=>{
    const stats=await Course.aggregate([
      {
        $match:{Rating:{$gte:8.5}}
      },
      {
        $group:{
          _id:{$toUpper:'Difficulty'},
          numCourses:{$sum:1},
          AverageRating:{$avg:'$Rating'},
          AveragePrice:{$avg:'$Price'},
          minPrice:{$min:'$Price'},
          maxPrice:{$max:'$Price'}
        }
      },
      {$sort:{AveragePrice:1}},
      // {
      //   $match:{_id:{$ne:'EASY'}}
      // }
    ])
    res.status(200).json({ stats });
})

const getMonthlyPlan=catchAsync(async (req,res)=>{
    const plan=await Course.aggregate([
      {
      $unwind:'$Released'
      },
      {
        $match:{
          Released:{
            $gte:new Date.now()
          }
        }
      },
      {
        $group:{
          _id:{$month:'$Released'}

        }
      }
  ])
})
const dashboard=catchAsync(async (req,res)=>{
  const userID = req.params.userID;
      const user = await User.findOne({ _id: userID });
    let courses=[];
    const course=user.courses
      for(let i=0;i<course.length;i++){
       courses.push(await Course.findById({_id:course[i]}))
      }
      res.status(200).json({courses})

})
const sendEmail = async (req, res) => {
  const email = "leulmelkamu15@gmail.com";

  const params = {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [process.env.EMAIL_FROM],
    },
    ReplyToAddresses: [process.env.EMAIL_FROM],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <html>
              <h1>Reset password link</h1>
              <p>Please use the following link to reset your password</p>
            </html>
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "password reset link",
      },
    },
  };

  try {
    const emailSent = await ses.sendEmail(params);

    res.json({ ok: true });
  } catch (err) {
   
    res.status(500).json({ error: "Failed to send email" });
  }
};


const createS3Instance=()=>{
  const s3=new AWS.S3({
    credentials:{
      accessKeyId:process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    },
    region:process.env.AWS_REGION
  })
  return s3
}
const getVideos=(bucketName,folderName)=>{
  const s3=createS3Instance();
  const params={
    Bucket:bucketName,
    Prefix: folderName + '/'
  }
  const bucketData=s3.listObjects(params).promise()
  return bucketData || {}
}

async function s3Get(req,res){
  try{
    const folderName=req.params.folderName
    const bucketData=await getVideos('codeet',folderName)
    console.log(bucketData)
    const {Contents=[]}=bucketData
    res.send(Contents.map(content=>{
      return {
        key:content.Key,
        lastModified:content.LastModified,
        url:"https://d105f0jjk1ob12.cloudfront.net/"+content.Key
      }
    }))
  }catch(error){

    // res.send({
    //   status:"fail",
    //   message:"error"
    // })
  }
}

module.exports={getAllCourses,PostCourses,getCourse,updateCourse,deleteCourse,aliasTopCourses,getCourseStat,dashboard,sendEmail,s3Get}