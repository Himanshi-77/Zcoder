const Message=require('../model/messageModel');
const Room =require('../model/roomModel');
const postmessage=async(req,res)=>{
    const {content,roomId,sender}=req.body;
    try{
        const message=await Message.create({content,roomId,sender});
        await Room.findByIdAndUpdate(roomId,{
            $push:{
                message:message._id
            }
        },{new:true});
        const sendMsg=await Message.findById(message._id).populate('sender');
        return res.status(200).json(sendMsg);
    }catch(err){
        return res.status(400).send(err);
    }
}
module.exports={postmessage};