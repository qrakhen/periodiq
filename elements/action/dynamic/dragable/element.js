
/**
* Generic drag and drop element used to implement mouse drag- and dropable content
 * @extends ActionElement */
class BasicDragAndDrop extends require('../element.js') {
    constructor() {
        super();
        this.dropCallback = null;
    }

    /**
     * this function needs to be triggered when another element was dropped into this one, so the assigned callback
     * using .onDrop(function() { ... }); can be fired.
     * @param {Element} element the dropped element */
    dropped(element) {
        if (this.dropCallback !== undefined && this.dropCallback !== null)
            this.dropCallback(element, this);
    }

    /**
     * called when another element was dropped into THIS element, and fires the assigned callback passing (element, sender) parameters.
     * @param {function} callback the callback that will be fired as soon as another element got dropped into this one. */
    onDrop(callback) {
        this.dropCallback = callback;
    }
}

module.exports = BasicDragAndDrop;
