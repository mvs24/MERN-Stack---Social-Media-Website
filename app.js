const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require('./config/database')
const passport=require('passport');


mongoose.connect('mongodb://localhost:27017/socialnetwork',  { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("MongoDB connected");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// passport middleware
app.use(passport.initialize());
// passport config
require('./config/passport')(passport);


const users = require('./routes/api/users.js');
const posts = require('./routes/api/posts')


app.use('/api/users', users)
app.use('/api/posts', posts)

const port = 5000;

app.listen(port, () => {
  console.log("App listening on port " + port);
});
