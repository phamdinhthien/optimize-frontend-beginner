// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/style.css', (req, res) => {
    setTimeout(() => {
        res.sendFile(path.join(__dirname, 'public', 'style.css'));
    }, 1000);
});

// Cache settings for preloaded image (1 hour)
app.get('/image_1.jpg', (req, res) => {
    setTimeout(() => {
        res.set({
            'Cache-Control': 'public, max-age=3600', // 1 hour
            'Expires': new Date(Date.now() + 3600000).toUTCString() // 1 hour from now
        });
        res.sendFile(path.join(__dirname, 'public', 'image_1.jpg'));
    }, 1000);
});

// Cache settings for prefetched image (1 hours)
app.get('/image_2.jpg', (req, res) => {
    setTimeout(() => {
        res.set({
            'Cache-Control': 'public, max-age=3600', // 24 hours
            'Expires': new Date(Date.now() + 3600000).toUTCString() // 24 hours from now
        });
        res.sendFile(path.join(__dirname, 'public', 'image_2.jpg'));
    }, 1000);
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});