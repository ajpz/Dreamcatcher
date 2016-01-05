app.filter('tagFilter', function() {
  return function(dreamArray, selectedTag) {
    console.log('in showFilter cb function invocation: ', dreamArray, selectedTag); 
    if(!dreamArray) return null; 
  
    return dreamArray.filter(function(dream) {
      //selectedTags is one tag
      if(selectedTag.length === 0) return true; 

      for (var i = 0; i < selectedTag.length; i++) {
        if(dream.tags.indexOf(selectedTag[i]) === -1) return false; 
      }
      return true; 
    })
  }
})