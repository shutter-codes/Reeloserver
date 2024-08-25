// controllers/songController.js
const Song = require('../models/Song');

exports.getSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch songs' });
    }
};

exports.getSongById = async (req, res) => {
    const { id } = req.params;

    try {
        const song = await Song.findById(id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.json(song);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch song' });
    }
};

exports.addSong = async (req, res) => {
    const { title, artist, url } = req.body;

    try {
        const newSong = new Song({ title, artist, url });
        const song = await newSong.save();
        console.log('New song added');
        res.status(201).json(song);
    } catch (error) {
        console.log('Failed to add song');
        res.status(500).json({ message: 'Failed to add song' });
    }
};

exports.updateSong = async (req, res) => {
    const { id } = req.params;
    const { title, artist, url } = req.body;

    try {
        const updatedSong = await Song.findByIdAndUpdate(
            id,
            { title, artist, url },
            { new: true } // returns the updated document
        );

        if (!updatedSong) {
            return res.status(404).json({ message: 'Song not found' });
        }

        console.log('Song updated');
        res.json(updatedSong);
    } catch (error) {
        console.log('Failed to update song');
        res.status(500).json({ message: 'Failed to update song' });
    }
};

exports.deleteSong = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSong = await Song.findByIdAndDelete(id);

        if (!deletedSong) {
            return res.status(404).json({ message: 'Song not found' });
        }

        console.log('Song deleted');
        res.json({ message: 'Song deleted successfully' });
    } catch (error) {
        console.log('Failed to delete song');
        res.status(500).json({ message: 'Failed to delete song' });
    }
};
