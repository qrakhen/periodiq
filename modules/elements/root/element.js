const BaseElement = require('../base/element.js');
const __TYPE = 'root';

class RootElement extends BaseElement {
    constructor(rootId) {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.id = rootId || 'root';
        this.body.type = 'root';
    }
}

module.exports = RootElement;
