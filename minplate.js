/*!
 * (c) MopTym
 * http://moptym.com/
 * 
 * minplate.js built in 2015
 * Released under the MIT License.
 */
(function (root, factory) {

    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define([], factory);
    else if(typeof exports === 'object')
        exports['Minplate'] = factory();
    else
        root['Minplate'] = factory();

})(this, function() {

    var escapeHTML = (function () {
        var box = document.createElement('span'),
            node = document.createTextNode('');
        box.appendChild(node);
        return function(text) {
            node.data = text;
            return box.innerHTML;
        };
    }());

    function render(tpl, data, wrapper) {
        return tpl.replace(/\{\{.*?\}\}/g, function(name) {
            var val = data || '', wVal = wrapper || '', scope;
            name.replace(/\{\{\s*|\s*\}\}/g, '').replace(/\w+|-/g, function(prop) {
                scope = val;
                val = (val[prop] !== void 0? val[prop]: '');
                wVal = (wVal[prop] !== void 0? wVal[prop]: '');
            });
            val = (wVal === ''? val: wVal);
            val = (typeof val === 'function'? val.call(scope): val);
            return escapeHTML(val);
        });
    }

    function renderArray(tpl, array, wrapper) {
        var result = '', i;
        for (i = 0; i < array.length; i++) {
            result += render(tpl, array[i], wrapper);
        }
        return result;
    }

    return {
        render: render,
        renderArray: renderArray
    };

});