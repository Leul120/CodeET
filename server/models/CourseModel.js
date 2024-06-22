const mongoose=require('mongoose')
const CourseSchema=new mongoose.Schema({
    Title:{
        type:String,
        required:[true,'must provide name'],
        trim:true,
    },
    Year:Number,
    Rating:Number,
    Released:Date,
    Size:String,
    Description:{
        type:String,
        
        trim:true,
    },
    IntroLink:String,
    Language:String,
    Poster:String,
    bought:{type:Number,
        default:0},
    VideoLink:{type:String,
        select:false},
    Price:Number,
    Difficulty:String,
    Learn:String,
    Requirements:String,
    CourseFor:String,
    DTitle:String,
    CourseGoal:String

})
CourseSchema.pre(/^find/,function(next){
    this.find({Response:{$ne:true}
    })
    next()
})
module.exports=mongoose.model("Course",CourseSchema,'courses')