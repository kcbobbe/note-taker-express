const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// link to json db -- right now called notes
const notes = require("./db/db.json")
//html routes

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
})

//api routes

app.get("/api/notes", (req, res)=>{
  return res.json(notes)
})



app.get("/api/notes/:id", (req, res) => {
  // console.log(req.params.id)
  const id = req.params.id;
  let found;
  notes.forEach(n => {
    if (id == n.id){
      found = n;
      return res.json(n)
    }
  })
  return res.json(false)
})

let uniqueID = 1;

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  uniqueID++;
  newNote.id = uniqueID;
  notes.push(newNote);
  res.json(true)
})

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  let found;
  notes.forEach((n, index) => {
    if(id == n.id){
      notes.splice(index,1)
    }
  })

  res.json(true);
})

app.listen(PORT, () => {
  console.log(`Server is listening port: ${PORT}`)
})