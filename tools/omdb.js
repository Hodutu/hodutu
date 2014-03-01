var request = require('request');

var omdbApi = 'http://www.omdbapi.com/?t=';

module.exports = function(show, cb) {
  request(omdbApi + show.title, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      var newShow = {
        title: show.title,
        imdb: data.imdbID
      };

      if (data.Poster !== 'N/A') {
        newShow.poster = data.Poster;
      }

      if (show.wiki) {
        newShow.wiki = show.wiki;
      }

      cb(newShow);
    }
  });
};
