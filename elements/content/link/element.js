
/**
 * @extends ContentElement */
class ContentLink extends require('../element.js') {
    constructor(url, label) {
        super();
        this.content = label || 'link';
        this.body.attributes.href = url || '';
    }

    setLinkTarget(url) {
        this.body.attributes.href = url;
    }
}

module.exports = ContentLink;
