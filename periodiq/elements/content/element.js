const __BASE = require('../base/element.js');
const __TYPE = 'content';

class __CLASS extends __BASE {
    constructor() {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.content = ' ';
    }

    setContent(content) {
        this.content = content;
        return this;
    }
}

module.exports = __CLASS;
