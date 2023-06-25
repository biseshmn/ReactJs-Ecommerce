const express = require('express')
const { postUser, userList, userDetail, userUpdate, userDelete, postEmailConfirmation, signIn, forgetPassword, resetPassword, requireSingin, signOut } = require('../controllers/authController')
const { userValidation, validation, passwordValidation } = require('../validation/validator')
const router = express.Router()

router.post('/postuser', userValidation, validation, postUser)
router.get('/userlist', userList)
router.get('/userdetail/:id', userDetail)
router.put('/userupdate/:id', userUpdate)
router.delete('/userdelete/:id', userDelete)

router.post('/confirmation/:token', postEmailConfirmation)
router.post('/signin', signIn)
router.post('/forgetpassword', forgetPassword)
router.put('/resetpassword/:token', passwordValidation, validation, resetPassword)
router.post('/signout', signOut)

module.exports = router