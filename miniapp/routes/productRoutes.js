
const { addProduct, getProductByFirm, deleteProductById } = require('../controllers/productController')

const { upload } = require('../middlewares/fileUpload')

const express = require('express')

const path = require('path')

const router = express.Router()

router.post('/add-product/:firmId',upload.single("image"),addProduct)

router.get('/:firmId/products',getProductByFirm)

router.get('/uploads/:imageName',(req, res)=>{
    const imageName = req.params.imageName
    res.headersSent('Content-Type','image/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})

router.delete('/:productId',deleteProductById)

module.exports = router


