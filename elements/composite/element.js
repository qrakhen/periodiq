
/**
 * A Composite is an element that has programmatically inserted children that will be attached as soon as
 * the composite is attached to something else. All compositeChildren will also be detached if the composite is detached.
 * @extends AbstractComposite */
class AbstractComposite extends require('../base/element.js') {
    constructor() {
        super();
    }
}

module.exports = AbstractComposite;
