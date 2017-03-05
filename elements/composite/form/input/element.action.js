/**
 * DropdownAction
 * @extends AbstractAction */
class InputFieldAction extends require(__dirname + '/../../../abstract/element.action.js') {
    constructor(element) {
        super(element);
        element.addEventListener('click', this.onClick.bind(this));
    }

    onClick() {
        // remove selected from all others;
        this.addClass('selected');
    }
}

module.exports = InputFieldAction;
