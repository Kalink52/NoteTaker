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

// GET paths
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//API GET
app.get('/api/notes', (req, res) => {
    return res.json(db)
});

//API POST
app.post('/api/notes', (req, res) => {
    //notify request received test
    // res.json(`Client: ${req.method} request received`)
    // console.log(`Server: ${req.method} request received`)

    //response object to send back to client
    let response;

    // check if theres anything in body
    console.log(req.body)
    if (req.body && req.body.title){
        response = {
            status: 'good job',
            data: req.body
        }
        res.json(`client: note for ${req.body.title} has been added`)
    } else {
        //display to client
        res.json('client: Request body must atleast contain a title')
    }
    console.log(req.body)
})


//LISTEN
app.listen(PORT, () => console.log(`App listening on port ${PORT}`))