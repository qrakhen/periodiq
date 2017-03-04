const BaseElement = require('../../../base/element.js');

class BaseForm extends require('../../element.js') {
    constructor() {
        super();
        this.body.type = 'form';
        this.nodes.inputs = new BaseElement().addClass('inputs');
    }

    addInput(input) {
        input.form = this;
        this.nodes.inputs.append(input);
        return this;
    }
}

module.exports = BaseForm;
