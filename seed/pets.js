const moment = require("moment");

module.exports = db => {
  db.Pets.create({name: "Felix",     petType: "cat"  /*, lastFed: moment().subtract(4,   "hours")*/});
  db.Pets.create({name: "Sylvester", petType: "cat"  /*, lastFed: moment().subtract(1,   "hours")*/});
  db.Pets.create({name: "Pluto",     petType: "dog"  /*, lastFed: moment()                       */});                                          
  db.Pets.create({name: "Tweety",    petType: "bird" /*, lastFed: moment().subtract(9.5, "hours")*/});
};
