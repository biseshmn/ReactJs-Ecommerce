const express = require('express')
const { testFunction, postCategory, categoryList, categoryDetails, updateCategory, deleteCategory } = require('../controllers/categoryController')
const router = express.Router()
const { categoryValidation, validation } = require('../validation/validator')
const { requireSingin } = require('../controllers/authController')


router.get('/demo', testFunction)
router.post('/postcategory', requireSingin, categoryValidation, validation, postCategory)
router.get('/categorylist', categoryList)
router.get('/categorydetails/:id', categoryDetails)
router.put('/updatecategory/:id', requireSingin, updateCategory)
router.delete('/deletecategory/:id', requireSingin, deleteCategory)



module.exports = router