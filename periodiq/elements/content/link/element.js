const ContentElement = require('../element.js');
const __TYPE = 'link';

class LinkElement extends ContentElement {
    constructor() {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.FINAL = true;
        this.content = ' ';
        this.children = null;
        this.body.attributes.href = ' ';
    }

    setLinkTarget(url) {
        this.body.attributes.href = url;
    }
}

module.exports = ContentElement;
