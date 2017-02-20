const List = require('sygtools').List;
const Debug = require('../../debug.js');
const __TYPE = 'pq-el';

/**
 * The very basic and lowest element inheritance class.
 * All elements must at some point derive from this class in order to even remotely work.
 * @namespace StandardElements */
class AbstractElement {
    constructor() {
        this.TYPE = __TYPE;         // displays class type name, recursively built from const __TYPE
        this.FINAL = false;         // FINAL elements won't enter recursion mode and can't have children
        this.id = null;             // unique element id, recursively displays element tree
        this.parent = null;         // parent element reference
        this.active = false;        // en- or disables element (rendering/logic)
        this.children = new List(); // dynamically added child elements
    }

    /**
     * Enables this element.
     * Please keep in mind that this function is usually automatically called
     * as soon as this element is attached to a parent. */
    enable() {
        this.active = true;
    }

    /**
     * Disables this element to keep it from being rendered or exeucting logic.
     * Please keep in mind that this function is usually automatically called
     * as soon as this element is attached to a parent. */
    disable() {
        this.active = false;
    }

    /**
     * Attaches this Element to given parent element.
     * This also activates this element, making it renderable and usable.
     * @param {Element} parent The target element to attach onto. */
    attach(parent) {
        if (parent.FINAL) {
            Debug.log('can not append to a finalized parent: forbidden. ' + parent.toString(), 1);
        } else {
            parent.children.add(this);
            this.parent = parent;
            this.id = parent.getNextChildID();
            this.enable();
            return this;
        }
    }

    /**
     * Attaches a given array of child elements to this element.
     * @param {Array} children The collection of children to append. */
    append(children) {
        if (children === undefined)
            return;

        if (!Array.isArray(children)) children = [children];
        children.forEach(function(e) {
            e.attach(this);
        }.bind(this));
        return this;
    }

    /**
     * Detaches this Element from current parent element.
     * This will also deactivate this element, since it left the element tree
     * and is practically non-existent to the recursion algorythm. */
    detach() {
        this.parent.remove(this);
        this.parent = null;
        this.id = null;
        this.disable();
        return this;
    }

    /**
     * Returns the next free child element id.
     * This is needed when a new child attaches. */
    getNextChildID() {
        var n = 0;
        while (this.children.findOne('id', this.id + '_' + n) !== null) n++;
        return this.id + '_' + n;
    }

    /**
     * Returns the absolute position in relation to the root element.
     * @deprecated DO NOT USE, this worked at some point but broke during refactor */
    getAbsolutePosition() {
        return { x: 0, y: 0 };
    }

    /**
     * Returns this element's root directory using node's <__dirname> global. */
    getElementDirectory() {
        return __dirname;
    }

    /**
     * Basically just joins two strings together. Wow.
     * @param {string} type */
    getExtendedType(type) {
        if (type === undefined) return this.TYPE;
        return this.TYPE + '_' + type;
    }

    /**
     * This _should_ throw an actual Exception, but a Debug.log() is more appealing during development phase. */
    throwError(message) {
        Debug.log('error thrown, caused by ' + this.toString() + ', error message:\r\n' + message, 0);
    }

    /**
     * Returns a string represantion of this Element.
     * If this is not overridden, it will look somewhat like this:
     * <pq-el_base_content[root-4-64]> */
    toString() {
        return '<' + this.TYPE + '[' + this.id + ']>';
    }
}

module.exports = AbstractElement;
