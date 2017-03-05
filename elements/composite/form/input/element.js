const ContentText = require('../../../content/text/element.js');

class BaseInputField extends require('../../element.js') {
    constructor(param, placeholder) {
        super();
        this.body.type = 'input';
        this.formParameter = param || '';
        this.form = null;
        this.nodes = {
            placeholder: new ContentText(placeholder).addClass('placeholder')
        };
    }
}

module.exports = BaseInputField;
