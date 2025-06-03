const express = require('express')

const dotEnv = require('dotenv')

dotEnv.config()

const mongoose = require('mongoose')

const cors = require('cors')

const vendorRoutes = require('./routes/vendorRoutes')

const firmRoutes = require('./routes/firmRoutes')

const productRoutes = require('./routes/productRoutes')

const { errorHandler } = require('./middlewares/errorHandler')

const app = express()

const port = process.env.port || 4000

app.use(express.json())

app.use(cors())

app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.MONGO_URI).then(()=>console.log('MongoDB Connected Succesfully')).catch((error)=>console.log(error))

app.use('/vendor',vendorRoutes)

app.use('/firm',firmRoutes)

app.use('/product',productRoutes)

app.use('/uploads',express.static('uploads'))

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server started and Running Port is ${port}`)
})

app.use('/',(req, res) => {
    res.send('<h1>Hello Food Fanda</h1>')
})