const __BASE = require('../element.js');
const __TYPE = 'link';

class __CLASS extends __BASE {
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

module.exports = __CLASS;
