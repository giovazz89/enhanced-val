(function ($) {
  var originalVal = $.fn.val;
  
  $.fn.val = function(value, resetField = true) {
    
    /* if specified value set it
    ---------------------------------------------------------
    */
    if (typeof value != 'undefined') {
      // make the passed value an array in any case
      if(!$.isArray(value)) value = [value];
      
      // apply value to all passed elements
      $(this).each(funtion(){
        $(this).setSingleVal(value, resetField);
      });
      
      return;
    }
    
    /* if not specified value return
    ---------------------------------------------------------
    */
    var returnValues = [];
    
    // get value from all passed elements
    $(this).each(funtion(){
      returnValues.push($(this).setSingleVal());
    });
    
    if(returnValues.length == 0) return;
    if(returnValues.length == 1) returnValues = returnValues[0];
    return returnValues;
  };
  
  $.fn.getSingleVal = function() {
    var element = $(this);
  };
  
  $.fn.setSingleVal = function(value, resetField) {
    var element = $(this);
  };
})(jQuery);
