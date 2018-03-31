const { Pets, User } = require("../models");
//const isAuthenticated = require("../middleware/isAuthenticated")

module.exports = app => {
  app.get("/my-pet/api", (req, res) => {
    if (!req.user) {
      console.log('something')
      // The user is not logged in, send back an empty object
      res.json({});
      return;
    }
    console.log('something else')
    Pets.findAll({
      where: { UserId: req.user.id }//,
    //  include: [User]
    })
      .then(pets => res.json(pets))
      .catch(err => console.log(err));
  });

  app.post("/my-pet/api", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      console.log('no user data')
      res.json({});
      return;
    }

    Pets.create({
      name: req.body.name,
      lastFed: Date.now(),
      petType: req.body.petType,
      UserId: req.user.id
    })
      .then(data => res.end())
      .catch(err => console.log(err));
  });

  app.patch("/my-pet/api", (req, res) => {
    console.log("HERE");
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
      return;
    }

    console.log(req.body);
    Pets.update({ lastFed: Date.now() }, { where: { id: req.body.id } })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  });

  app.delete("/my-pet/api", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
      return;
    }

    Pets.destroy({ where: { id: req.body.id } })
      .then(data => res.end())
      .catch(err => console.log(err));
  });
};
