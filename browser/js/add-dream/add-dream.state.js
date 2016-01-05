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


app.controller('AddDreamCtrl', function($scope, $rootScope, DreamFactory, Session, $state, TagFactory, SpeechFactory) {

  TagFactory.getTags()
    .then(function(tags) {
      $scope.tags = tags.map(function(tag) {
        return tag.tagName; 
      })
    })
    .then(null, console.error.bind(console)); 

  $scope.dream = {}; 
  $scope.dream.user = Session.user._id;  
  $scope.dream.content = ''; 

  $rootScope.$on('dreamSpoken', function(newValue, oldValue) {
    console.log('watch worked!!!!!')
    if(newValue !== oldValue) {
     $scope.dream.content += " " + SpeechFactory.getDreamText(); 
     $scope.$apply();    
    }
  }); 

  $scope.addDream = function() {
    console.log('addDream invoked')
    DreamFactory.addDream($scope.dream)
      .then(function() {
        $state.go('browseDreams')
      })
      .then(null, console.error.bind(console)); 
  }


}); 