const express = require("express");
const app = express();
const auth = require("../../middleware/auth");
const User = require("../../model/userModel");
const dotenv = require("dotenv");
dotenv.config();

app.get("/profile",auth,async (req, res) => {
    try {
        const user = await User.findOne({_id:req.user._id});
        if(!user){
            return res.status(400).send("User not found");
        }
        console.log(user);
        const {name,email,favlang,teckstack}=user;
        const client={
            name:name,
            email:email,
        }
        if(favlang){
            client.favlang=favlang;
        }
        if(teckstack){
            client.teckstack=teckstack;
        }
        return res.status(200).json(client);
    } catch (error) {
        console.error(error.message);
    }
});

app.post("/profile/update",auth,async (req, res) => {
    try {
        const user = await User.findOne({_id:req.user._id});
        const {name,favlang,techstack,platforms}=req.body;
        if(!user){
            return res.status(400).send("User not found");
        }
        const upuser = {}
        if(name){
            upuser.name=name;
        }
        if(favlang){
            upuser.favlang=favlang;
        }
        if(techstack){
            upuser.techstack=techstack;
        }
        if(platforms){
            upuser.platforms=platforms;
        }

        console.log(upuser);
        const updatedUser = await User.updateOne({_id:req.user._id},{$set:upuser});
        const u=await User.findOne({_id:req.user._id});
        console.log(u);
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});

exports.app = app;
