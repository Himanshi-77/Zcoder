const user=require('../../model/userModel');
const express=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const app=express();
app.use(express.json());

app.post('/signup',async (req,res)=>{
    try {
        const {name,email,password,techstack,favlang,rating} =req.body;
        if(!email || !name || !password){
           return res.status(200).send({
                success: false,
                message: "All input is required",
           });
        }
        const mailcheck=await user.findOne({email : email});
        if(mailcheck){
            return res.status(200).send({
                success: false,
                message: "Email already exists",
            });
        }
        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);
        const User={
            name,
            email,
            password:hashpassword,
            techstack,
            favlang,
            rating
        }
        const newUser=new user(User);
        await newUser.save();
        res.status(200).send({
            success: true,
            message: "User created"
        });
    } catch (error) {
        console.log("something is wrong")
        console.log(error);
    }
})
exports.app=app;