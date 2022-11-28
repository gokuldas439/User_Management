const express = require('express')
const router = express.Router()
const User = require("../models/userModel");


const cloudinary=require('cloudinary')

const multer=require('multer')
const path=require('path')

const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController')

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


router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

router.post('/imageupload',upload.single('avatar'),async(req,res)=>{
  try{

const _id=req.body._id
  console.log("linkkkkk")
  const file = req.file;
        

  const { path } = file;
  //  main line for uploading..........
  const result = await cloudinary.uploader.upload(file.path)
  const image = result.secure_url;
  console.log(image)
  await User.findByIdAndUpdate({_id},{profilepic:image})
  res.status(200).json({
     link:image
   })
}catch(err){
  console.log(err)
  // res.status(500).json({
  //   message:"error occured"
  // })
}
})

module.exports = router
