const express  =require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();
const {getAllUsers,deleteUser,editUser,getUserById} = require('../controller/admin-controller')

router.get('/get_all_users',getAllUsers)
router.delete('/delete_user/:id',deleteUser)
router.get('/get_user_by_id/:id',getUserById)
router.patch('/edit_user',editUser)

module.exports = router;