const express= require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app= express();
dotenv.config();

const port = process.env.dotenv || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/registeration_data",{
    useNewUrlParser : true,
    useUnifiedTopology : true
});



const Registeration_schema = new mongoose.Schema({
    username: String,
    email:String,
    phone_no:String,
    gender:String,
    password:String
});
const Registeration = new mongoose.model("registeration",Registeration_schema);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get("/" ,(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
    // res.status(200).json({msg:"connected successfully"});
});
app.post("/register",async (req,res)=>{
    try {
        const {username , email,phone_no, gender, password}= req.body;
        const userExist = await Registeration.findOne({email:email});
        if(userExist){
            return res.status(200).json({msg:"User Already Exist"});
        };
        const Registeration_Data = new Registeration({
            username,
            email,
            phone_no,
            gender,
            password
        });
        await Registeration_Data.save();
        res.redirect("/success");
            
    } catch (error) {
        console.log(error);
        res.redirect("/error")
        
    }
});
app.get("/success",(req, res)=>{
    res.sendFile(__dirname+"/public/success.html");
})
app.get("/error",(req, res)=>{
    res.sendFile(__dirname+"/public/error.html");
})
app.listen(port , ()=>{
    console.log("server is running on port" ,port);
});



