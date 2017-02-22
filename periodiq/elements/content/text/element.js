
/**
 * @extends ContentElement */
class ContentTextElement extends require('../element.js') {
    constructor() {
        super();
        this.body.type = 'text';
    }
}

module.exports = ContentTextElement;
