const Product = require('../models/productModel')

//to post product
exports.postProduct = async (req, res) => {
    let product = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        countInStock: req.body.countInStock,
        product_desc: req.body.product_desc,
        product_img: req.file.path,
        category: req.body.category,
    })

    product = await product.save()
    if (!product) {
        return res.status(400).json({ error: 'something went wrong' })
    }
    res.send(product)
}



//to show all products
exports.productList = async (req, res) => {
    const product = await Product.find().populate('category', 'category_name').sort({ createdAt: -1 })
    if (!product) {
        return res.status(400).json({ error: 'no products found' })
    }
    res.send(product)
}


// to show product detail
exports.productDetail = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category', 'category_name')
    if (!product) {
        return res.status(400).json({ error: "Product not found" })
    }
    res.send(product)
}



//to update the product
exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            countInStock: req.body.countInStock,
            product_desc: req.body.product_desc,
            product_img: req.file.path,
            category: req.body.category
        },
        { new: true }
    )

    if (!product) {
        return res.status(400).json({ error: "product does not exists" })
    }
    res.send(product)
}


//to delete product
exports.deleteProduct = (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(403).json({ error: "specified product not found" })
            }

            else {
                return res.status(200).json({ error: "product deleted successfully" })
            }
        })

        .catch(err => {
            return res.status(400).json({ error: err })
        })
}