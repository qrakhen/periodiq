

class LayoutList extends require('../element.js') {
    constructor() {
        super();
    }

    addItem(element) {
        this.append(element);
        element.addClass('item');
    }

    removeItem(element) {
        element.detach();
        element.removeClass('item');
    }
}

module.exports = LayoutContainer;
