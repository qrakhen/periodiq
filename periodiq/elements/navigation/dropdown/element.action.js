/**
 * DropdownAction
 * @extends AbstractAction */
class DropdownAction extends require(__dirname + '/../../abstract/element.action.js') {

    /**
     * Will be called for each found DOM node for this element,
     * so the element parameter is NOT an periodiq Element class object,
     * @param {DomNode} element element dom node, queried by id. */
    constructor(element) {
        super(element);
    }
}

module.exports = DropdownAction;
