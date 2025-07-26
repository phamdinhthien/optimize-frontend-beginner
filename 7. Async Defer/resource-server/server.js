// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/script.js', (req, res) => {
    setTimeout(() => {
        res.sendFile(path.join(__dirname, 'public', 'script.js'));
    }, 3000);
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});