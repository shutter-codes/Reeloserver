const express = require('express');
const { getPlaylists, createPlaylist, getSongsFromPlaylist ,addSongToPlaylist , removeSongFromPlaylist } = require('../controllers/playlistController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getPlaylists);
router.post('/', protect, createPlaylist);
router.post('/add-song', protect, addSongToPlaylist); // Endpoint to add a song to a playlist

router.get('/:playlistId/songs', protect, getSongsFromPlaylist);
router.post('/:playlistId/remove-song', protect, removeSongFromPlaylist);

module.exports = router;
