const AbstractComposite = require('../element.js');
const Element = require('../../element/element.js');
const ContentText = require('../../content/text/element.js');

class BasicDropdown extends AbstractComposite {
    constructor(title) {
        super();
        this.nodes = {
            container: new Element().addClass('container')
        };
        this.append(new ContentText(title));
    }

    addMenuEntry(text) {
        var element = new Element().append(new ContentText(text));
        this.addMenuEntryElement(element);
        return this;
    }

    addMenuEntryElement(element) {
        element.addClass(['item', 'item-' + this.nodes.container.children.data.length]).attach(this.nodes.container);
        return this;
    }
}

module.exports = BasicDropdown;
