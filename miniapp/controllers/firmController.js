const vendor = require('../models/vendorModel')

const firm = require('../models/firmModel')

const multer = require('multer')

const addFirm = async(req, res)=>{

    const {firmName, category, region, offer, area} = req.body

    //console.log(req.file)

    try {
        const image = req.file ? req.file.filename: null

        const vendorData = await vendor.findById(req.vendorId)

        if(!vendorData){
            res.status(401)
            throw new Error('Vendor Data Not found')
        }


        const insertFirm = await firm.create({
            firmName,
            category,
            region,
            offer,
            area,
            image,
            vendor:vendorData._id
        })

        vendorData.firm.push(insertFirm)

        await vendorData.save()

        res.status(200).json({status:200,message:"Firm Created Successfully",data:insertFirm})
    } catch (error) {
        res.status(500).json({error})
    }    
}

const deleteFirmById = async(req, res) => {
    try {
        
        const firmId = req.params.firmId

        const deleteFirm = await firm.findByIdAndDelete(firmId)

        if(!firmId){

            res.status(404).json({error:'Unable to find firm data'})

        }
        res.status(200).json(deleteFirm)

    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    addFirm,
    deleteFirmById
}
