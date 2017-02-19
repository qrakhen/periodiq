const InteractiveElement = require('../element.js');
const __TYPE = 'btn';

class ButtonElement extends InteractiveElement {
    constructor() {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
    }

    onClick(callback) {
        
    }
}

module.exports = ButtonElement;
