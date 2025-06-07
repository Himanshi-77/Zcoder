const router=require('express').Router();
const auth=require('../middleware/auth');
const {home}=require('../controllers/homeController');
const {getProblemById}=require('../controllers/homeController');
router.get('/',auth,home);
module.exports = router;