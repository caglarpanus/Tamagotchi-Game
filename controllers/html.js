const path = require("path");
const db = require('../models')

module.exports = app => {

  app.get("/home", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/", "home-2.html"))
  );

  app.get('/pet/:name', (req, res) => {
    res.sendFile(path.join(__dirname, './../public/index.html'))
  })
  
};
