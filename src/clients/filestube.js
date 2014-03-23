var jsdom = require('jsdom');

var Filestube_API = (function() {

  var url = 'http://www.filestube.to/query.html?q=';
  var pages = 0;
  var currentPage = 1;
  var totalUrls = [];
  var mainCallback = function(e) { console.log('Sum tink rong', e); };

  var parsePage = function(url, cb) {
    jsdom.env({
      url: url,
      done: function(err, window) {
        var urls = [];

        if (pages === 0) {
          if (window.document.querySelector('.homePgr')) {
            pages = window.document.querySelector('.homePgr').querySelectorAll('a').length;
            console.log('Number of pages:', pages);
          } else {
            pages = 1;
          }

        }

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

          var properEpisode = true;
          try {
            var episode = url.match(/E([0-9]*)&/)[1];
            properEpisode = (
              result.querySelector('.resultsLink').textContent.indexOf(episode) > -1
            );
          } catch (e) {
            properEpisode = false;
          }

          if (!hasMoreParts && properEpisode) {
            var link = result.querySelector('.resultsLink').href;
            link = 'http://www.filestube.to/' + link.split('/').pop();
            urls.push(link);
          }

        }

        cb(urls);
      }
    });
  }

  var handlePageParsingResults = function(urls) {
    totalUrls = totalUrls.concat(urls);
    if (currentPage < pages) {
      currentPage++;
      parsePage(url + '&page=' + currentPage, handlePageParsingResults);
    } else {
      mainCallback(totalUrls);
    }
  };

  var getLinks = function(term, options, callback) {
    mainCallback = callback;
    pages = 0;
    currentPage = 1;
    url = 'http://www.filestube.to/query.html?q=';
    totalUrls = [];
    term = term.replace(/\s/g, '+');
    var reqOptions = '';

    if (options.type) {
      reqOptions = '&select=' + options.type;
    }

    url = url + term + reqOptions;
    console.log('Starting link:', url);

    parsePage(url, handlePageParsingResults);

  };

  var stripFinalLink = function(url, callback) {
    console.log('Link proceeded: ', url);
    if (url) {
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
    } else {
      callback(false);
    }
  };

  return {
    getLinks: getLinks,
    stripFinalLink: stripFinalLink
  }
})();

module.exports = Filestube_API;
