
/**
 * Generic Button element used as extension base for all button-like elements.
 * @extends ActionElement */
class BasicDrawer extends require('../element.js') {
    constructor(label) {
        super();
        this.content = label || this.getFullClass();
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

module.exports = BasicDrawer;
