const router=require('express').Router();
const {postmessage}=require('../controllers/msgController')
router.post('/postmessage',postmessage);
module.exports = router;