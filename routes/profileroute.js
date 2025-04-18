const router = require('express').Router();

const {getProfile,updateProfile} = require('../controllers/profilecontroller') // from controller   

router.get('/profile',getProfile)    // from  controller
router.post('/updateprofile',updateProfile)    // from  controller