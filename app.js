const
  express = require("express"),
  exphbs = require("express-handlebars"),
  bodyParser = require("body-parser"),
  path = require("path"),

  db = require("./config/database"),

  PORT = process.env.PORT || 5000,
  app = express();

db.authenticate()
  .then(() => console.log("Connected to database!"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("index");
});

app.use("/gigs", require("./routes/gigs"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));