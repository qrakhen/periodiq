
/**
 * @extends ContentElement */
class ContentTag extends require('../element.js') {
    constructor(type, attributes, content) {
        super();
        this.body.type = type || 'tag';
        this.body.attributes = attributes || {};
        this.content = content || '';
    }
}

module.exports = ContentTag;
