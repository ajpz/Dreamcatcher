app.config(function($stateProvider) {

  $stateProvider.state('browseDreams', {
    url: '/browse-dreams',
    templateUrl: 'js/browse-dreams/browse-dreams.html',
    controller: 'BrowseDreamCtrl', 
    resolve: {
      dreams: function(DreamFactory) {
        return DreamFactory.getDreams()
          .then(null, console.error.bind(console)); 
      }
    }
  })
})


app.controller('BrowseDreamCtrl', function($scope, dreams) {
  console.log('ctrl ran: ', dreams)

  $scope.selectedTag = ''; // default to all tags
  $scope.dreams = dreams; 

}); 