const PORT = 8008;

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('./'));

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(PORT);

console.log(`dev server running at localhost:${PORT}`);
