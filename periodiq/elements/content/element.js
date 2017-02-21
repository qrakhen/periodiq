
/**
 * @extends BaseElement */
class ContentElement extends require('../base/element.js') {
    constructor() {
        super();
        this.FINAL = true;
        this.content = ' ';
        this.body.style.display = 'inline-block';
    }

    setContent(content) {
        this.content = content;
        return this;
    }
}

module.exports = ContentElement;
