const Name = require("../model/userModel");
const bcrypt = require('bcrypt');

const renderHome = (req, res) => {
  Name.find().then((users) => {
    res.render("home",{ users: users });
  });
  
};
const loginPage =(req, res) =>{
    res.render("login")
}
const loginSuccess =(req, res)=>{
  res.render("loginSuccess")
}
``

const addUser = (req, res) => {
  const newUser = new Name({
    name: req.body.name,
    password: req.body.password,
  });

  bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send("Error hashing password");
    }
    newUser.password = hashedPassword;
    newUser.save().then((result) => {
      res.redirect("/login");
    }).catch((error) => {
      res.status(500).send("Error saving user");
    });
  });
};


const loginUser = (req, res) => {
    const { name, password } = req.body;
  
    Name.findOne({ name: name }).then((user) => {
      if (!user) {
        return res.status(400).send("User not found");
      }
  
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).send("Error comparing passwords");
        }
        if (!isMatch) {
          return res.status(400).send("Incorrect password");
        }
  
        res.redirect("/loginSuccess");
      });
    }).catch((error) => {
      res.status(500).send("Error finding user");
    });
  };
  
  module.exports = { renderHome, addUser, loginPage, loginUser, loginSuccess };