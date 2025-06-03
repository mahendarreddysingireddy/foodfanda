const multer = require('multer')

const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename:function(req, file, cb){
        const uniqueName = Date.now() + Path.extname(file.originalname)
        cb(null,uniqueName)
    }
})

const upload = multer({ storage })

module.exports = { upload }