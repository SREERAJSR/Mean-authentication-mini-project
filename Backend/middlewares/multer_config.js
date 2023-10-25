const multer = require('multer')
const storage =  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${Date.now()}-${file.originalname}`); 
    }
  })

 module.exports=  {upload: multer({ storage: storage })
 }