const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const { db } = require("../models/adminModel");

// login admin
const loginAdmin = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  console.log(email);
  // Check for admin email
  const admin = await Admin.findOne({ email });
  console.log(admin);

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      admin: true,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin credentials");
  }
});

const getusers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  if (users) {
    res.json({
      users,
    });
  } else {
    res.status(400);
    throw new Error("Users not found");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const editUser = async (req, res) => {
  console.log("hjgahghsa");
  const { email, name, _id } = req.body;
  if (!email || !name) {
    res.status(400).json({
      message: "User Details cannot be null",
    });
  } else {
    const userExist = await User.findById(_id);
    const emailExists = await User.findOne({ email, _id: { $ne: _id } });
    if (userExist) {
      // const user=await User.findOne({email:email})
      if (!emailExists) {
        await User.updateOne({ _id }, { email: email, name: name });
        res.status(200).json({
          message: "success",
        });
      } else {
        res.status(400).json({
          message: "User Email already Exists",
        });
      }
    } else {
      res.status(400).json({
        message: "User doent Exists",
      });
    }
  }
};

// delete user
const deleteUser = async (req, res) => {
  try{
    const _id = req.body._id;
    const userExists=await User.findById(_id);
    if(userExists){
      await User.deleteOne({_id});
      res.status(200).json({

        status:"success",
        message:"User has been deleted successfully..",
      })
    }else{
      res.status(400).json({
        message:"User doesnot Exists"
      })
    }
    
  }catch(err){
    res.status(400).json({
      message:"Something went wrong.."
    })  }
};


// add user 

const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      status:"success",
      message:"User Created Succesfully"
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})



module.exports = {
  loginAdmin,
  getusers,
  editUser,
  deleteUser,
  addUser

};
