const Path = require('path');
const EventController = require(Path.resolve(__dirname + '/../../static/event.js'));

/**
 * Base Element class for all event using elements, such as buttons.
 * All elements that want to communicate with the main thread should be derived from this class,
 * or you have to manually implement the Event system for any other class.
 * @extends BaseElement */
class AbstractActionElement extends require('../base/element.js') {
    constructor() {
        super();
        this.body.type = 'acel';
        this.eventController = EventController;
    }
}

module.exports = AbstractActionElement;
