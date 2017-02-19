const __BASE = require('../base/element.js');
const __TYPE = 'root';

class __CLASS extends __BASE {
    constructor(rootId, width, height) {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.id = rootId || 'root';
        this.body.type = 'root';
        this.setSize(width, height);
    }
}

module.exports = __CLASS;
