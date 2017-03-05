/**
 * AbstractAction is used to control the 'client' side behaviour of an element.
 * Extend this class and add it into the same folder as element.js,
 * and call it element.client.js - the loader will recognize that this
 * element has a dedicated script and will include it into the element class tree.
 * If an Action class was found, it will be assigned to the element class as .Action;
 * You can extend this class by using require('periodiq').Elements.Abstract.Action
 *
 * Note that this will NOT be automatically extended and needs to be extended for every Element.
 * If you really want to directly reference another element's action, you can overwrite
 * your Element.Action - but that is not recommended. */
 class AbstractAction {

    /**
     * Will be called for each found DOM node for this element,
     * so the element parameter is NOT an periodiq Element class object,
     * @param {DomNode} element element dom node, queried by id. */
    constructor(element) {
        /** This Element's DOM Node */
        this.element = element;
        /** The remote object to access the main thread */
        this.remote = require('electron').remote;
        /** The Periodiq object */
        this.pq = this.remote.require(__dirname + '/../../loader.js');
        /** EventController reference */
        this.eventController = this.pq.EventController;
    }

    getElementID() {
        return this.element.id;
    }

    hasClass(className) {
        return (' ' + this.element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }

    addClass(className) {
        if (this.hasClass(className) === false) this.element.className += (' ' + className);
        return this;
    }

    removeClass(className) {
        this.element.className = this.element.className.replace(className, '').trim();
        return this;
    }
}

 module.exports = AbstractAction;
