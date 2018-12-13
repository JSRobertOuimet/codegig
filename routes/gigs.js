const
  express = require("express"),
  router = express.Router(),
  db = require("../config/database"),
  Gig = require("../models/Gig");

router.get("/", (req, res) => {
  Gig
    .findAll()
    .then(gigs => {
      console.log(gigs);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
});

module.exports = router;