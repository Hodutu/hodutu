var listDb = require('./js/tvshow-list');

var input = document.getElementById('search');
var autocomplete = document.getElementById('autocomplete');

input.addEventListener('input', function() {
  var text = input.value;
  autocomplete.innerHTML = '';
  if (text.length > 2) {
    listDb.find({ title: new RegExp(text, 'ig') }, function (err, docs) {
      //console.log('E', docs);
      docs.forEach(function(element) {
        autocomplete.innerHTML += "<li>" + element.title + "</li>";
      });
    });
  }
});
