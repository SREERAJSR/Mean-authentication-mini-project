const express  =require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();
const {user_Login,user_signUp,getUserDetails,updateUser} = require('../controller/user-controller')
const {authMiddleWare}  = require('../middlewares/middleware')
const {upload} = require('../middlewares/multer_config')
router.post('/signup',user_signUp)
router.post('/login',user_Login)
router.get('/get_user',getUserDetails)
router.patch('/update_user',upload.single('file'),updateUser)

module.exports = router;