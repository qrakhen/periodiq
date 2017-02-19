const __BASE = require('../element.js');
const __TYPE = 'text';

class __CLASS extends __BASE {
    constructor() {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.body.type = 'text';
        this.body.style.display = 'inline-block';
    }
}

module.exports = __CLASS;
