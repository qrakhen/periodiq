const BaseElement = require('../base/element.js');
const __TYPE = 'content';

class ContentElement extends BaseElement {
    constructor() {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.FINAL = true;
        this.content = ' ';
        this.children = null;
    }
}

module.exports = ContentElement;
