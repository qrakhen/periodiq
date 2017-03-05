
/**
 * A Composite is an element that has programmatically inserted children that will be attached as soon as
 * the composite is attached to something else. All compositeChildren will also be detached if the composite is detached.
 * @extends AbstractComposite */
class AbstractComposite extends require('../element/element.js') {
    constructor() {
        super();
        this.body.type = 'cmp';
        this.nodes = {};
    }

    attachNodes() {
        for (var node in this.nodes)
            this.nodes[node].attach(this);
    }

    attach(parent) {
        super.attach(parent);
        this.attachNodes();
        return this;
    }
}

module.exports = AbstractComposite;
