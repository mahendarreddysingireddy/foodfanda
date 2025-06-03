const vendor = require('../models/vendorModel')

const jwt = require('jsonwebtoken')

const varifyToken = async(req, res, next)=>{

    console.log(req.headers)

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {

            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

           const vendorData = await vendor.findById(decoded.vendorId)

           if(!vendorData){
                res.status(401).json({status:401,message:"Vendor not found"})
           }
           req.vendorId = vendorData._id

           next()
            
        }catch (error) {
            res.status(401).json({status:401,error:error})
        }      
    }

    if(!token){
        res.status(401).json({status:401,message:"No authorized, NO token"})
    }
}
module.exports = {
    varifyToken
}