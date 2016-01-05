app.factory('DreamFactory', function($http) {

  var extractData = function(response) {
    return response.data; 
  }

  var exports = {
    getDreams: function() {

      return $http.get('/api/dreams')
        .then(extractData)
    }, 
    addDream: function(dream) {
      return $http.post('/api/dreams', dream)
        .then(extractData); 
    } 
  }; 


  return exports; 

})