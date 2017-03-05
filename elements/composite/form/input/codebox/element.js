const ContentText = require('../../../../content/text/element.js');

class CodeTextBox extends require('../element.js') {
    constructor() {
        super();
        this.nodes = {
            content: new ContentText('more text').addClass('content')
        };
    }
}

module.exports = CodeTextBox;
