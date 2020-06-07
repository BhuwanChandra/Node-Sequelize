const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");

// DATABASE
const db = require('./config/database');

// Test DB
db.authenticate()
  .then(() => console.log("Database Connected..."))
  .catch(err => console.log(err));

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("HOME PAGE!!!");
});


// GIG Routes
app.use('/gigs', require('./routes/gigs'));


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
