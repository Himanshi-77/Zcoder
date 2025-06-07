const mongoose = require('mongoose');
const messageSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    roomId:{
        type:String,
        ref:'room'
    },
    sender:{
        type:'String',
        ref:'user',
    }
})
const Message=mongoose.model('message',messageSchema);
module.exports= Message;