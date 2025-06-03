const mongoose = require('mongoose')

const firmSchema = mongoose.Schema({
    firmName : {
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true
    },
    region:{
        type:[
            {
                type:String,
                required:true,
                enum:["south-indian","chinese","north-indian","bekery"]
            }          
        ]        
    },
    category:{
        type:[
            {
                type:String,
                required:true,
                enum:["veg","non-veg"]
            }
        ]        
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Vendor'
        }
    ],
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
})

module.exports = mongoose.model("Firm",firmSchema)