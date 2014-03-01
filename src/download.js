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
    debug.log('CURRENT LYNK:', currentLink);
    stripLinks(globalLinks);
  } else {
    currentLink = 0;
    debug.log('Final link:', body);
    finalLinks.push(body);
    //episode++;

    if (episode === 14) {//(finalLinks.length === 19) {
      debug.log('DONE.....');
      debug.log('LINKS:');
      debug.log(finalLinks);
      } else {
        episode++
        DownloadVideo(titles+episode);
      }
  }
};

var stripLinks = function(linkToStrip) {
  debug.log('CURRENT LINK:', currentLink, linkToStrip);
  filestube.stripFinalLink(linkToStrip[currentLink], function(link) {
    debug.log('LINK AFTER STRIPING:', link);
    if (link) {
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
      //type: 'mkv'
    },
    function(urls) {
      globalLinks = urls;
      stripLinks(urls);
    }
  );
};

var titles = 'Suits S03E';
// var maxEpisodes = 9;
var episode = 14;

DownloadVideo(titles + episode);

//DownloadVideo();
