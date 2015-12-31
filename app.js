const app = angular.module('news', []);

app.factory('postFactory', [() => {
  const postList = {
    posts: []
  };
  return postList;
}]);

app.controller('MainCtrl', ['postFactory', function(postFactory) {
  const self = this;

  self.posts = postFactory.posts;

  self.addPost = () => {
    if (!self.title || self.title === '') {return}
    self.posts.push({title: self.title, link: self.link, upvotes: 0});
    self.title = '';
    self.link = '';
  };

  self.incrementUpvotes = (post) => {
    post.upvotes += 1;
  };
}]);
