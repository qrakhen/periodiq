const Element = require('../../element/element.js');

class BaseInputField extends require('../element.js') {
    constructor() {
        super();
        this.addClass();
        this.nodes = {
            placeholder: new ContentText('placeholder').addClass('placeholder')
        };
    }

    insertContent(content) {
        this.nodes.content.append(content);
        return this;
    }
}

module.exports = BaseInputField;
