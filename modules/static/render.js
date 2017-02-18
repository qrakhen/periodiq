const fs = require('fs');
const path = require('path');

var Render = function() {
    this.cacheFolder = path.join(ROOT_DIR + 'cache/view/');

    this.buildView = function(rootElement, done) {
        Debug.log('rendering view from ' + rootElement.toString(), 1);
        /* @todo: Check cache first */
        var _dbgTime = new Date().getTime();
        var body = this.createHtmlElement(null, this.buildElement(rootElement), 'body'),
            head = this.createHtmlElement(null, this.buildHead(), 'head'),
            html = this.createHtmlElement(null, head + body, 'html');
        this.dispatch(html, rootElement.id, done);
        Debug.log('view rendered, took ' + (new Date().getTime() - _dbgTime) + 'ms', 1);
    };

    this.buildHead = function() {
        return '<title>PeriodiQ</title>';
    };

    this.dispatch = function(content, rootId, done) {
        var filePath = this.getViewFilePath(rootId);
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                Debug.log('could not write view to file ' + filePath + '!', 0);
                throw err;
            }
            Debug.log('dispatched view file to ' + filePath, 1);
            done(filePath);
        });
    };

    this.buildElement = function(element, recursive, count) {
        var count = count+1 || 0,
            recursive = recursive || true,
            content = '';

        Debug.log('building element ' + element.toString() + ' count: ' + count, 2);

        if (recursive && element.FINAL == false) {
            element.children.step(function(e) {
                content += this.buildElement(e, true, count);
            }.bind(this));
        } else if (element.content !== undefined) {
            content = element.content;
        } else {
            // something
        }

        var html = this.createHtmlElement({
                id: element.id,
                class: element.CLASS,
                type: element.TYPE,
                style: this.buildStyleString(element) },
            content, element.body.type);

        Debug.log('finished element ' + element.toString() + ': ' + html, 2);
        return html;
    };

    this.buildStyleString = function(element) {
        if (!element.active)
            return 'display: none;';

        if (element.body === undefined)
            return '';

        var style = '';
        for (var i in element.body.style) {
            style += ' ' + i + ': ' + element.body.style[i] + ';';
        }

        var size = element.body.size;
        style += ' min-width:' + size.width + 'px;';
        style += ' min-height:' + size.height + 'px;';
        style += ' width:' + (size.grow === true ? 'auto' : size.width + 'px') + ';';
        style += ' height:' + (size.grow === true ? 'auto' : size.height + 'px') + ';';

        var brim = '';
        for (var i in element.body.brim) {
            if (element.body.brim[i] > 0 || brim.length > 0)
                brim += ' ' + element.body.brim[i] + 'px';
        }
        if (brim.length > 0) style += ' margin:' + brim + ';';
        return style.trim();
    };

    this.buildDataAttributes = function(element) {

    };

    this.createHtmlElement = function(attributes, content, type) {
        var type = type || 'div',
            html = '<' + type;
        for (var i in attributes) {
            html += ' ' + i + '="' + attributes[i] + '"';
        }
        html += '>' + content + '</' + type + '>';
        return html;
    };

    this.getViewFilePath = function(rootId) {
        return this.cacheFolder + 'view_' + rootId + '.html';
    };
};

module.exports = new Render();
