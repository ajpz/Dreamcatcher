app.filter('tagFilter', function() {
  return function(dreamArray, selectedTag) {
    console.log('in showFilter cb function invocation: ', dreamArray, selectedTags); 
    if(!dreamArray) return null; 
  
    return dreamArray.filter(function(dream) {
      //selectedTags is one tag
      if(!selectedTag) return true; 
      return dream.tags.indexOf(selectedTag) > -1  
    })
  }
})