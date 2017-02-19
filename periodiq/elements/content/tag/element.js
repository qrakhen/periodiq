const __BASE = require('../element.js');
const __TYPE = 'tag';

class __CLASS extends __BASE {
    constructor(type, attributes, content) {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.body.type = type || 'tag';
        this.body.attributes = attributes || {};
        this.content = content || '';
    }
}

module.exports = __CLASS;
