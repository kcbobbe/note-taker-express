const express = require("express");
const path = require("path");
const PORT = 3000;

const app = express();

app.us(express.urlencoded({ extended: true }))
app.use(express.json())

// link to json db -- right now called notes

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

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.routeName = res.body.id;
})

app.listen(PORT, () => {
  console.log(`Server is listening port: ${PORT}`)
})