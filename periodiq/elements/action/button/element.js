const __BASE = require('../element.js');
const __TYPE = 'btn';

const Tag = require('../../content/tag/element.js');

class __CLASS extends __BASE {
    constructor() {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.content = 'btn';
        this.setSize(72, 24);
        this.setColor('#727272');
        this.action = null;
    }

    buttonAction(s, e) {
        if (typeof this.action !== 'function')
            return;

        this.action(s, e);
    }
}

module.exports = __CLASS;
