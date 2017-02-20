const __TYPE = 'content';

/**
 * @extends BaseElement */
class ContentElement extends require('../base/element.js') {
    constructor() {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.content = ' ';
        this.body.style.display = 'inline-block';
    }

    setContent(content) {
        this.content = content;
        return this;
    }
}

module.exports = ContentElement;
