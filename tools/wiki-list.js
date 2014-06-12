var request = require('request');
var apiCall = "http://en.wikipedia.org/w/api.php?format=json&action=" +
              "query&titles=List_of_television_programs_by_name&prop" +
              "=revisions&rvprop=content";

var newList = [];
var parseWikiResponse = function(jsonData, cb) {
  var pages = JSON.parse(jsonData).query.pages;
  var list = pages[Object.keys(pages)[0]].revisions[0]['*'].split('\n');

  list.forEach(parseLine);

  cb(newList);
};

var parseLine = function(line) {
  // Every line needs to be one of the following:
  // * an empty line:
  // * letter header: ==X==
  // * category line
  // * line with simple title: *''[[Yes, Dear]]''
  // * or with complex title: *''[[The Xtra Factor (UK)|The Xtra Factor]]'' (UK)
  //
  // We are only interested in latter 2 types. In 1st case we return the
  // name of the show, in the second one also the wiki page.

  //console.log(line, !(line === '' || line.charAt(0) === '='));
  if (!(line === '' || line.charAt(0) === '=' || line.charAt(0) !== '*')) {
    var show = {};
    try {
      line = line.match(/\[\[(.*?)\]\]/)[1];

      // Do we need to split wiki page from the title of the show?
      // Let's check for the description-link from MarkUp
      var nameSplit = line.split('|');

      // if no '|', the array has just one element
      var show = {
        name: nameSplit[0]
      }

      // if '|' was there, then we have 2 elements
      if (nameSplit.length > 1) {
        show.name = nameSplit[1];
        show.wiki = nameSplit[0];
      }

      //console.log(show);
      newList.push(show);

    } catch (e) {
      console.log(
        'Something is wrong with Force Five.',
        'Who even put it on the list if there is no link?',
        'COME ON!',
        'Since day 1 the universe is against me.',
        'Nah, I\'ll nail it anyway.'
      );
      console.log('ERROR:', e)
      console.log('TV SHOW:', line);
    }
  }
};

module.exports = function(cb) {
  request(apiCall, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      parseWikiResponse(body, cb); // Print the google web page.
    }
  });
}
