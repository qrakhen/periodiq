const ContentText = require('../../../../content/text/element.js');

class TextBoxInput extends require('../element.js') {
    constructor(param) {
        super(param);
        this.nodes = {
            content: new ContentText('more text').addClass('content')
        };
    }
}

module.exports = TextBoxInput;
