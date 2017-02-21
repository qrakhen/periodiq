
/**
 * @extends ContentElement */
class ContentParagraphElement extends require('../element.js') {
    constructor() {
        super();
        this.body.type = 'p';
    }
}

module.exports = ContentParagraphElement;
