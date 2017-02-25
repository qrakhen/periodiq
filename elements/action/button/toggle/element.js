
/**
 * Generic Button element used as extension base for all button-like elements.
 * @extends ActionElement */
class ToggleButton extends require('../element.js') {
    constructor() {
        super();
        this.toggleState = false;
        this.content = 'tgl.btn';
    }

    /**
     * Triggered when button is clicked */
    onClick(eventName, senderId, data) {
        if (senderId === this.id && this.actionCallback !== null) {
            this.toggleState = !this.toggleState;
            var c = (this.toggleState ? 'active' : 'inactive');
            if (c == 'active') this.addClass(c);
            else this.removeClass('inactive');
        }
    }
}

module.exports = ToggleButton;
