
/**
 * @extends ActionElement */
class ActionButtonElement extends require('../element.js') {
    constructor() {
        super();
        this.TYPE = ActionButtonElement.__CLASS_NAME;
        this.content = 'btn';
        this.setSize(72, 24);
        this.setColor('#323232');
        this.action = null;
    }

    buttonAction(s, e) {
        if (typeof this.action !== 'function')
            return;

        this.action(s, e);
    }
}

module.exports = ActionButtonElement;
