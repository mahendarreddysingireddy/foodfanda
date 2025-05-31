const vendor = require('../models/vendorModel')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const vendorRegister = async(req, res) => {

    const {username, email, password} = req.body

    try {
        const vendorEmail = await vendor.findOne({email})

        if(vendorEmail){
            return res.status(400).json("Email already exists")
        }

        const hashPassword = await bcrypt.hash(password,10)

        const newVendor = await vendor.create({
            username,
            email,
            password:hashPassword
        })

        console.log("Vendor registered successfully")

        res.status(201).json({message: "Vendor registered successfully"})        

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal error Please try again"})
    }
}

const vendorLogin = async(req, res) =>{
    const {email, password} = req.body

    try {

        const vendorData = await vendor.findOne({email})

        if(!vendorData || !(await bcrypt.compare(password,vendorData.password))){

            return res.status(400).json({message: "Invalid Credintials"})
        }

        const jwtToken= jwt.sign({ vendorId: vendorData._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        console.log(process.env.JWT_SECRET)

        res.status(200).json({status:200,message:"Login Successfull",token:jwtToken})
        
    } catch (error) {
        res.status(500).json({status:500,error:error})
    }    
}

const getAllVendors = async(req, res) => {
    try {
        const allVendors = await vendor.find().populate('firm')

        if(!allVendors){
            res.status(401)
            throw new Error("Vendors Not avilable")
        }
        res.status(200).json({allVendors})
    } catch (error) {
        res.status(401)
        throw new Error(error)        
    }
}

const getVendorById = async(req, res) => {

    const vendorId = req.params.id

    try {
        
        const vendorData = await vendor.findById(vendorId).populate('firm')

        if(!vendorData){
            res.status(404).json({error:"Vendor not found"})
        }
        res.status(200).json({vendorData})
    } catch (error) {
        res.status(500).json({error:error})
    }
}

module.exports = {
    vendorRegister,
    vendorLogin,
    getAllVendors,
    getVendorById
}