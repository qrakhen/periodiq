
/**
 * @extends ContentElement */
class ContextHeadlineElement extends require('../element.js') {
    constructor(text, size) {
        super();
        this.body.type = 'h';
        this.content = text;
        if (size) this.body.style.font_size = size;
    }
}

module.exports = ContextHeadlineElement;
