const Room=require('../model/roomModel');
const createRoom=async(req,res)=>{
    const { roomName, roomPassword } = req.body;
    try {
        const getRoom = await Room.findOne({ roomName })
        if (getRoom) return res.status(400).send('room already exists');
        else {
            const room = await Room.create({ roomName, roomPassword });
            return res.status(200).json(room);
        }

    } catch (err) {
        res.status(400).send('Error in creating the room!')
    }
}

const joinRoom=async(req,res)=>{
    const { roomName, roomPassword,member } = req.body;
    try {
        const room = await Room.findOne({ roomName });
        await Room.findByIdAndUpdate(room._id,{
            $addToSet:{
                members:member
            }
        })
        if (!room) return res.status(400).send('Room not found');
        if (room.roomPassword !== roomPassword) return res.status(400).send('Password mismatch');
        res.status(200).json(room);
    } catch (err) {
        return res.status(400).send('Error in joining the room!')
    }
}

const getAllRooms=async(req,res)=>{
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        res.status(400).send('Error in getting all rooms!')
    }
}

const getRoomById=async(req,res)=>{
    const query=req.query.q;
    try{
        const room=await Room.findById(query).populate({
            path:'message',
            populate:{
                path:'sender'
            }
        }).populate('members').sort({ updatedAt: -1 });
        return res.status(200).json(room);
    }catch(err){
        return res.status(400).send('Error in fetching the room!')
    }
}
module.exports={createRoom,joinRoom,getAllRooms,getRoomById};