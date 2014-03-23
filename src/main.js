var config = require('./config');
var omdb = require('./clients/omdb');

var fs = require('fs');
var download = require('download');

var shows;
var edited = false; // Did we change soemthing in the chunk?

var container = window.document.getElementById('container');

var proceedDataChunk = function(chunk, i) {
  console.log('SCIAGAMY?', !chunk.poster);
  if (chunk.poster) {
    addTvShow({poster: chunk.poster});
    if (i===shows.length-1 && edited) {
      saveFile(shows);
    }
  } else {
    omdb(chunk.imdb, function(resp) {
      var ee = download(resp.poster, config.covers_dir, { mode: '0777' });
      ee.on('close', function(){
        var poster = (config.covers_dir.replace('./src/', '')) + (resp.poster.split('/').pop());
        chunk.poster = poster;
        addTvShow({poster: poster});
        shows[i] = chunk;
        edited = true;

        if (i===shows.length-1 && edited) {
          saveFile(shows);
        }

      });
    });
  }

};

var addTvShow = function(resp) {
  var img = window.document.createElement('div');
  img.classList.add('cover');
  img.style.backgroundImage = 'url(' + resp.poster + ')';
  container.appendChild(img);
};

var saveFile = function(data) {
  fs.writeFile(config.list_file, JSON.stringify(data), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
  });
};

fs.readFile(config.list_file, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  shows = JSON.parse(data);
  shows.forEach(proceedDataChunk);
});
