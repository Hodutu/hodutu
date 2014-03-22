var filestube = require('./clients/filestube');


var DownloadVideo = function(){
  filestube.getLinks(
    'House of Cards S02E01',
    {
      type: 'mkv'
    },
    function(urls) {
      //console.log(resp);
      filestube.stripFinalLink(urls[0], function(link) {
        if (link) {
          console.log(link);
        } else {
          DownloadVideo();
        }
      })
    }
  );
};

DownloadVideo();
