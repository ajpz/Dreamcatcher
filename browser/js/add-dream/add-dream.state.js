app.config(function($stateProvider) {

  $stateProvider.state('addDream', {
    url: '/add-dream',
    templateUrl: 'js/add-dream/add-dream.html',
    controller: 'AddDreamCtrl',
    data: {
        authenticate: true
    }
  })
})


app.controller('AddDreamCtrl', function($scope, DreamFactory, Session, $state, TagFactory) {

  TagFactory.getTags()
    .then(function(tags) {
      $scope.tags = tags.map(function(tag) {
        return tag.tagName; 
      })
    })
    .then(null, console.error.bind(console)); 

  $scope.dream = {}; 
  $scope.dream.user = Session.user._id;  

  $scope.addDream = function() {
    console.log('addDream invoked')
    DreamFactory.addDream($scope.dream)
      .then(function() {
        $state.go('browseDreams')
      })
      .then(null, console.error.bind(console)); 
  }


}); 