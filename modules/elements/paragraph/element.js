const BaseElement = require('../base/element.js');
const __TYPE = 'paragraph';

class ParagraphElement extends BaseElement {
    constructor() {
        super();
        this.FINAL = true;
        this.content = ' ';
        this.body.type = 'p';
        this.body.brim = [0, 8, 0, 8];
        this.body.style.display = 'inline-block';
    }
}

module.exports = ParagraphElement;
