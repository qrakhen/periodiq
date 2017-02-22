const BaseElement = require('../../base/element.js');
const ContentTextElement = require('../../content/text/element.js');

class NavigationDropdownElement extends BaseElement {
    constructor(title) {
        super();
        this.body.container = new BaseElement().attach(this).addClass('container');
        this.append(new ContentTextElement(title));
        this.append(this.body.container);
        this.FINAL = true; /** Block all further attachments to this element */
    }

    addMenuEntry(text) {
        var element = new BaseElement().append(new ContentTextElement(text));
        this.addMenuEntryElement(element);
        return this;
    }

    addMenuEntryElement(element) {
        element.attach(this.body.container).addClass(['item', 'item-' + this.children.data.length]);
        return this;
    }
}

module.exports = NavigationDropdownElement;
