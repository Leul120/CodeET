class ApiFeatures{
    constructor(query,queryString){
      this.query=query;
      this.queryString=queryString
    }
    filter(){
      const queryObj={...this.queryString}
        const excludeFields=['page','sort','limit','fields','search']
        excludeFields.forEach(el=>delete queryObj[el])
        let queryStr=JSON.stringify(queryObj);
        queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=> `$${match}`)
        this.query.find(JSON.parse(queryStr))
        return this
    }
    sort(){
      if(this.queryString.sort){
        const sortBy=this.queryString.sort.split(',').join(' ')
        this.query=this.query.sort(sortBy)
      }else{
        this.query=this.query.sort('-Released')
      }
      return this
    }
    limitFields(){
      if(this.queryString.fields){
        const fields=this.queryString.fields.split(',').join(' ')
        this.query=this.query.select(fields)
      }else{
        this.query=this.query.select('-__v')
      }
      return this
    }
    pagination(){
      const page=this.queryString.page*1 ||1;
        const limit=this.queryString.limit*1||8
        const skip=(page-1)*limit
        this.query=this.query.skip(skip).limit(limit)
        
        return this
        
    }
   search(){
      if(this.queryString.search){
        // this.queryString=(this.queryString.search)
        this.query = this.query.find({ Title: { $regex: this.queryString.search, $options: 'i' } });
      }
      else{}
      return this
    }
  
  
//   if (this.queryString.search) {
//     console.log(this.queryString.search);
//     const searchRegex = new RegExp(this.queryString.search, 'i');
    
//     this.query = this.query.aggregate([
//       {
//         $match: {
//           Title: { $regex: searchRegex }
//         }
//       },
//       {
//         $addFields: {
//           matched: { $regexMatch: { input: "$Title", regex: new RegExp('^' + this.queryString.search, 'i') } }
//         }
//       },
//       {
//         $sort: { matched: -1 }
//       },
//       {
//         $project: {
//           matched: 0
//         }
//       }
//     ]);
//   }
//   return this;
// }
}
 module.exports=ApiFeatures