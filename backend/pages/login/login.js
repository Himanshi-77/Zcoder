const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const user = require('../../model/userModel');
dotenv=require('dotenv')
dotenv.config();
const express=require('express')
const app=express();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        function (accessToken, refreshToken, profile, callback) { // added accessToken and refreshToken
            console.log(accessToken, refreshToken)
            callback(null, profile);
        }
    )
);
passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

app.post("/login",async (req,res)=>{
    try {
        const {email,password} = req.body;
        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }
        const User =await user.findOne({email:email});
        if(!User){
            console.error("User not exists");
            return res.status(200).send({
                success: false,
                message: "User not exists",
            })
        }
        const validPass=await bcrypt.compare(password,User.password);
        if(!validPass){
            console.error("Invalid Password");
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            })
        }
        const token=jwt.sign({_id:User._id},process.env.TOKEN_SECRET||"unknown",{
            expiresIn:'1d',
        });
        console.log(token);
        console.log(process.env.TOKEN_SECRET)
        console.log("User logged in successfully",User);
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            User
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send("something went wrong, please try again later");
    }
});

app.get("/api/google", passport.authenticate("google", ["profile", "email"]));

app.get(
    "/auth/google/callback",
    (req, res, next) => {
        passport.authenticate("google", (err, user, info) => {
            if (err) {
                // Handle error
                console.error(err);
                return res.status(500).json({ error: 'An error occurred during authentication' });
            }
            if (!user) {
                // Authentication failed
                return res.redirect("/login");
            }
            // Authentication successful
            req.logIn(user, function(err) {
                if (err) {
                    // Handle error
                    console.error(err);
                    return next(err);
                }
                return res.redirect("/login/success");
            });
        })(req, res, next);
    }
);
app.get("/api/login/success",(req,res)=>{
    if (req.user) {
		res.status(200).json({
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
    
})
exports.passport = passport;
exports.app=app;