var filestube = require('./clients/filestube');
var filebit = require('./clients/filebit');

var currentLink = 0;
var globalLinks = [];

var downloadAction = function(body) {
  if (!body) {
    console.log('Link unactive, trying another one...');
    currentLink++;
    stripLinks(globalLinks[currentLink]);
  } else {
    console.log('Final link:', body);
  }
}

var stripLinks = function(linkToStrip) {
  filestube.stripFinalLink(linkToStrip, function(link) {
    if (link) {
      filebit.login(function(loggedIn) {
        if (loggedIn) {
          filebit.getLinks(link, downloadAction);
        }
      });
    } else {
      DownloadVideo();
    }
  })
}

var DownloadVideo = function() {
  filestube.getLinks(
    'House of Cards S02E01',
    {
      type: 'mkv'
    },
    function(urls) {
      globalLinks = urls;
      stripLinks(urls[currentLink]);
    }
  );
};

DownloadVideo();
