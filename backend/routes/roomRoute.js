const router=require('express').Router();
const {createRoom,joinRoom,getAllRooms,getRoomById}=require('../controllers/roomController');
router.post('/createroom',createRoom);
router.post('/joinroom',joinRoom);
router.get('/getroombyid',getRoomById)
router.get('/getallrooms',getAllRooms);
module.exports = router;