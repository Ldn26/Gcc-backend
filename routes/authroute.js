const router = require('express').Router();
const {signup,login, refresh,logout} = require('../controllers/authController') // from controller
router.post('/login',login)    // from  controller
router.post('/signup',signup)    // from  controller
router.post('/logout',logout)    // from  controller
router.post("/refresh" ,refresh )

module.exports = router;