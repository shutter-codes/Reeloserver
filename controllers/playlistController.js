// controllers/playlistController.js
const Playlist = require('../models/Playlist');

exports.getPlaylists = async (req, res) => {
    try {

        const playlists = await Playlist.find({ user: req.user.id }).populate('songs');

        console.log(playlists);
        res.json(playlists);

    } catch (error) {
        console.log("failed to fetch playlists");
        res.status(500).json({ message: 'Failed to fetch playlists' });
    }
};

exports.createPlaylist = async (req, res) => {
    const { name } = req.body;

    try {
        const playlist = new Playlist({ name, user: req.user.id });

        await playlist.save();

        console.log("playlist created");
        res.status(201).json(playlist);
    } catch (error) {
        console.log("failed to create playlist");
        res.status(500).json({ message: 'Failed to create playlist' });
    }
};

exports.addSongToPlaylist = async (req, res) => {
    const { playlistId, songId } = req.body;

    try {
        const playlist = await Playlist.findById(playlistId);

        // Check if the song is already in the playlist
        if (playlist.songs.includes(songId)) {
            console.log("Song is already in the playlist");
            return res.status(400).json({ message: 'Song is already in the playlist' });
        }

        // Add the song to the playlist
        playlist.songs.push(songId);
        await playlist.save();
        console.log("Song added to playlist");
        res.json({ message: 'Song added to playlist', playlist });
    } catch (error) {

        console.log("failed to add song to playlist");
        res.status(500).json({ message: 'Failed to add song to playlist' });
    }
};
