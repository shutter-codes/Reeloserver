const Playlist = require('../models/Playlist');
const mongoose = require('mongoose');
const Song = require('../models/Song'); // Assuming you have a Song model

// Fetch songs for a specific playlist
exports.getSongsFromPlaylist = async (req, res) => {
    const { playlistId } = req.params;

    try {
        // Find the playlist by ID and populate the songs field
        const playlist = await Playlist.findById(playlistId).populate('songs');

        if (!playlist) {
            console.log("Playlist not found:", playlistId);
            return res.status(404).json({ message: 'Playlist not found' });
        }

        console.log("Songs fetched successfully for playlist:", playlistId);
        res.json(playlist.songs);
    } catch (error) {
        console.error("Failed to fetch songs from playlist:", error.message);
        res.status(500).json({ message: 'Failed to fetch songs from playlist' });
    }
};
// Fetch all playlists for the authenticated user
exports.getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ user: req.user.id }).populate('songs');
        
        if (!playlists.length) {
            return res.status(404).json({ message: 'No playlists found' });
        }

        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch playlists' });
    }
};

// Create a new playlist for the authenticated user
exports.createPlaylist = async (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({ message: 'Playlist name is required' });
    }

    try {
        const existingPlaylist = await Playlist.findOne({ name, user: req.user.id });
        if (existingPlaylist) {
            return res.status(400).json({ message: 'Playlist with this name already exists' });
        }

        const playlist = new Playlist({ name, user: req.user.id });
        await playlist.save();

        res.status(201).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create playlist' });
    }
};

// Add a song to a specific playlist
exports.addSongToPlaylist = async (req, res) => {
    const { playlistId, songId } = req.body;

    if (!playlistId || !songId) {
        return res.status(400).json({ message: 'Playlist ID and Song ID are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(playlistId) || !mongoose.Types.ObjectId.isValid(songId)) {
        return res.status(400).json({ message: 'Invalid Playlist ID or Song ID' });
    }

    try {
        const playlist = await Playlist.findById(playlistId);

        if (!playlist || playlist.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        if (playlist.songs.includes(songId)) {
            return res.status(400).json({ message: 'Song is already in the playlist' });
        }

        playlist.songs.push(songId);
        await playlist.save();
        
        res.json({ message: 'Song added to playlist', playlist });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add song to playlist' });
    }
};


 exports.removeSongFromPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { songId } = req.body;
  
    try {
      // Check if playlist exists
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return res.status(404).json({ message: 'Playlist not found' });
      }
  
      // Check if song exists
      const song = await Song.findById(songId);
      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }
  
      // Remove song from playlist
      playlist.songs = playlist.songs.filter((id) => id.toString() !== songId);
      await playlist.save();
  
      res.status(200).json({ message: 'Song removed from playlist successfully' });
    } catch (error) {
      console.error('Error removing song from playlist:', error);
      res.status(500).json({ message: 'Failed to remove song from playlist' });
    }
  };

  exports.DeletePlaylist = async (req, res) => {
    const { playlistId } = req.params;
  
    try {
     
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return res.status(404).json({ message: 'Playlist not found' });
      }
  
    await Playlist.deleteOne({ _id: playlistId });
  
      res.status(200).json({ message: 'Playlist deleted successfully' });
    } catch (error) {
      console.error('Error deleting playlist:', error);
      res.status(500).json({ message: 'Failed to delete playlist' });
    }
  }