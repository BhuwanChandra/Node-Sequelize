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

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set static folders
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

// Index route
app.get("/", (req, res) => res.render('index', {layout: 'landing'}));

// GIG Routes
app.use('/gigs', require('./routes/gigs'));


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
