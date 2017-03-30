const Element = require('../../../element/element.js');

class BasicTransformable extends require('../element.js') {
    constructor() {
        super();
        this.body.fixed = {
            top: false,
            right: false,
            bottom: false,
            left: false,
            width: 0,
            height: 0
        };
        this.body.handles = {
            top: new Element(),
            right: new Element(),
            bottom: new Element(),
            left: new Element()
        };
    }

    onResize() {

    }

    onDragDrop() {

    }
}

module.exports = BasicTransformable;
