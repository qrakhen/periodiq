const BaseElement = require('../base/element.js');
const __TYPE = 'root';

class RootElement extends BaseElement {
    constructor(rootId, width, height) {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.id = rootId || 'root';
        this.body.type = 'root';
        this.setSize(720, 480);
    }
}

module.exports = RootElement;
