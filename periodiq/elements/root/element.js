const BaseElement = require('../base/element.js');
const __TYPE = 'root';

/**
 * Generic Root Element
 * Keep in mind that you are allowed to create several root elements (to store different views, for example). */
class RootElement extends BaseElement {
    constructor(rootId, width, height) {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.id = rootId || 'root';
        this.body.type = 'root';
        this.setSize(width, height);
    }

    /**
     * A RootElement can not be attached to any other element, so the function is overwritten and returned */
    attach() {
        return;
    }
}

module.exports = RootElement;
