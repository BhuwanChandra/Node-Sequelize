const express = require("express");
const bodyParser = require("body-parser");
const db = require('../config/database');
const Gig = require('../models/gig');

const router = express.Router();

router.get('/', (req, res) => {
  Gig.findAll()
    .then(gigs => {
      console.log(gigs);
      res.json({data: gigs});
    })
    .catch(err => console.log(err));
});

module.exports = router;
