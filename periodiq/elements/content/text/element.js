
/**
 * @extends ContentElement */
class ContentTextElement extends require('../element.js') {
    constructor(content) {
        super();
        this.body.type = 't';
        this.content = content || '';
    }
}

module.exports = ContentTextElement;
