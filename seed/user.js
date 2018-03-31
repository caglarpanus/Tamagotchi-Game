module.exports = db =>
  ["Anna", "Caglar", "Marty", "Jonathan"].forEach(name =>
    db.User.create({ name, email: `${name}@gmail.com`, password: name })
  );
