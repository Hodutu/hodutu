var async = require('async');
var Nedb = require('nedb');

var wikiList = require('./wiki-list');
var omdbApi = require('./omdb');
var tvShowList = new Nedb({ filename: 'src/data/tv_show_list.db', autoload: true });
var finalList = [];

wikiList(function(list) {
  async.each(list,
    function(show, callback) {
      omdbApi(show, function(newShow) {
        console.log(newShow.title);
        finalList.push(newShow);
        callback();
      });
    },
    function() {
      tvShowList.insert(finalList, function(err){
        console.log('ERROR:', err);
      });
    }
  );
});
