

class LayoutGridElement extends require('../../base/element.js') {
    constructor(columns) {
        super();
        this.body.columns = columns || 12;
        this.addClass('grid');
    }

    appendToGrid(element, columns) {
        var columns = columns || 1;
        var float = ((columns / this.body.columns) * 99.275);
        element.attach(this);
        element.body.style.width = float + '%';
        element.body.style.display = 'inline-block';
        return this;
    }
}

module.exports = LayoutGridElement;
