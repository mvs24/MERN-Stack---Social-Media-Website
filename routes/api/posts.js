const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const User = require("../../models/User");

// 1
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
      Post.find({})
        .populate("user")
        .then(posts => {
          res.json(posts);
        });
    });
  }
);

router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.find({ user: req.params.userId }).then(posts => {
      return res.json(posts);
    });
  }
);

router.get('/post/:postId',
passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.find({ _id: req.params.postId }).populate('user').then(post => {
      return res.json(post);
    });
  }
)

// 2
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
      const newPost = new Post({
        user,
        text: req.body.text
      });
      newPost.save().then(savedPost => {
        res.json(savedPost);
      });
    });
  }
);

// 3
router.post(
  "/comment/:postId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
      Post.findOne({ _id: req.params.postId })
        .populate("user")
        .then(post => {
          let commentText = req.body.commentText;
          post.comments.unshift({
            user,
            username: user.name,
            lastname: user.lastname,
            text: commentText
          });
          post.save().then(savedPost => {
            res.json(savedPost);
          });
        });
    });
  }
);

// 4
router.post(
  "/post/like/:postId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
      Post.findOne({ _id: req.params.postId }).then(post => {
        let duplicate = null;
        post.likes.forEach(postLike => {
          if (postLike.user.toString() == user._id) {
            duplicate = postLike;
          }
        });
        if (duplicate) {
         post.likes = post.likes.filter(postLike => postLike !== duplicate);

          post.save().then(savedPost => {
            res.json(savedPost);
          });
        } else {
          post.likes.unshift({
            user,
            username: user.name,
            lastname: user.lastname
          });

          post.save().then(savedPost => {
            res.json(savedPost);
          });
        }
      });
    });
  }
);

router.post(
  "/comment/like/:postId/:commentId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
      Post.findOne({ _id: req.params.postId }).then(post => {
        let postComment = post.comments.filter(
          comment => req.params.commentId == comment._id
        );

        postComment[0].likes.forEach(like => {
          if (like.user.toString() == user._id) {
            return res
              .status(400)
              .json({ commentLiked: "Comment already liked" });
          }
        });

        postComment[0].likes.unshift({
          user,
          username: user.name,
          lastname: user.lastname
        });
        post.save().then(savedPost => {
          res.json(savedPost);
        });
      });
    });
  }
);

router.post(
  "/comment/reply/:postId/:commentId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
      Post.findOne({ _id: req.params.postId }).then(post => {
        let postComment = post.comments.filter(
          comment => req.params.commentId == comment._id
        );
        let replyText = req.body.replyText;
        postComment[0].reply.unshift({
          user,
          text: replyText,
          username: user.name,
          lastname: user.lastname
        });
        post.save().then(savedPost => {
          res.json(savedPost);
        });
      });
    });
  }
);

router.post(
  "/reply/like/:postId/:commentId/:replyId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
      Post.findOne({ _id: req.params.postId }).then(post => {
        let postComment = post.comments.filter(
          comment => req.params.commentId == comment._id
        );
        if (postComment[0].reply[0].likes.user == req.user._id) {
          return res.json({ replyLiked: "Reply already liked" });
        }
        postComment[0].reply[0].likes.unshift({
          user,
          username: user.name,
          lastname: user.lastname
        });
        post.save().then(savedPost => {
          return res.json(savedPost);
        });
      });
    });
  }
);

router.post(
  "/replyToUser/:postId/:commentId/:replyId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
      Post.findOne({ _id: req.params.postId }).then(post => {
        let postComment = post.comments.filter(
          comment => req.params.commentId == comment._id
        );
        postComment[0].reply[0].replyToUser.unshift({
          user,
          replyToUserText: req.body.replyToUser
        });
        post.save().then(savedPost => {
          res.json(savedPost);
        });
      });
    });
  }
);

router.post(
  "/likeReply/:postId/:commentId/:replyId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
      Post.findOne({ _id: req.params.postId }).then(post => {
        let postComment = post.comments.filter(
          comment => req.params.commentId == comment._id
        );
        if (postComment[0].reply[0].replyToUser[0].likes.user == req.user._id) {
          return res.json({ alreadyLiked: "Already liked" });
        }
        postComment[0].reply[0].replyToUser[0].likes.unshift({
          user,
          username: user.name,
          lastname: user.lastname
        });
        post.save().then(savedPost => res.json(savedPost));
      });
    });
  }
);

// 5
router.post(
  "/unlike/:postId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
      Post.findOne({ _id: req.params.postId }).then(post => {
        let postLikes = post.likes.filter(postLike => {
          postLike.user.toString() != user._id.toString();
        });
        post.likes = postLikes;
        post.save().then(savedPost => {
          res.json(savedPost);
        });
      });
    });
  }
);

module.exports = router;
