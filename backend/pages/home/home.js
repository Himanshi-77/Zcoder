const express=require('express');
const auth = require('../../middleware/auth');
const problem = require('../../model/askModel');
const app = express();
app.use(express.json())
const router = express.Router();

app.post('/Home',auth,async (req,res)=>{
    res.status(200).send('Welcome to Home page');
})
exports.app = app;