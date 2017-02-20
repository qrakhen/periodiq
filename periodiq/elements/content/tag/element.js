
/**
 * @extends ContentElement */
class ContentTagElement extends require('../element.js') {
    constructor(type, attributes, content) {
        super();
        this.TYPE = ContentTagElement.__CLASS_NAME;
        this.body.type = type || 'tag';
        this.body.attributes = attributes || {};
        this.content = content || '';
    }
}

module.exports = ContentTagElement;
