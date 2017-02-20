
/**
 * @extends ContentElement */
class ContentTextElement extends require('../element.js') {
    constructor() {
        super();
        this.TYPE = ContentTextElement.__CLASS_NAME;
        this.body.type = 'text';
        this.body.style.display = 'inline-block';
    }
}

module.exports = ContentTextElement;
