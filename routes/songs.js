const express = require('express');
const {
    getSongs,
    getSongById,
    addSong,
    updateSong,
    deleteSong
} = require('../controllers/songController');
const router = express.Router();

// Route to get all songs
router.get('/', getSongs);

// Route to add a new song
router.post('/', addSong);

// Route to get a song by ID
router.get('/:id', getSongById);

// Route to update a song by ID
router.put('/:id', updateSong);

// Route to delete a song by ID
router.delete('/:id', deleteSong);

module.exports = router;
