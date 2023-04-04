
const express=require("express");
const mongoose=require("mongoose");
const cors=require('cors');
const bcrypt=require("bcrypt");
const session=require("express-session");
const jwt = require("jsonwebtoken");
const mongoDbSession=require("connect-mongodb-session")(session);
const dotenv=require("dotenv").config();
console.log(process.env.MONGO_URI, "mongo uri");
const path=require("path");



const db=require("./db")
const {
  generateJWTToken,
  sendVerificationToken,
} = require("./utility_function/authUtils");
const User=require("./models/userModal")
const Book=require("./models/bookModal")
const hashPassword=require("./hashPassword");
const {isAuth}=require("./isAuth")




const saltRounds=10;
const SECRET_KEY=process.env.SECRET_KEY;
const PORT=process.env.PORT;
const server=express();
server.use(express.json());
// server.use(express.urlencoded());
// server.use(express.static(path.join(__dirname+"/public")))

server.use(
  cors()
);

const store=new mongoDbSession({
  uri:process.env.MONGO_URI,
  collection:"sessions",
})
server.use(
  session({
    secret:"I am fullstack developer",
    resave:false,
    saveUninitialized:false,
    store:store,
  })
)

server.get("/",(req,res)=>{
    
    console.log("Api is running")
    res.send("API Home")
})

server.post("/register",async (req,res)=>{

    let {name,username,phonenumber,email,password}=req.body;
    const userExistUserName=await User.findOne({username});
   
  const userExistEmail=await User.findOne({email});
 
    if(userExistEmail||userExistUserName){
      res.json({
        status:400,
        message:"User already exist"
      })
    }
    else{
     
      let hash =await bcrypt.hash(password, saltRounds);
      
    
      const user = new User({
        name,
        password:hash,
        username,
        phonenumber,
        email,
      });
      const verificationToken = generateJWTToken(email);
      console.log(verificationToken,"tokennnnnnn")
      try{
       const userDb=await user.save();
      
       return res.json({
        status:201,
        message:"Registered successfully",
        data:userDb,
       })

      }catch(error){
        return res.json({
          status:500,
          message:"Database error",
          error:error
        })
      }
  
    }
 
   
})

server.get("/verify/:token", async (req, res) => {
  console.log(req.params);
  const token = req.params.token;

  jwt.verify(token, SECRET_KEY, async (err, decodedData) => {
    if (err) throw err;
    console.log(decodedData);

    try {
      const userDb = await UserSchema.findOneAndUpdate(
        { email: decodedData.email },
        { emailAuthenticated: true }
      );

      console.log(userDb);
      return res.status(200).redirect("/login");
    } catch (error) {
      return res.json({
        status: 400,
        message: "Invalid Authentication Link",
        error: error,
      });
    }
  });
});

server.post("/login",async(req,res)=>{
  const {username,email,password}=req.body;
  try{

    let userEmail=await User.findOne({email});
    let userName=await User.findOne({username});
    let userDb;
    
    if(userEmail){
      userDb=userEmail;
    }
    else{
      userDb=userName;
    }
    console.log(userDb.password,password);
   
    if(userDb){
   
      const isMatch=await bcrypt.compare(password,userDb.password);
 
      if(!isMatch){
        return res.json({
          status:400,
          message:"password Does not match"
        })
      }
      req.session.isAuth=true;
      req.session.user={
        username:userDb.username,
        email:userDb.email,
        userId:userDb._id,
      }
      return res.json({
        status:200,
        data:userDb,
        message:"Login successfully"
      })
    }
    else{
      return res.json({
        status:400,
        message:"Please register first "
      })
    }
  }catch(error){
    return res.json({
      status:500,
      message:"Database error",
      error:error,
    })
  }

})
  
server.post("/book",async (req,res)=>{
    let {title,author,price,category}=req.body;
      console.log("hiii");
      const book = new Book({
        title,
        author,
        price,
        category,
      });
   
     await book.save();
    const books = await Book.find({});
    console.log(books);
    res.json(books);
     
    
})

server.get("/book",async (req,res)=>{
  const books=await Book.find({})
  console.log(books);
  res.json(books)
})

server.delete("/book/:id",async(req,res)=>{
  try{

   const  deleteData=await Book.deleteOne({_id:req.params.id})
   console.log("deleteddd")
    res.json(deleteData);
  }catch(e){
    res.status(500).send(e)
  }
})

server.put("/update-book/:id",async(req,res)=>{
    const id=req.params.id;
    const {title,author,price,category}=req.body;
    const updatedBook=new Book({
      title,
      author,
      price,
      category,
    })

    try{
      await Book.updateOne({_id:id},{$set:{title,author,price,category}});
      console.log("book successfulyy updated")
      res.status(200).json(updatedBook);
    }catch(error){
      console.log(error,"errorrr")
      res.status(500).json({message:"spmething went wrong"})
    }
})

server.get("/dashboard",isAuth, (req,res)=>{

  
    return res.send("restricted page data")
 
})
server.listen(PORT,()=>{
    console.log(`API is running on port ${PORT}`)
})
