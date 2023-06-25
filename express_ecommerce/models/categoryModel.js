const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({ //new table structure
    category_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
},{timestamps:true})
//createdAt
//updatedAt

module.exports = mongoose.model('Category', categorySchema)