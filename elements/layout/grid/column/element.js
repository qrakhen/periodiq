

class LayoutGridColumn extends require('../element.js') {
    constructor(columns) {
        super();
        this.body.columns = columns || 1;
        this.addClass('col-' + columns).addClass('col');
    }
}

module.exports = LayoutGridColumn;
