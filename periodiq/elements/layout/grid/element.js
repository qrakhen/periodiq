

class LayoutGridElement extends require('../../base/element.js') {
    constructor(columns) {
        super();
        this.columns = columns || 12;
        this.body.style.position = relative;
    }
}
