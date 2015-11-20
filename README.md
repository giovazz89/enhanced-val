# enhanced-val
jQuery plugin to extend and improve the default .val() method

Have you ever wanted to get or set a value to checkboxes, radio buttons or even text elements with the jQuery val() function? Try out enhanced-val.js!

### Usage

```$('elements_selector').val(value, resetField);```

Param | Type | Default | Description
------|------|---------|------------
value | string or string[ ] | | The value/values you want to set to the objects: if not present it returns the current value
resetField | boolean | true | if false doesn't overwrite the previos value, but appends the new one to it
returns | string or string[ ] | | The function returns the string value for each selected element if no value to set is specified
