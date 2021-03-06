const Element = require('../../element/element.js');

class ScrollWrapper extends require('../element.js') {
    constructor() {
        super();
        this.nodes = {
            content: new Element().addClass('content')
        };
    }

    insertContent(content) {
        this.nodes.content.append(content);
        return this;
    }
}

module.exports = ScrollWrapper;
