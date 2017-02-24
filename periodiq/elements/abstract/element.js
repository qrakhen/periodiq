const List = require('sygtools').List;
const Debug = require('../../debug.js');

/**
 * The very basic and lowest element inheritance class.
 * All elements must at some point derive from this class in order to even remotely work.
 * */
class AbstractElement {
    constructor() {
        this.TYPE = this.getType();     /** contains the auto-generated class name string (or __CLASS_NAME_OVERRIDE if overridden) */
        this.ACTION = this.getAction(); /** assigned Action class, null if no element.action.js is located in element folder */
        this.NAMESPACE = this.getNamespace() /** */
        this.FINAL = false;             /** FINAL elements won't enter recursion mode and can't have children */
        this.id = null;                 /** unique element id, recursively displays element tree (i.e. root_4_2_65) */
        this.active = false;            /** en-/disables element for rendering/logic */
        this.blockAction = false;       /** en-/disables action execution for this instance */
        this.parent = null;             /** parent element reference */
        this.children = new List();     /** dynamically added child elements */
    }

    getType() {
        return this.constructor.__CLASS_NAME;
    }

    getAction() {
        return this.constructor.__ACTION;
    }

    getNamespace() {
        return this.constructor.__NAMESPACE;
    }

    /**
     * Returns the default periodiq CSS class for this element.
     * If you really want to, you can override this method to return a custom class,
     * which is not recommended, tho - use element.addClass() instead to _add_ your own css class. */
    getCssClass() {
        return this.NAMESPACE + '_' + this.TYPE;
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
        } else if (this.TYPE === 'Abstract') {
            Debug.log('tried to attach abstract element to ' + parent.id + ': forbidden.', 1);
        } else {
            if (this.parent !== null) this.detach();
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
        if (this.parent !== null) this.parent.children.remove(this);
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
