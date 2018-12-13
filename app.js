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

app.engine("handlebars", exphbs({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "/views/partials")
}));

app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", {
    layout: "landing"
  });
});

app.use("/gigs", require("./routes/gigs"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));