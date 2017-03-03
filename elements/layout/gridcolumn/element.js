

class LayoutColumn extends require('../element.js') {
    constructor(columns) {
        super();
        this.body.columns = columns || 1;
        this.addClass('col-' + columns);
    }
}

module.exports = LayoutColumn;
