// routes/playlists.js
const express = require('express');
const { getPlaylists, createPlaylist, addSongToPlaylist } = require('../controllers/playlistController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getPlaylists);
router.post('/', protect, createPlaylist);
router.post('/add-song', protect, addSongToPlaylist);

module.exports = router;
