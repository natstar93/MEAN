var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');


router.param('post', (req, res, next, id) => {
  console.log('hi');
  var query = Post.findById(id);

  query.exec((err, post) => {
    if(err) { return next(err); }
    if(!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts/:post', (req, res) => {
    res.json(posts);
});

router.post('/posts', (req, res, next) => {
  var post = new Post(req.body);

  post.save((err, post) => {
    if(err) { return next(err); }
    res.json(post);
  });
});

module.exports = router;
