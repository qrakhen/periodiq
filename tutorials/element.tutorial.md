# Tutorial: Elements
### How to create, extend, style and use Elements.

Create folder for all elements, eg elements/
create another folder within there for your new element
create element.js and insert

    // elements/myElement/element.js - example
    var BaseElement = require('periodiq').Element.Base;

    class myElement extends BaseElement {
        constructor() {
            super();
        }
    }

    modules.exports = MyCustomElement;

The name of the
We extended from base element, that means we have all presets for a visible and styleable element.
It
