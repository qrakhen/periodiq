
/**
 * @extends BaseElement */
class AbstractContentElement extends require('../base/element.js') {
    constructor() {
        super();
        this.FINAL = true;
        this.content = '';
    }

    setContent(content) {
        this.content = content;
        return this;
    }
}

module.exports = AbstractContentElement;
