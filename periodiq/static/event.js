const Debug = require('../debug.js');
const List = require('sygtools').List;

/**
 * EventController
 * Used to communicate between render and main thread.
 * Trigger events from the render thread by using 'this.event.trigger()'
 * in an Action class (for more information check the AbstractAction documentation)
 * Assign listeners to events by using 'EventController.addListener()' */
class EventController {
    constructor() {
        this.listeners = {};
    }

    addListener(eventName, callback) {
        if (this.listeners[eventName] === undefined)
            this.listeners[eventName] = new List();
        this.listeners[eventName].add(callback);
        Debug.log('event listener added: ' + eventName, 3);
    }

    trigger(eventName, senderId, data) {
        Debug.log(eventName + ' from ' + senderId + ' with data ' + data, 3);
        if (this.listeners[eventName] === undefined) {
            Debug.warn('event ' + eventName + ' triggered, but no listeners found.');
            return;
        }

        this.listeners[eventName].step(function(callback) {
            try {
                callback(eventName, senderId, data);
            } catch(error) {
                Debug.error('error when trying to trigger event callback: ' + error);
                this.listeners[eventName].remove(callback);
            }
        }.bind(this));
    }
}

module.exports = new EventController();
