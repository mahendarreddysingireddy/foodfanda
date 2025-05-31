
const express = require('express')

const router = express.Router()

const path = require('path')

const { upload }= require('../middlewares/fileUpload')

const { varifyToken } = require('../middlewares/varifyToken')

const { addFirm, deleteFirmById } = require('../controllers/firmController')

router.post('/add-firm', varifyToken, upload.single('image'), addFirm)

router.get('/uploads/:imageName',(req, res)=>{
    const imageName = req.params.imageName
    res.headersSent('Content-Type','image/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})

router.delete('/:firmId',deleteFirmById)

module.exports = router

