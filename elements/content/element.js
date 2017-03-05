
/**
 * @extends Element */
class AbstractContentElement extends require('../element/element.js') {
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
