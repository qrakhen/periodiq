
/**
 * @extends ContentElement */
class ContentParagraphElement extends require('../element.js') {
    constructor() {
        super();
        this.TYPE = ContentParagraphElement.__CLASS_NAME;
        this.body.type = 'p';
        this.body.style.display = 'inline-block';
        this.setMargin(8, 0, 8, 4);
    }
}

module.exports = ContentParagraphElement;
