const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    bestSeller:{
        type:String,
    },
    image:{
        type:String
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg','non-veg']
            }
        ]
    },
    description:{
        type:String,
        required:true
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]
})

module.exports = mongoose.model('Product',productSchema)