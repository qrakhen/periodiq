const AbstractElement = require('./abstract.js');

class RootElement extends AbstractElement {
    constructor(rootId) {
        super('RootElement');
        this.id = rootId || 0;
    }
}

module.exports = RootElement;
