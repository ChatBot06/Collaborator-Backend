import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// var firebase = require("firebase");
// import firebase from 'firebase'
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  /* 	#swagger.tags = ['User']
    #swagger.description = 'Endpoint to sign in a specific user' */

  const { email, password } = req.body;
  try {
    const auth = getAuth();
    let getUser = await signInWithEmailAndPassword(auth, email, password)
    res.json({ data: getUser })
  } catch (error) {
    console.log("error", error)
    res.status(400);
    throw new Error(error);
  }

});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  /* 	#swagger.tags = ['User']
    #swagger.description = 'Endpoint to sign in a specific user' */

  const { name, email, password } = req.body;

  try {
    const auth = getAuth();
    let createdUser = await createUserWithEmailAndPassword(auth, email, password)
    res.json({ data: createdUser })
  } catch (error) {
    console.log("error", error)
    res.status(400);
    throw new Error(error);
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  /* 	#swagger.tags = ['User']
    #swagger.description = 'Endpoint to sign in a specific user' */

  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  /* 	#swagger.tags = ['User']
    #swagger.description = 'Endpoint to sign in a specific user' */

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  /* 	#swagger.tags = ['User']
    #swagger.description = 'Endpoint to sign in a specific user' */

  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.countDocuments({});
  const users = await User.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ users, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  /* 	#swagger.tags = ['User']
    #swagger.description = 'Endpoint to sign in a specific user' */

  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  /* 	#swagger.tags = ['User']
    #swagger.description = 'Endpoint to sign in a specific user' */

  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  /* 	#swagger.tags = ['User']
    #swagger.description = 'Endpoint to sign in a specific user' */

  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
