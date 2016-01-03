var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

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

router.get('/posts/:post', (req, res) => {
  res.json(req.post);
});

router.post('/posts', (req, res, next) => {
  var post = new Post(req.body);

  post.save((err, post) => {
    if(err) { return next(err); }
    res.json(post);
  });
});

router.put('/posts/:post/upvote', (req, res, next) => {
  req.post.upvote((err, post) => {
    if (err) { return next(err); }

    res.json(post);
  });
});

module.exports = router;
