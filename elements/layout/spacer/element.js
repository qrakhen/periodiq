
class LayoutSpacer extends require('../element.js') {
    constructor(height) {
        super();
        if (height) this.body.styles.height = height;
    }
}

module.exports = LayoutSpacer;
