module.exports = (function() {
  var useDefaultConsole = false;

  var output = window.document.getElementById('output');

  var log = function() {
    if (useDefaultConsole) {
      console.log.apply(console, arguments);
    } else {
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
    }
  };

  return {
    log: log
  };
})();
