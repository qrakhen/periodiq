
/**
 * Class for creating HTML Paragraph <p> elements.
 * @extends ContentElement */
class ContentParagraph extends require('../element.js') {
    /**
     * Creates a new paragraph <p> element
     * @param {string} text Content
     * @param {string} size The CSS font size of this element */
    constructor(text, size) {
        super();
        this.body.type = 'p';
        this.content = text;
        if (size) this.body.style.font_size = size;
    }
}

module.exports = ContentParagraph;
