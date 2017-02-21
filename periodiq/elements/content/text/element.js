
/**
 * @extends ContentElement */
class ContentTextElement extends require('../element.js') {
    constructor() {
        super();
        this.body.type = 'text';
        this.body.style.display = 'inline-block';
    }
}

module.exports = ContentTextElement;
