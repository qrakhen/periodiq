const Debug = require('../debug.js');

class EventController {
    trigger(eventName, senderId, data) {
        Debug.log(eventName + ' from ' + senderId + ' with data ' + data);
    }
}

module.exports = new EventController();
