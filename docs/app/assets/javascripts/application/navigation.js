'use strict';
$(document).ready(function() {

  // t: current time, b: begInnIng value, c: change In value, d: duration
  jQuery.easing['jswing'] = jQuery.easing['swing'];

  jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function swing(x, t, b, c, d) {
      //alert(jQuery.easing.default);
      return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInCubic: function easeInCubic(x, t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function easeOutCubic(x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function easeInOutCubic(x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    }
  });
});

// Navigation things
$(document).ready(function () {

  $('[data-show="sidebar"]').click(function () {
    $('body').addClass('sidebar-expanded');
    $('.overlay').fadeIn(450, 'easeOutCubic');
  });

  $('[data-hide="sidebar"]').click(function () {
    $('body').removeClass('sidebar-expanded');
    $('.overlay').fadeOut(350, 'easeInCubic');
  });

  var windowsize = $(window).width();
  $(window).resize(function () {
    var windowsize = $(window).width();
    if (windowsize > 1200) {
      $('body').removeClass('sidebar-expanded');
      $('.overlay').hide();
    }
  });

  $('.nav-dropdown').click(function () {
    if ($(this).parent().hasClass('active') == false) {
      $(this).siblings('ul').slideToggle(350, 'easeInOutCubic');
      $(this).parent().toggleClass('expanded');
    }
  });
});
