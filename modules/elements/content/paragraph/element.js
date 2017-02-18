const ContentElement = require('../element.js');
const __TYPE = 'paragraph';

class ParagraphElement extends ContentElement {
    constructor() {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.body.type = 'p';
        this.body.brim = [0, 8, 0, 8];
        this.body.style.display = 'inline-block';
    }
}

module.exports = ParagraphElement;
