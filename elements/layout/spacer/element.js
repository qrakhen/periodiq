
class LayoutSpacer extends require('../../base/element.js') {
    constructor(height) {
        super();
        if (height) this.body.styles.height = height;
    }
}

module.exports = LayoutSpacer;
