const __TYPE = 'text';

/**
 * @extends ContentElement */
class ContentTextElement extends require('../element.js') {
    constructor() {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.body.type = 'text';
        this.body.style.display = 'inline-block';
    }
}

module.exports = ContentTextElement;
