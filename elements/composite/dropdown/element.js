const AbstractComposite = require('../element.js');
const BaseElement = require('../../base/element.js');
const ContentText = require('../../content/text/element.js');

class BasicDropdown extends AbstractComposite {
    constructor(title) {
        super();
        this.body.container = new BaseElement().addClass('container');
        this.append(new ContentText(title));
    }

    attach(parent) {
        super.attach(parent);
        this.body.container.attach(this);
    }

    addMenuEntry(text) {
        var element = new BaseElement().append(new ContentText(text));
        this.addMenuEntryElement(element);
        return this;
    }

    addMenuEntryElement(element) {
        element.addClass(['item', 'item-' + this.children.data.length]).attach(this.body.container);
        return this;
    }
}

module.exports = BasicDropdown;
