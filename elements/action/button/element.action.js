/**
 * Generic ButtonAction that sends an event to the server as soon as the element it clicked.
 * @extends AbstractAction */
class ButtonAction extends require(__dirname + '/../../abstract/element.action.js') {

    /**
     * Will be called for each found DOM node for this element,
     * so the element parameter is NOT an periodiq Element class object,
     * @param {DomNode} element element dom node, queried by id. */
    constructor(element) {
        super(element);
        element.addEventListener('click', this.onClick.bind(this));
    }

    onClick() {
        this.eventController.trigger(this.element.getAttribute('clickevent'), this.getElementID(), {});
    }
}

module.exports = ButtonAction;
