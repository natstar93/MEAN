const app = angular.module('news', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

  $stateProvider
    .state('home',{
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl as pCtrl'
    });

  $urlRouterProvider.otherwise('home');

}]);

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
    if (!self.title || self.title === '') { return; }
    self.posts.push({
      title: self.title,
      link: self.link,
      upvotes: 0,
      comments: [
        {author: 'Natstar', body: 'Very good', upvotes: 0},
        {author: 'Katsu', body: 'Nice', upvotes: 0}
      ]
    });
    self.title = '';
    self.link = '';
  };

  self.incrementUpvotes = (post) => {
    post.upvotes += 1;
  };
}]);

app.controller('PostsCtrl', ['postFactory', '$stateParams', function(postFactory, $stateParams) {
  const self = this;

  self.post = postFactory.posts[$stateParams.id];

  self.addComment = () => {
    if(!self.body || self.body === '') { return; }
    self.post.comments.push({
      body: self.body,
      author: 'user',
      upvotes: 0
    });

  };

}]);
