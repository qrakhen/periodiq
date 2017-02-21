/**
 * Button Action
 * @extends AbstractAction */
class ButtonAction extends require(__dirname + '/../../abstract/element.action.js') {

    /**
     * Will be called for each found DOM node for this element,
     * so the element parameter is NOT an periodiq Element class object,
     * @param {DomNode} element element dom node, queried by id. */
    constructor(element) {
        super(element);
        this.originalStyle = element.style.cssText;
        element.addEventListener('click', this.onClick.bind(this));
        element.addEventListener('mouseenter', this.onHover.bind(this));
        element.addEventListener('mouseleave', this.onLeave.bind(this));
    }

    onClick() {

    }

    onHover() {
        this.element.style['background-color'] = '#929292';
    }

    onLeave() {
        this.element.style.cssText = this.originalStyle;
    }
}

module.exports = ButtonAction;
