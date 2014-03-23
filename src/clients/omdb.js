var request = require('request');

var OMDBClient = function(id, callback) {
    var url = 'http://www.omdbapi.com/?i=';

    request({
      url: url + id
    },
    function(err, response, body) {
      var response = JSON.parse(body);
      var resp = {
        'episodeLength' : parseInt(response.Runtime, 10),
        'poster' : response.Poster
      }
      callback(resp, id);
    });
};

module.exports = OMDBClient;
