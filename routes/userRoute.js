const express = require('express');
const router = express.Router();
const {
  registerUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
  updatePhoto
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getuser', protect, getUser);
router.get('/loggedin', loginStatus);

router.patch('/updateuser', protect, updateUser);
router.patch('/updatePhoto', protect, updatePhoto);
router.patch('/changepassword', protect, changePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);

module.exports = router;
