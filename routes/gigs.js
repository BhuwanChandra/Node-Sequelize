const express = require("express");
const bodyParser = require("body-parser");
const db = require('../config/database');
const Gig = require('../models/gig');

const router = express.Router();

// Get gig list
router.get('/', (req, res) => {
  Gig.findAll({
    raw: true,
    nest: true,
  })
    .then(gigs => {
      res.render('gigs', {gigs});
      // res.json({gigs})
    })
    .catch(err => console.log(err));
});


// Display add gig form 
router.get('/add', (req, res) => res.render('add'));


// Add a gig
router.post('/add', (req, res) => {
  const data = {
    title: "Simple wordpress website",
    technologies: "wordpress, html, css",
    budget: "$1000",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    contact_email: "testing1@test.com"
  };

  let { title, technologies, budget, description, contact_email } = data;

  // Insert into table
  Gig.create({
    title,
    technologies,
    budget,
    description,
    contact_email
  })
  .then(gig => res.redirect('/gigs'))
  .catch(err => console.log(err));
})


module.exports = router;
