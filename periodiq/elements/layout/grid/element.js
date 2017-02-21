

class LayoutGridElement extends require('../../abstract/element.js') {
    constructor(columns) {
        super();
        this.columns = columns || 12;
        this.body.style.position = relative;
    }
}
