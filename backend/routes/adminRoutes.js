const express = require('express')
const router = express.Router()

const {
    loginAdmin,getusers,editUser,deleteUser,addUser
  } = require('../controllers/adminController')


router.post('/login', loginAdmin)

router.get('/getusers', getusers)


router.post('/editUser', editUser)


router.post('/deleteUser', deleteUser)

router.post('/addUser', addUser)





module.exports = router