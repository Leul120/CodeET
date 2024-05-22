const Course=require('../models/CourseModel')
const ApiFeatures=require('../utils/ApiFeatures')
const catchAsync=require('../utils/catchAsync')
const aliasTopCourses=(req,res,next)=>{
  req.query.limit='5'
  req.query.sort='-Rating,Price'
  req.query.fields='Title,Price,Rating,Description,Difficulty'
  next()
}

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

module.exports={getAllCourses,PostCourses,getCourse,updateCourse,deleteCourse,aliasTopCourses,getCourseStat}