const mongoose = require('mongoose');
const answerSchema=new mongoose.Schema({
    user_id:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})
const problemSchema=new mongoose.Schema({
    user_id:String,
    name:String,
    title:{
        type: String,
        required:true,
        max:255,
    },
    question:{
        type: String,
        required:true,
    },
    tag:{
        type: Array,
    },
    answers:[answerSchema],
    platform:{
        type: String,
    },
    ispublic:{
        type: Boolean,
        default:false,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }

})
const problem = mongoose.model("problem",problemSchema);
module.exports={problem};