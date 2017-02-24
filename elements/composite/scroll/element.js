const BaseElement = require('../../base/element.js');

class ScrollWrapper extends require('../element.js') {
    constructor() {
        super();
        this.nodes = {
            content: new BaseElement().addClass('content')
        };
    }

    insertContent(content) {
        this.nodes.content.append(content);
        return this;
    }
}

module.exports = ScrollWrapper;
