
/**
 * Generic Button element used as extension base for all button-like elements.
 * @extends ActionElement */
class BasicButton extends require('../element.js') {
    constructor(label) {
        super();
        this.body.type = 'btn';
        this.content = label || this.getFullClass();
        this.clickCallback = null;
        this.body.attributes.clickevent = this.TYPE + '_click';
        this.eventController.addListener(this.body.attributes.clickevent, this.clicked.bind(this));
        this.addClass('button');
    }

    /**
     * Triggered when button is clicked */
    clicked(eventName, senderId, data) {
        if (senderId === this.getId() && this.actionCallback !== null)
            this.clickCallback(data);
    }

    onClick(callback) {
        this.clickCallback = callback;
    }
}
pqns('pq.Elements.Action').BasicButton = BasicButton;
module.exports = BasicButton;
