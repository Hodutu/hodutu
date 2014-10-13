'use strict';
/* global document */
/* global window */

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
        var result = document.createElement('li');
        var poster = document.createElement('div');
        var title = document.createElement('div');

        poster.classList.add('poster');
        poster.style.backgroundImage = 'url(' + element.poster + ')';

        title.innerHTML = element.title;
        title.classList.add('title');

        result.appendChild(poster);
        result.appendChild(title);
        result.dataset.title = element.title;

        result.addEventListener('click', function(event) {
          var ttl = event.target.dataset.title ||
                    event.target.parentNode.dataset.title;

          window.location = 'show-details.html#' + ttl;
        });

        autocomplete.appendChild(result);
      });
    });
  }
});
