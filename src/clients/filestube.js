var request = require('request');
var jsdom = require('jsdom');

var Filestube_API = (function() {

  var url = 'http://www.filestube.to/query.html?q=';

  var getLinks = function(term, options, callback) {
    var reqOptions = '';

    if (options.type) {
      reqOptions = '&select=' + options.type;
    }

    console.log(url + term + reqOptions);
    jsdom.env({
      url: url + term + reqOptions,
      done: function(err, window) {
        var urls = [];
        var results = window.document.querySelectorAll('.newresult');

        for (var i = 0, j = results.length; i< j; i++) {
          var result = results[i];
          //console.log(result.querySelector('.resultDescription').textContent);

          var hasMoreParts;
          try {
            hasMoreParts = (
              result.querySelector('.resultDescription').textContent.indexOf('parts') > -1
            );
          } catch (e) {
            hasMoreParts = true;
          }


          if (!hasMoreParts) {
            var link = result.querySelector('.resultsLink').href;
            link = 'http://www.filestube.to/' + link.split('/').pop();
            urls.push(link);
          }

        }

        callback(urls);
      }
    });

  };

  var stripFinalLink = function(url, callback) {
    jsdom.env({
      url: url,
      done: function(err, window) {
          if (window.document.querySelector('#copy_paste_links')) {
            callback(window.document.querySelector('#copy_paste_links').textContent);
          } else {
            callback(false);
          }

      }
    })
  };

  return {
    getLinks: getLinks,
    stripFinalLink: stripFinalLink
  }
})();

module.exports = Filestube_API;
