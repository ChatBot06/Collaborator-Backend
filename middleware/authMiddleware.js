import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
// const admin = require('../config/firebase-config');

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}


// const protectWithFirebase = asyncHandler(async (req, res, next) => {
//   const token = req.headers.authorization.split(' ')[1];
//   try {
//     const decodeValue = await admin.auth().verifyIdToken(token);
//     if (decodeValue) {
//       req.user = decodeValue;
//       return next();
//     }
//     return res.json({ message: 'Un authorize' });
//   } catch (e) {
//     return res.json({ message: 'Internal Error' });
//   }
// })


export { protect, admin }
