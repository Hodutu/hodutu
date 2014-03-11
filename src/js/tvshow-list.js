var Nedb = require('nedb');
module.exports = new Nedb({ filename: 'src/data/tv_show_list.db', autoload: true });
