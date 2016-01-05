app.factory('SpeechFactory', function($rootScope) {

  var dreamText = ''; 

  return {
    getDreamText: function() {
      return dreamText; 
    }, 
    setDreamText: function(text) {
      dreamText = text; 
      console.log('dreamText')
      $rootScope.$broadcast('dreamSpoken'); 
    }
  }

})