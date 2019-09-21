const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../../secret/keys");
const passport = require("passport");

const User = require("../../models/User");
const Post = require("../../models/Post");
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
  "/searchUser/:nameOfUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
      User.find({ name: req.params.nameOfUser }).then(searchedUser => {
        if (searchedUser) {
          return res.json(searchedUser);
        }
        return res.status(404).json({ noUserFound: "No user found" });
      });
    });
  }
);

router.post(
  "/request/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
      User.findOne({ _id: req.params.userId }).then(requestedUser => {
        if (requestedUser) {
          user.requests.unshift(requestedUser);
        }
        user.save().then(savedUser => res.json(savedUser));
      });
    });
  }
);

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

router.get(
  "/currentUser/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.params.userId }).then(user => {
      if (!user) {
        return res.status(404).json({ notFound: "User not found" });
      }
      return res.status(200).json(user);
    });
  }
);

router.get(
  "/currentUserPosts/:userId",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.find().then(posts => {
      let ourPost = posts.filter(
        post => post.user.toString() == req.params.userId
      );
      return res.status(200).json(ourPost);
    });
  }
);

module.exports = router;
