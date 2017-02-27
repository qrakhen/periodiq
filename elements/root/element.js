
/**
 * Generic Root Element
 * Keep in mind that you are allowed to create several root elements (to store different views, for example). */
class RootElement extends require('../base/element.js') {
    constructor(rootId) {
        super();
        this.rootId = rootId || 'root';
        this.body.type = 'root';
    }

    /**
     * A RootElement can not be attached to any other element, so the function is overwritten and returned */
    attach() {
        return;
    }
}

module.exports = RootElement;
