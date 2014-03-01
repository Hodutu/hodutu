var wikiList = require('./wiki-list');
var omdbApi = require('./omdb');

wikiList(function(list){
  list.forEach(function(show){
    omdbApi(show, function(newShow) {
      console.log(newShow);
    });
  })
});
