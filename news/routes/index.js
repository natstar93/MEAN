var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts', (req, res, next) => {
  Post.find((err, posts) => {
    if(err) { return next(err); }
    res.json(posts);
  });
});

router.post('/posts', (req, res, next) => {
  var post = new Post(req.body);

  post.save((err, post) => {
    if(err) { return next(err); }
    res.json(post);
  });
});

module.exports = router;
