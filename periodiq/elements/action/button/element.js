
/**
 * @extends ActionElement */
class ActionButtonElement extends require('../element.js') {
    constructor() {
        super();
        this.content = 'btn';
        this.actionCallback = null;
        this.body.attributes.events = { click: this.TYPE + '_click' };
        this.eventController.addListener(this.body.attributes.events.click, this.onClick.bind(this));
        this.addClass('button');
    }

    /**
     * Triggered when button is clicked */
    onClick(eventName, senderId, data) {
        if (senderId === this.id && this.actionCallback !== null)
            this.actionCallback(data);
    }

    /**
     * Sets the callback that will be triggered as soon as the button is clicked. */
    setActionCallback(callback) {
        this.actionCallback = callback;
    }
}

module.exports = ActionButtonElement;
