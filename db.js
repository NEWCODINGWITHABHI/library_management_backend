
const mongoose=require("mongoose");
console.log(process.env.MONGO_URI,"mongo uri");
mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

// const connectDB=async ()=>{
//   try{
//     const conn=await mongoose.connect(process.env.MONGO_URI);
//     console.log("Mongodb connected")

//   }catch(err){
//     console.log(err);
//   }
// }
// module.exports=connectDB;

