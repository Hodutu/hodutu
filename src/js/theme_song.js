var themeSong = function(title, cb) {
  var request = require('request');

  //var title = "Two And A Half Man";
  var apiUrl = "http://www.youtube.com/results?search_query=";

  console.log('elo!');
  var url = apiUrl + title.replace(' ', '+') + "+theme+song";
  console.log(url);
  request(url, function (error, response, body) {
    console.log('EEEEEE', error, response);
    if (!error && response.statusCode == 200) {
      var firstIndex = body.indexOf('/watch?v=');
      var ytId = body.substr(firstIndex + 9, 25).split('"')[0];
      cb(
        'http://youtubeinmp3.com/fetch/?video=http://www.youtube.com/watch?v=' +
        ytId
      );
    }
  });
}



// var getMp3FromYt = function(ytId) {
//   var mp3Api = 'http://youtubeinmp3.com/fetch/?video=http://www.youtube.com/watch?v=';
//   request(mp3Api + ytId, function (error, response, body) {
//     console.log(body);
//
//   });
// }
