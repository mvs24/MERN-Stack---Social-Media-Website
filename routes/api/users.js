const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../../secret/keys");
const passport = require("passport");

const User = require("../../models/User");
const { validateUser } = require("../../validation/user");

router.post("/signup", (req, res) => {
  let validation = validateUser(req.body);
  if (validation[1] === false) {
    return res.status(400).json(validation[0]);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      lastname: req.body.lastname
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) return res.status(400).json(err);
        newUser.password = hash;
        newUser.save().then(user => {
          res.json(user);
        });
      });
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(400).json({ user: "User does not exist" });
    }

    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        // jwt payload
        const payload = {
          id: user._id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          friends: user.friends,
          requests: user.requests
        };
        //sign jwt token
        jwt.sign(payload, secret.secretOrKey, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json({ password: "Password Incorrect" });
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      lastname: req.user.lastname,
      email: req.user.email
    });
  }
);


module.exports = router;
