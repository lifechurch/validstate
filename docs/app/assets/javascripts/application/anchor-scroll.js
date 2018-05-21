$(document).ready(function(){

  $("a[href^='#']:not([href='#']):not(.tab-link):not([data-disable='scroll']):not([data-toggle])").click(function() {
    var target;
    var scrollTarget;
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      target = $(this.hash);
      var customScroll = target.closest('[data-link-scroll]');
      scrollTarget = customScroll.length ? customScroll : $('html,body');
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        scrollTarget.animate({
          scrollTop: (scrollTarget.prop('scrollTop') + target.offset().top) - 64
        }, 400);
        return false;
      }
    }
  });

});
