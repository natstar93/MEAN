const app = angular.module('news', []);

app.controller('MainCtrl', [function() {
  const self = this;
  self.posts = [
    {title: 'post 1', upvotes: 5},
    {title: 'post 2', upvotes: 2},
    {title: 'post 3', upvotes: 15},
    {title: 'post 4', upvotes: 9},
    {title: 'post 5', upvotes: 4}
  ];

  self.addPost = () => {
    if (!self.title || self.title === '') {return}
    self.posts.push({title: self.title, upvotes: 0});
    self.title = '';
  };

  self.incrementUpvotes = (post) => {
    post.upvotes += 1;
  };
}]);
