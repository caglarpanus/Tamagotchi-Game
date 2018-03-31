const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");

const passport = require("./middleware/passport");
const db = require("./models");

//configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());


require("./controllers/userHtmlRoutes.js")(app);
require("./controllers/userApiRoutes.js")(app);
require("./controllers/html")(app);
require("./controllers/api")(app);

app.use(express.static("public"));


const PORT = process.env.PORT || process.argv[2] || 8080;

const force = false;
db.sequelize.sync().then(() => {
  if (force) {
    require("./seed/user")(db);
    //require("./seed/pets")(db);
  }
  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
});
