const AbstractElement = require('../abstract/element.js');
const __TYPE = 'base';

class BaseElement extends AbstractElement {
    constructor() {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.body = {
            type: 'div',
            pos: {
                x: 0,
                y: 0 },
            size: {
                width: 0,
                height: 0,
                grow: true },
            brim: [0, 0, 0, 0],
            style: {
                display: 'block'
            }};
    }

    setStyle(key, value) {
        this.body.style[key] = value;
        return this;
    }

    forgetStyle(key) {
        this.body.style[key] = null;
        return this;
    }

    /**
     * values = array, if only 1 value, all sides are set,
     * 2 values will be interpreted as vertical and horizontal,
     * and 4 values will be treated in the order right, bottom, left & top.
     */
    setBrim(values) {
        if (values.length == 1)
            this.body.brim = [values[0], values[0], values[0], values[0]];
        else if (values.length == 2)
            this.body.brim = [values[1], values[0], values[1], values[0]];
        else if (values.length == 4)
            this.body.brim = values;
        else
            super.throwError('wrong amount of values provided for setBrim!');
        return this;
    }

    setSize(width, height, grow) {
        this.body.size = {
            width: width || 0,
            height: height || 0,
            grow: grow || false
        };
        return this;
    }

    getFullType(type) {
        type = type || '';
        return super.getFullType(this.TYPE + ' ' + type);
    }
}

module.exports = BaseElement;
