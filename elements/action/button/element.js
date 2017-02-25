
/**
 * Generic Button element used as extension base for all button-like elements.
 * @extends ActionElement */
class BasicButton extends require('../element.js') {
    constructor() {
        super();
        this.content = 'btn';
        this.clickCallback = null;
        this.body.attributes.clickevent = this.TYPE + '_click';
        this.eventController.addListener(this.body.attributes.clickevent, this.onClickListen.bind(this));
        this.addClass('button');
    }

    /**
     * Triggered when button is clicked */
    onClickListen(eventName, senderId, data) {
        if (senderId === this.id && this.actionCallback !== null)
            this.clickCallback(data);
    }

    onClick(callback) {
        this.clickCallback = callback;
    }
}

module.exports = BasicButton;
