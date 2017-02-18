const List = require('sygtools').List;

class AbstractElement {
    constructor(type) {
        this.TYPE = type;
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
     * Attaches this Element to given target element.
     */
    attach(target) {
        target.children.add(this);
        this.parent = target;
        this.id = target.getNextChildID();
        this.enable();
    }

    /**
     * Detaches this Element from current parent element.
     */
    detach() {
        this.parent.remove(this);
        this.parent = null;
        this.id = null;
        this.disable();
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

    throwError(message) {
        Debug.log('error thrown, caused by ' + this.toString() + ', error message:\r\n' + message, 0);
    }

    toString() {
        return '<' + this.TYPE + '[' + this.id + ']>';
    }
}

module.exports = AbstractElement;
