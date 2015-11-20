(function ($) {
  var originalVal = $.fn.val;
  
  var customVals = {
    inputtext: function(element, values, resetField = true){
      if (typeof values != 'undefined')
        for(var i in values){
          var newVal = values[i];
          if(!resetField) newVal = element.originalVal() + newVal;
          element.originalVal(newValue);
        }
      else
        return element.originalVal();
    },
    inputcheckbox: function(element, values, resetField = true){
      if (typeof values != 'undefined'){
        if(resetField)
          element[0].checked = false;
        for(var i in values)
          if(values[i] == element.originalVal())
            element[0].checked = true;
      }
      else if(element[0].checked == false) return null;
      else return element.originalVal();
    }
    
    other: function(element, value, resetFiled = true){
      if (typeof values != 'undefined')
        for(var i in values){
          var newVal = values[i];
          if(!resetField) newVal = element.text() + newVal;
          element.text(newValue);
        }
      else
        return element.text();
    }
  }
  
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
