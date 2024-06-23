const express = require('express')
const path = require('path')

//testing off while file transfer
const fs = require('fs')
const fsPromises = require('fs').promises

const db = require('./db/db.json')
const uuid = require('./helpers/uuid')
const { error } = require('console')



const PORT = process.env.PORT || 3001;
const app = express();
// const notes = require('express').Router();

//middleware for parsing JSON and URlencoded 
app.use(express.json());
// app.use('/api', api)

//middleware to serve up static assets from public folder
app.use(express.static('public'))

// GET paths
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))

});

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});



//API GET
app.get('/api/notes', (req, res) => {
//   return res.json(db)
 fsPromises.readFile('./db/db.json', "utf8", (err, data) => data)
    .then((data) => res.json(JSON.parse(data))
)
});

//API POST
app.post('/api/notes', (req, res) => {
    const {title, text} = req.body

    // check if theres anything in body
    // console.log("SERVER: console log before if statement")
    // console.log(req.body)
    // console.log(uuid())



    if (req.body && title && text){
        //create new note based on valid information
       const newNote = {
        title,
        text,
        id: uuid()
       }


       // read file? with promises
       fsPromises.readFile(`./db/db.json`, "utf8", (err, data) =>{
            err
                ? console.log(err)
                : console.log(data)
    }).then((Db) => {
    //    console.log("SERVER: READ FILE")
       let newDb = (JSON.parse(Db))
    //    console.log(oldDb)
       console.log("SERVER: appended file")
       newDb.push(newNote)
       console.log(newDb)

    //      strifify
    const stringifiedDb = JSON.stringify(newDb)
    console.log(stringifiedDb)


    //    todo:write to file(server)
       fs.writeFile(`./db/db.json`, stringifiedDb,(err) => {
            err
                ? console.log(error)
                : console.log(
                    `SERVER: SUCCESS! Task for "${newNote.title} has been written to JSON"`
                )
       })

       let response = {
            status: "Success",
            body: newDb
       }    

    //    console.log(response)
       res.json(response)
    })
    } else {
        //display ERROR to client
        res.json('client:ERROR Request body must at least contain a title')
    }
})


//LISTEN
app.listen(PORT, () => 
    console.log(`App listening on port ${PORT}`))