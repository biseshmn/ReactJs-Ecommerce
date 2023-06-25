const mongoose = require ('mongoose')
const {ObjectId} = mongoose.Schema
//represents table id
//ObjectId is use to link data between different collections (tables)

const productSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:true,
        trim:true
    },

    product_price:{
        type:Number,
        required:true,
        trim:true
    },

    countInStock:{
        type:Number,
        required:true
    },
    product_desc:{
        type:String,
        required:true
    },
    product_img:{
        type:String,
        required:true
    },
    product_rating:{
        type:Number,
        default:0,
        max:5
    },
    category:{
        type:ObjectId,
        required:true,
        ref:'Category'
    }
},{timestamps:true})

module.exports=mongoose.model('Product', productSchema)