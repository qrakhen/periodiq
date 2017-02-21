
/**
 * @extends BaseElement */
class ContentElement extends require('../base/element.js') {
    constructor() {
        super();
        this.FINAL = true;
        this.content = ' ';
    }

    setContent(content) {
        this.content = content;
        return this;
    }
}

module.exports = ContentElement;
