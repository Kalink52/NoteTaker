const express = require('express')
const path = require('path')

const db = require('./db/db.json')

const PORT = process.env.PORT || 3001;

const app = express();

//middleware for parsing JSON and URlencoded 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware to serve up static assets from public folder
app.use(express.static('public'))

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => res.json(db));

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))