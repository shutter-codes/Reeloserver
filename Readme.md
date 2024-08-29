# Music Player Web App

## Overview

This repository contains the backend code for a full-stack music player web application built using the MERN stack (MongoDB, Express, React, Node.js). The app allows users to sign up, sign in, browse a song library, create playlists, play songs, and resume playback from where they left off.

## Features

- **User Authentication**
  - Sign up with email and password
  - Sign in to access personalized features

- **Song Library**
  - Browse available songs
  - Select songs for playback or to add to playlists

- **Playlist Management**
  - Create personal playlists
  - Add songs to playlists
  - Remove songs from playlists

- **Music Playback**
  - Play selected songs
  - Resume playback from last position

## Tech Stack

- **Backend**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose ORM)
  - JWT for authentication

- **Frontend** (Not included in this repository)
  - React.js

## Project Structure

```
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── playlistController.js
│   └── songController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Playlist.js
│   ├── Song.js
│   └── User.js
├── routes/
│   ├── auth.js
│   ├── playlists.js
│   ├── songs.js
│   └── upload.js
├── uploads/
├── .env
├── package.json
├── README.md
└── server.js
```

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/music-player-webapp.git
   cd music-player-webapp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup`: Register a new user
- `POST /api/auth/login`: Login user
- `POST /api/auth/logout`: Logout user

### Songs
- `GET /api/songs`: Get all songs
- `GET /api/songs/:id`: Get a specific song
- `POST /api/songs`: Add a new song
- `PUT /api/songs/:id`: Update a song
- `DELETE /api/songs/:id`: Delete a song

### Playlists
- `GET /api/playlists`: Get user's playlists
- `POST /api/playlists`: Create a new playlist
- `GET /api/playlists/:playlistId/songs`: Get songs in a playlist
- `POST /api/playlists/add-song`: Add a song to a playlist
- `POST /api/playlists/:playlistId/remove-song`: Remove a song from a playlist

### File Upload
- `POST /api/upload`: Upload a song file

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.