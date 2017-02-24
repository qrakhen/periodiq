
/**
 * @extends ContentElement */
class ContentParagraph extends require('../element.js') {
    constructor() {
        super();
        this.body.type = 'p';
    }
}

module.exports = ContentParagraph;
