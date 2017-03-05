const List = require('sygtools').List;
const Debug = require('../../debug.js');

/**
 * The very basic and lowest element inheritance class.
 * All elements must at some point derive from this class in order to even remotely work.
 * This class contains all basic element logic functions like attach(), getId(), ...
 * Do not directly create element instances/objects of this class. That's what abstract means. */
class AbstractElement {
    constructor() {
        /** Class Name */
        this.TYPE = this.constructor.__CLASS_NAME;
        /** Action Class */
        this.ACTION = this.constructor.__ACTION;
        /** Namespace as provided by set.json */
        this.NAMESPACE = this.constructor.__NAMESPACE;
        /** FINAL elements won't enter recursion mode and can't have children */
        this.FINAL = false;
        /** inactive elements won't be rendered or taken into account for recursive functions */
        this.active = false;
        /** indicates visibility within the DOM */
        this.visible = false;
        /** en-/disables action execution for this instance */
        this.blockAction = false;
        /** parent element reference */
        this.parent = null;
        /** dynamical list of child elements */
        this.children = new List();

        /** @private Index of this element in its parent's children */
        this.__childIndex = null;
    }

    /**
     * recursively calculates element id, displays element tree (i.e. root_4_2_65)
     * this id is unique within this element's rootElement */
    getId() {
        return (this.parent === null ?
            (this.rootId !== undefined ?
                this.rootId : null) : (this.parent.getId() + '_' + this.__childIndex));
    }

    /**
     * Returns the default periodiq CSS class (aka full class) for this element.
     * If you really want to, you can override this method to return a custom class,
     * which is not recommended, tho - use element.addClass() instead to _add_ your own css class. */
    getFullClass() {
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
     * This also recursively steps down to attach all children that have been attached before.
     * IMPORTANT! chaining attach() leads to massive ID bugs when attaching several elements in a single chain.
     * *always* call .attach(); as the _last_ function if you're chaining functions, i.e. element.setColor().setSize().attach();
     * @param {Element} parent The target element to attach onto. */
    attach(parent) {
        if (parent === undefined || parent === null) {
            Debug.fail('can not attach to non-existent parent');
            return false;
        } else if (parent.FINAL) {
            Debug.fail('can not append to a finalized parent: forbidden. ' + parent.toString(), 1);
            return false;
        } else if (this.TYPE === 'Element') {
            Debug.fail('tried to attach abstract element to ' + parent.id + ': forbidden.', 1);
            return false;
        } else if (parent === this) {
            Debug.fail('you just tried to attach an element to itself. can I help you somehow?');
            return false;
        } else {
            if (this.parent !== null) this.detach();
            parent.children.add(this);
            this.parent = parent;
            this.__childIndex = parent.getNextChildIndex();
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
        this.__childIndex = null;
        this.disable();
        return this;
    }

    /**
     * Returns the next free child element id.
     * This is needed when a new child attaches. */
    getNextChildIndex() {
        var n = 0;
        while (this.children.findOne('__childIndex', n) !== null) n++;
        return  n;
    }

    /**
     * Returns this element's root directory using node's <__dirname> global. */
    getElementDirectory() {
        return __dirname;
    }

    /**
     * This _should_ throw an actual Exception, but a Debug.log() is more appealing during development phase. */
    throwError(message) {
        Debug.error('error thrown, caused by ' + this.toString() + ', error message:\r\n' + message, 0);
    }

    /**
     * Returns a string represantion of this Element.
     * If this is not overridden, it will look somewhat like this:
     * <pq-el_base_content[root-4-64]> */
    toString() {
        return '<' + this.TYPE + '[' + this.getId() + ']>' + (this.parent === null && this.rootId === undefined ? ' (detached)' : '');
    }
}

module.exports = AbstractElement;
