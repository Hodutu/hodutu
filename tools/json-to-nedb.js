var Nedb = require('nedb');
var userJsonData = require(__dirname + '/../src/trash-data/data.js');

var userList = new Nedb({ filename: 'src/data/user_data.db', autoload: true });

userList.insert(userJsonData, function(err){
  if (err) {
    console.log("ERROR!", err);
    return;
  }

  console.log('database generated');
});
