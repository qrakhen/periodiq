
/**
 * @extends ContentElement */
class ContentHeadline extends require('../element.js') {
    constructor(text, size) {
        super();
        this.body.type = 'h';
        this.content = text;
        if (size) this.body.style.font_size = size;
    }
}

module.exports = ContentHeadline;
