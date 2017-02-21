
/**
 * @extends ActionElement */
class ActionButtonElement extends require('../element.js') {
    constructor() {
        super();
        this.content = 'btn';
        this.setSize(72, 24);
        this.setColor('#323232');
        this.action = null;
        this.event.addListener('sers', this.onClick.bind(this));
    }

    onClick(eventName, senderId, data) {
        if (senderId === this.id)
            console.log('i was clicked: ', data);
    }
}

module.exports = ActionButtonElement;
