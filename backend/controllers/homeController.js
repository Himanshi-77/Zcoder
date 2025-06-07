const {problem} = require("../model/askModel");
const express=require('express')

const home=async(req,res)=>{
    try{
        const problems = await problem.find({ispublic:true }).limit(50);
        const shuffledProblems = problems.sort(() => Math.random() - 0.5);
        // const problems = await problem.aggregate([
        //     { $match: { user_id: { $ne: req.user._id } } },
        //     { $sample: { size: 20 } }
        // ]);
        return res.status(200).send({
            success: true,
            problems:shuffledProblems,
        })
    }catch(error){
        console.log("error in fetching problems");
        console.error(error);
        return res.status(200).send({
            success:false,
            message:"Something went wrong, please try again later",
        });
    }
}

module.exports ={home};