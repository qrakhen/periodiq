
/**
 * @extends ContentElement */
class ContentText extends require('../element.js') {
    constructor(content) {
        super();
        this.body.type = 't';
        this.content = content || '';
    }
}

module.exports = ContentText;
