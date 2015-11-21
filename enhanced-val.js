(function ($) {
    var originalVal = $.fn.val;

    var customVals = {
        inputtext: function(element, values, resetField){
            if (typeof values != typeof undefined)
                for(var i in values){
                    var newValue = values[i];
                    if(!resetField)
                        newValue = element[0].value + newValue;
                    element[0].value = newValue;
                }
            else
                return element[0].value;
        },
        inputcheckbox: function(element, values, resetField){
            if (typeof values != typeof undefined){
                if(resetField)
                    element[0].checked = false;
                for(var i in values)
                    if(values[i] == element[0].value)
                        element[0].checked = true;
            }
            else if(element[0].checked == false) return null;
            else return element[0].value;
        },

        other: function(element, values, resetField){
            if (typeof values != typeof undefined)
                for(var i in values){
                    var newValue = values[i];
                    if(!resetField) newValue = element.html() + newValue;
                    element.html(newValue);
                }
            else
                return element.html();
        }
    }


    $.fn.val = function(value, resetField) {
        if(typeof resetField == typeof undefined) resetField = true;

        /* if specified value set it
        ---------------------------------------------------------
        */
        if (typeof value != typeof undefined) {

            // make the passed value an array in any case
            if(!$.isArray(value)) value = [value];

            // apply value to all passed elements
            $(this).each(function(){
                var node = this.tagName.toLowerCase();
                if (typeof $(this).attr('type') != typeof undefined)
                    node += $(this).attr('type');
                if(customVals.hasOwnProperty(node))
                    customVals[node]($(this), value, resetField);
                else
                    customVals.other($(this), value, resetField);
            });

            return;
        }

        /* if not specified value return
        ---------------------------------------------------------
        */
        var returnValues = [];

        // get value from all passed elements
        $(this).each(function(){
            var node = this.tagName.toLowerCase();
            if (typeof $(this).attr('type') != typeof undefined)
                node += $(this).attr('type');
            if(customVals.hasOwnProperty(node))
                returnValues.push(customVals[node]($(this)));
            else
                returnValues.push(customVals.other($(this)));
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
