// Requiring our models and passport as we've configured it
const { User } = require("../models");
const passport = require("../middleware/passport");

module.exports = app => {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error

  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will happen on the front end
  // They won't get this or even be able to access this page if they aren't authed
  app.post("/api/user/login", passport.authenticate("local"), (req, res) =>
    res.json("/home")
  );

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/user/signup", (req, res) =>
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => res.redirect(307, "/api/user/login"))
      .catch(err => res.status(422).json(err.errors[0].message))
  );

  // Route for logging user out
  app.get("/user/logout", (req, res) => {
    req.logout();
    res.redirect("/user/login");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user/data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's id and name
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        id: req.user.id,
        name: req.user.name
      });
    }
  });
};
