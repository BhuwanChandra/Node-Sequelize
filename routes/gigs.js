const express = require("express");
const db = require('../config/database');
const Gig = require('../models/gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = express.Router();

// Get gig list
router.get('/', (req, res) => {
  Gig.findAll({
    raw: true,
    nest: true,
  })
    .then(gigs => res.render('gigs', {gigs}))
    .catch(err => console.log(err));
});


// Display add gig form 
router.get('/add', (req, res) => res.render('add'));


// Add a gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  // Validate Data
  if(!title) errors.push({text: 'Please add a title!'});
  if(!technologies) errors.push({text: 'Please add some technologies!'});
  if(!description) errors.push({text: 'Please add a description!'});
  if(!contact_email) errors.push({text: 'Please add a contact email!'});

  // Check for errors
  if(errors.length > 0){
    res.render('add', {
      errors,
      title,
      technologies,
      description,
      budget,
      contact_email
    })
  } else {

    if(!budget){
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    // Make lowercase and remove spaces after comma
    technologies = technologies.toLowerCase().replace(/, /g, ',')

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
  };
})

// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;

  // Converting to lowercase
  term = term.toLowerCase();

  Gig.findAll({
    where: {
      technologies: { [Op.like]: '%' + term + '%' }
    },
    raw: true,
    nest: true,
  })
  .then(gigs => res.render('gigs', {gigs}))
  .catch(err => console.log(err));
});

module.exports = router;
