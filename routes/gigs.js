const
  express = require("express"),
  router = express.Router(),

  Sequelize = require("sequelize"),
  Op = Sequelize.Op,

  db = require("../config/database"),
  Gig = require("../models/Gig");

router.get("/", (req, res) => {
  Gig
    .findAll()
    .then(gigs => res.render("gigs", { gigs }))
    .catch(err => console.log(err));
});

router.get("/search", (req, res) => {
  let {term} = req.query;

  term = term.toLowerCase();

  Gig
    .findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })
    .then(gigs => res.render("gigs", { gigs }))
    .catch(err => console.log(err));
});

router.get("/add", (req, res) => {
  res.render("add");
});

router.post("/add", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  if(!title) {
    errors.push({ error: "Please add a title." });
  }
  if(!technologies) {
    errors.push({ error: "Please add technologies." });
  }
  if(!description) {
    errors.push({ error: "Please add a description." });
  }
  if(!contact_email) {
    errors.push({ error: "Please add an email address." });
  }

  if(errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    })
  }
  else {
    if(!budget) {
      budget = "Unknown"
    }
    else {
      budget = `$${budget}`
    }

    technologies = technologies.toLowerCase().replace(/,\s/g, ",");

    Gig
    .create({
      title,
      technologies,
      budget,
      description,
      contact_email
    })
    .then(gig => res.redirect("/gigs"))
    .catch(err => console.log(err));
  }
});

module.exports = router;