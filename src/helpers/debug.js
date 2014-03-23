module.exports = (function() {
  var output = window.document.getElementById('output');

  var log = function() {
    var data = Array.prototype.slice.call(arguments);
    data = data.map(function(v, i) {
      var res;
      if (v !== undefined) {
        res = (i===0 ? '<b>' + v.toString() + '</b> ' : v.toString() + ' ');
      } else {
        res = '';
      }
      return res;
    });
    output.innerHTML += data + '<br/>';
  };

  return {
    log: log
  };
})();
