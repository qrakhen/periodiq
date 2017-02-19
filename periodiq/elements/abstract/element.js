const List = require('sygtools').List;
const Debug = require('../../debug.js');
const __TYPE = 'pq-el';

class AbstractElement {
    constructor() {
        this.TYPE = __TYPE;
        this.FINAL = false;
        this.id = null;
        this.parent = null;
        this.active = false;
        this.children = new List();
    }

    enable() {
        this.active = true;
    }

    disable() {
        this.active = false;
    }

    /**
     * Attaches this Element to given parent element.
     */
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
     */
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
     */
    detach() {
        this.parent.remove(this);
        this.parent = null;
        this.id = null;
        this.disable();
        return this;
    }

    /**
     * Returns the next free child element id.
     */
    getNextChildID() {
        var n = 0;
        while (this.children.findOne('id', this.id + '_' + n) !== null) n++;
        return this.id + '_' + n;
    }

    /**
     * Returns the absolute position in relation to the root element.
     */
    getAbsolutePosition() {
        var rec = (this.body === undefined || this.parent === null ?
                { x: 0, y: 0 } : this.parent.getAbsolutePosition()),
            pos = (this.body === undefined || this.body === null ?
                { x: 0, y: 0 } : {
                    x: this.body.brim[2] + this.body.pos.x,
                    y: this.body.brim[3] + this.body.pos.y });
        return { x: rec.x + pos.x, y: rec.y + pos.y };
    }

    getElementDirectory() {
        return __dirname;
    }

    getClasses() {
        return this.TYPE.replace(/_/g, ' ');
    }

    getExtendedType(type) {
        if (type === undefined) return this.TYPE;
        return this.TYPE + '_' + type;
    }

    throwError(message) {
        Debug.log('error thrown, caused by ' + this.toString() + ', error message:\r\n' + message, 0);
    }

    toString() {
        return '<' + this.TYPE + '[' + this.id + ']>';
    }
}

module.exports = AbstractElement;
