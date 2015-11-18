(function ($) {
  var originalVal = $.fn.val;
  $.fn.val = function(value) {
    if (typeof value != 'undefined') {
      // setter invoked, do processing
    }
    return originalVal.call(this, value);
  };
})(jQuery);
