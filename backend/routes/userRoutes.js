const express = require('express')
const cloudinary=require('cloudinary')

const multer=require('multer')
const path=require('path')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  updateProfile
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')



upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  }
})


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});





router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.post('/updateprofile', protect,upload.single('avatar'),updateProfile)

module.exports = router
