const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = {
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
    },
    price:{
        type:Number,
    },
    quantity:{
        type:Number
    },
    status:{
        type:Boolean
    }

};


module.exports = mongoose.model('Product',Product);