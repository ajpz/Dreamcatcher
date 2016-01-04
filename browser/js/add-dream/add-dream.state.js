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


app.controller('AddDreamCtrl', function($scope, DreamFactory, Session, $state) {

  $scope.dream = {}; 
  $scope.dream.user = Session.user._id;  

  $scope.addDream = function() {
    DreamFactory.addDream($scope.dream)
      .then(function() {
        $state.go('browseDreams')
      })
      .then(null, console.error.bind(console)); 
  }


}); 