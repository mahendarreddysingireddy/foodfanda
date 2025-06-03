const productModel = require('../models/productModel')

const firmModel = require('../models/firmModel')

const addProduct = async(req, res) => {

    const { price, category, description, productName, bestSeller} = req.body

    const firmId = req.params.firmId

    const image = req.file ? req.file.filename : null

    try {

        const firm = await firmModel.findById(firmId)

        if(!firm){

            res.status(500).json({error:'Firm Not found.'})
        }

        const saveProduct = await productModel.create({
            price,
            category,
            description,
            bestSeller,
            productName,
            image,
            firm:firm._id
        })

        firm.products.push(saveProduct)

        await firm.save()

        res.status(200).json({saveProduct})

    } catch (error) {

        res.status(400).json({error})

    }
}

const getProductByFirm = async(req, res)=>{
    try {

        const firmId = req.params.firmId

        const firm = await firmModel.findById(firmId)

        if(!firm){
            res.status(404).json({error:"No Firm Found."})
        }

        const firmProducts = await productModel.find({firm:firmId})

        res.status(200).json({resturentName:firm.firmName,firmProducts})
        
    } catch (error) {
        res.status(500).json({error:'Internal Server Error'})
    }
}

const deleteProductById = async(req, res)=>{
    try {
        const productId = req.params.productId

        const deleteProduct = await productModel.findByIdAndDelete(productId)

        if(!deleteProduct){
            res.status(404).json({error:'Unable to find product'})
        }

        res.status(200).json({deleteProduct})
        
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = { addProduct, getProductByFirm, deleteProductById }