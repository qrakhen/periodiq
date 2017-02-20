
/**
 * Base Element class for all event using elements, such as buttons.
 * All elements that want to communicate with the main thread should be derived from this class,
 * or you have to manually implement the Event system for any other class.
 * @extends BaseElement */
class ActionElement extends require('../base/element.js') {
    constructor() {
        super();
        this.TYPE = ActionElement.__CLASS_NAME;
        this.body.type = 'iac';
    }
}

module.exports = ActionElement;
