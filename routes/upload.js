const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Song = require('../models/Song');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const extname = path.extname(file.originalname).toLowerCase();
  
      if (extname === '.mp3') {
        return cb(null, true);
      } else {
        cb(new Error('Only .mp3 format allowed!'));
      }
    },
});

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { originalname, filename } = req.file;
    
    // Create a URL for the uploaded file
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
    
    // Save song information in the database
    const newSong = new Song({
      title: originalname,
      url: fileUrl,
      
    });

    await newSong.save();

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      song: newSong,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;