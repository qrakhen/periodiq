const Path = require('path');

/**
 * Generic Root Element
 * Keep in mind that you are allowed to create several root elements (to store different views, for example). */
class RootElement extends require('../base/element.js') {
    constructor(rootId, includeDefaults) {
        super();
        includeDefaults = includeDefaults || true;
        this.rootId = rootId || 'root';
        this.body.type = 'root';

        this.__cssIncludes = [];
        this.__jsIncludes = [];

        if (includeDefaults) {
            this.includeCssFile(Path.join(__dirname + '/../../build/styles/elements.pq.css'));
            this.includeJsFile(Path.join(__dirname + '/../../static/client.js'));
        }
    }

    /**
     * A RootElement can not be attached to any other element, so the function is overwritten and returned */
    attach() {
        return;
    }

    includeCssFile(url) {
        this.__cssIncludes.push(url);
    }

    includeJsFile(url) {
        this.__jsIncludes.push(url);
    }
}

module.exports = RootElement;
