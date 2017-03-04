
/**
 * Class for creating HTML headling <h> elements.
 * @extends ContentElement */
class ContentHeadline extends require('../element.js') {
    /**
     * Creates a new headline <h> element
     * @param {string} text The string content of this element
     * @param {string} site The CSS font size of this element */
    constructor(text, size) {
        super();
        this.body.type = 'h';
        this.content = text;
        if (size) this.body.style.font_size = size;
    }
}

module.exports = ContentHeadline;
