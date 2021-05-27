require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');
const ejs = require("ejs");
const mongoose = require('mongoose')
const { static } = require("express");
const connectDB = require("./connectionDB");
const app = express();
//mongo connection
require('./connectionDB')
connectDB();
//db schema
const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: [true, 'Enter Tilte of the post']
  },
  post: {
    type: String,
    // required: [true, 'Post is Must']
  }
})
//Model
const Post = mongoose.model('post', postsSchema);

const posts = []

const homeContentIs =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry when an unknown printer took a galley of type and scrambled it to make a type specimen bo";
const aboutContentIs =
  "combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//@ Get Routes
app.get("/", (req, res) => {
  Post.find({}, (err, postFound) => {
    // console.log(postFound);
    res.render("home", { homeContent: homeContentIs, GetPost: postFound });
  })

});
app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContentIs });
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/compose", (req, res) => {
  res.render("compose");
});

//@GET PARAMETERS ROUTES

app.get('/posts/:postId', (req, res) => {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, singlePost) {
    console.log(singlePost);
    res.render('post', {
      title: singlePost.title,
      post: singlePost.post
    });
  })

})


// @POST ROUTES

app.post("/compose", (req, res) => {
  const titleName = req.body.myTitle;
  const postText = req.body.myText;
  const newpost = new Post({
    title: titleName,
    post: postText
  })
  console.log(newpost);
  newpost.save();
  posts.push(newpost);
  res.redirect('/')
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
  console.log(`sever is listening at Port ${port}`);
});
