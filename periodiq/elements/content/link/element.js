const __TYPE = 'link';

/**
 * @extends ContentElement */
class ContentLinkElement extends require('../element.js') {
    constructor(url, label) {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.content = label || 'link';
        this.body.attributes.href = url || '';
    }

    setLinkTarget(url) {
        this.body.attributes.href = url;
    }
}

module.exports = ContentLinkElement;
