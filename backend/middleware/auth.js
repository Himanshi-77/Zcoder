const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const user=require('../model/userModel')
dotenv.config();

const verifytoken = async(req,res,next)=>{
    const token = req.headers.authorization||req.headers['x-access-token'];
    //console.log(token);
    try {
        if(!token){
            return res.status(401).send('You have to login first');
        }   
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET);
        //console.log(decoded);
        const authUser=await user.findById(decoded._id);
        //console.log(authUser);
        req.user=authUser;
        next();

    } catch (error) {
        console.error("something went wrong in auth.js");
        return res.status(400).send('Invalid Token or no Token');
    }
}

module.exports = verifytoken;
