var request = require('request');

var OMDBClient = function(chunk, callback) {
    var url = 'http://www.omdbapi.com/?i=';

    request({
      url: url + chunk.imdb
    },
    function(err, response, body) {
      var response = JSON.parse(body);
      var resp = {
        'episodeLength' : parseInt(response.Runtime, 10),
        'poster' : response.Poster,
        'chunk' : chunk
      }
      callback(resp);
    });
};

module.exports = OMDBClient;
