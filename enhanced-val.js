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
        inputpassword: function(element, values, resetField){
            return customVals.inputtext(element, values, resetField);
        },
        textarea: function(element, values, resetField){
            return customVals.inputtext(element, values, resetField);
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
        inputradio: function(element, values, resetField){
            return customVals.inputcheckbox(element, values, resetField);
        },
        option: function(element, values, resetField){
            if (typeof values != typeof undefined){
                if(resetField)
                    element[0].selected = false;
                for(var i in values)
                    if(values[i] == element[0].value)
                        element[0].selected = true;
            }
            else if(element[0].selected == false) return null;
            else return element[0].value;
        },
        select: function(element, values, resetField){
            // if not multiple do not select more than one value
            if(typeof element.attr('multiple') == typeof undefined)
                resetField = true;

            // get the value of each option (if it is not setting any)
            var vals = [], val;
            element.find('option').each(function(){
                val = $(this).val(values, resetField);
                if(val != undefined)
                    vals.push(val);
            });

            return vals;
        },

        // manage unhandled tag names
        other: function(element, values, resetField){
            // if the unhandled element tag name is "input" get the value, otherwise the html
            if(element[0].tagName.toLowerCase() == 'input'){
                return customVals.inputtext(element, values, resetField);
            }
            else{
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

            // if new value is array concat
            var newVals;
            if(customVals.hasOwnProperty(node))
                newVals = customVals[node]($(this));
            else
                newVals = customVals.other($(this));

            if($.isArray(newVals))
                Array.prototype.push.apply(returnValues, newVals);
            else
                returnValues.push(newVals);
        });

        if(returnValues.length == 0) return;
        if(returnValues.length == 1) returnValues = returnValues[0];
        
        return returnValues;
    };
})(jQuery);
