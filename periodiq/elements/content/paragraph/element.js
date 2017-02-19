const __BASE = require('../element.js');
const __TYPE = 'paragraph';

class __CLASS extends __BASE {
    constructor() {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.body.type = 'p';
        this.body.style.display = 'inline-block';
        this.setMargin(8, 0, 8, 4);
    }
}

module.exports = __CLASS;
