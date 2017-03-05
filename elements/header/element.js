const TagElement = require('../content/tag/element.js');

/* possibly throw out head completely? */

/**
 * @extends Element */
class BasicHeader extends require('../abstract/element.js') {
    constructor(id, title) {
        super();
        this.id = id || 'header';
        this.body = { type: 'head' };
        if (title !== undefined) this.setTitle(title);
    }

    setTitle(title) {
        var tag = new TagElement('title', null, title || 'periodiq.');
        tag.attach(this);
    }

    addScriptLinkTag(src) {
        var tag = new TagElement('script', { src: src, type: 'text/javascript' });
        tag.attach(this);
        return this;
    }

    addStyleLinkTag(href) {
        var tag = new TagElement('link', { href: href, rel: 'stylesheet' });
        tag.attach(this);
        return this;
    }
}

module.exports = BasicHeader;
