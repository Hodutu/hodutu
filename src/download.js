var filestube = require('./clients/filestube');
var filebit = require('./clients/filebit');
var debug = require('./helpers/debug');

var currentLink = 0;
var globalLinks = [];
var finalLinks = [];
var downloadAction = function(body) {
  if (!body) {
    debug.log('Link unactive, trying another one...');
    currentLink++;
    stripLinks(globalLinks);
  } else {
    debug.log('Final link:', body);
    finalLinks.push(body);
    //episode++;

    //if (finalLinks.length === maxEpisodes) {
      debug.log('DONE.....');
      debug.log('LINKS:');
      debug.log(finalLinks);
    // } else {
    //   DownloadVideo(titles + (episode < 10 ? '0'+episode : episode));
    // }
  }
};

var stripLinks = function(linkToStrip) {
  debug.log('CURRENT LINK:', currentLink, linkToStrip);
  filestube.stripFinalLink(linkToStrip[currentLink], function(link) {
    if (link) {
      currentLink = 0;
      filebit.login(function(loggedIn) {
        if (loggedIn) {
          filebit.getLinks(link, downloadAction);
        }
      });
    } else {
      currentLink++;
      stripLinks(globalLinks);
      //DownloadVideo(titles + (episode < 10 ? '0'+episode : episode));
    }
  });
};

var DownloadVideo = function(title) {
  filestube.getLinks(
    title,
    {
      type: 'mkv'
    },
    function(urls) {
      globalLinks = urls;
      stripLinks(urls);
    }
  );
};

var titles = 'House Of Cards S02E09';
// var maxEpisodes = 9;
// var episode = 6;

DownloadVideo(titles);

//DownloadVideo();
