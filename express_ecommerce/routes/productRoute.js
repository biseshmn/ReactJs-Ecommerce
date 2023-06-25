const express = require('express')
const { postProduct, productList, productDetail, updateProduct, deleteProduct } = require('../controllers/productController')
const upload = require('../middleware/fileUpload')
const router = express.Router()
const { productValidation, validation } = require('../validation/validator')
const { requireSingin } = require('../controllers/authController')

router.post('/postproduct', requireSingin, upload.single('product_img'), productValidation, validation, postProduct)
router.get('/productlist', productList)
router.get('/productdetail/:id', productDetail)
router.put('/updateproduct/:id', requireSingin, upload.single('product_img'), updateProduct)
router.delete('/deleteproduct/:id', requireSingin, deleteProduct)



module.exports = router