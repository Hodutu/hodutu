var CONFIG = (function(){
  var download_dir = './src/downloads/';
  var data_dir = './src/data/';

  return {
    // Downloads
    movies_dir: download_dir + 'movies/',
    covers_dir: download_dir + 'covers/',

    // Data
    list_file: data_dir + 'list.js'
  }
})();

module.exports = CONFIG;
