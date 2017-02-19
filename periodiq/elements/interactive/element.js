const BaseElement = require('../base/element.js');
const __TYPE = 'iac';

class InteractiveElement extends BaseElement {
    constructor() {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.body.type = 'iac';
    }
}

module.exports = InteractiveElement;
