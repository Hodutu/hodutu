var showDetails = (function(){
  var showTitle;
  var showTitleDom;

  var init = function(){
    showTitleDom = document.getElementById('show-title');
    showTitle = window.location.hash;
    showTitle = showTitle.substr(1, showTitle.length);

    showTitleDom.innerHTML = showTitle;
  }

  return {
    init: init
  }
})();

showDetails.init();
