var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

router.param('post', (req, res, next, id) => {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

router.param('comment', (req, res, next, id) => {
  var query = Comment.findById(id);

  query.exec((err, comment) => {
    if(err) { return next(err); }
    if(!comment) { return next(new Error('can\'t find comment')); }

    req.comment = comment;
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

router.get('/posts/:post', (req, res, next) => {
  req.post.populate('comments', (err, post) => {
    if(err) { return next(err); }

    res.json(post);
  });
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

router.get('/posts/:post/comments', (req, res, next) => {
  Comment.find((err, comments) => {
    if(err) { return next(err); }
    res.json(comments);
  });
});

router.post('/posts/:post/comments', (req, res, next) => {
  var comment = new Comment(req.body);
  comment.post = req.post;
  console.log('comment created');
  console.log(comment);

  comment.save((err, comment) => {
    if(err) { return next(err); }

    req.post.comments.push(comment);
    req.post.save((err, post) => {
      if(err) { return next(err); }

      res.json(comment);
    });
  });

});

router.put('/posts/:post/comments/:comment/upvote', (req, res, next) => {
  req.comment.upvote((err, comment) => {
    if (err) { return next(err); }

    res.json(comment);
  })
});

module.exports = router;
