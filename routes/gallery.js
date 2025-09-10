const express = require('express');
const multer = require('multer');
const fs = require('fs')
const path = require('path')

const router = express.Router();

const uploadDir = path.join(__dirname, '../public/uploads');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, uploadDir);
    },
     filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  }
})

const upload = multer({storage: storage,
    limits:{fileSize: 1 * 1024 * 1024},
     fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed'));
    }
  }
});

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  return res.json({ filename: req.file.filename, message: 'Image uploaded successfully' });
});

router.delete('/delete/:filename', (req,res)=>{
    const filePath = path.join(uploadDir, req.params.filename)
    fs.unlink(filePath, (err)=>{
        if(err) return res.status(500).json({message:"Failed to delete"})
        res.json({message:"Deleted Successfully"})
    });
});

router.get('/images', (req,res)=>{
    fs.readdir(uploadDir, (err, files)=>{
        if(err) return res.status(500).json({message:"Cannot Read File"})
        res.json(files);
    })
})

module.exports = router;

