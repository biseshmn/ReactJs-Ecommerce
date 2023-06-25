const { check, validationResult } = require('express-validator')

exports.categoryValidation = [
    check('category_name', 'category is mandatory').notEmpty()
        .isLength({ min: 3 }).withMessage('category name must be atleast 3 characters')
]

exports.productValidation = [
    check('product_name', 'product name is mandatory').notEmpty()
        .isLength({ min: 3 }).withMessage('Product name must at least 3 characters'),

    check('product_price', 'product price is mandatory').notEmpty()
        .isNumeric().withMessage('Price must be a numeric value'),

    check('countInStock', 'Stock amount is required').notEmpty()
        .isNumeric().withMessage('Stock amount must be numeric'),

    check('product_desc', 'Description is mandatory').notEmpty()
        .isLength({ min: 20 }).withMessage('Description must be at least 5 characters'),

    check('category', 'Categroy is mandatory').notEmpty()
]


exports.userValidation = [
    check('name', 'name is mandatory').notEmpty()
        .isLength({ min: 3 }).withMessage('name must at least 3 characters'),

    check('email', 'email is required').notEmpty()
        .isEmail().withMessage('Email format incorrect'),

    check('password', 'password is required').notEmpty()
        .matches(/[a-z]/).withMessage('password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('password must contain at least one numeric value')
        .matches(/[!@#$%-_.]/).withMessage('password must contain at least one special character')
        .isLength({ min: 8 }).withMessage('password must be at least 8 characters long')
]


exports.passwordValidation = [
    check('password', 'password is required').notEmpty()
        .matches(/[a-z]/).withMessage('password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('password must contain at least one numeric value')
        .matches(/[!@#$%-_.]/).withMessage('password must contain at least one special character')
        .isLength({ min: 8 }).withMessage('password must be at least 8 characters long')
]



exports.validation = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        next()
    }

    else {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
}