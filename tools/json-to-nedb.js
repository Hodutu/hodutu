var Nedb = require('nedb');
var userJsonData = require(__dirname + '/../src/trash-data/data.js');

var userList = new Nedb({ filename: 'src/data/user_data.db', autoload: true });

userJsonData.forEach(function(show){
  console.log(show.title);
})
