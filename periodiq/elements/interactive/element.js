const __BASE = require('../base/element.js');
const __TYPE = 'iac';

class __CLASS extends __BASE {
    constructor() {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.body.type = 'iac';
    }
}

module.exports = __CLASS;
