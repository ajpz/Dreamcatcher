app.factory('TagFactory', function($http) {

  var extractData = function(response) {
    return response.data; 
  }

  var exports = {
    getTags: function() {
      return $http.get('/api/tags')
        .then(extractData); 
    }
  }

  return exports; 
})