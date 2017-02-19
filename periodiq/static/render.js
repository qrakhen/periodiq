const fs = require('fs');
const path = require('path');
const Debug = require('../debug.js');
const THEME_DEFAULT = require('../themes/empty/theme.js');
const CACHE_DIR = path.join(__dirname + '/../cache/');

var Render = function() {
    this.theme = THEME_DEFAULT;

    this.buildView = function(headerRoot, bodyRoot, done) {
        if (!bodyRoot.active) {
            throw new Exception();
            Debug.log('can not render inactive element ' + bodyRoot.toString());
            return; }

        if (this.theme !== null)
            Debug.log('render currently has an active theme set (' + this.theme.key + ')\r\n'
                + 'This theme will be applied to ALL elements during recursion, '
                + 'overiding all previous identical css keys in element.body.style.\r\n'
                + 'If this is not in your favor, use Render.setTheme(null)', 0);

        Debug.log('rendering view from ' + bodyRoot.toString(), 1);
        /* @todo: Check cache first */
        var _dbgTime = new Date().getTime();
        var body = this.createHtmlElement(null, this.buildElement(bodyRoot), 'body'),
            head = this.createHtmlElement(null, this.buildElement(headerRoot), 'head'),
            html = this.createHtmlElement(null, head + body, 'html');
        this.dispatch(html, bodyRoot.id, done);
        Debug.log('view rendered, took ' + (new Date().getTime() - _dbgTime) + 'ms', 1);
    };

    this.dispatch = function(content, rootId, done) {
        var filePath = this.getViewFilePath(rootId);
        fs.writeFile(filePath, content, (err) => {
            if (err) return Debug.log('could not write view to file ' + filePath + ': ' + err, 0);
            Debug.log('dispatched view file to ' + filePath, 1);
            if (done !== undefined) done(filePath);
        });
    };

    /***
     * Please note that this only gets executed once when starting the application,
     * use nodemon for indev styling.
     **/
    this.buildStyles = function(elementClasses, filePath) {
        Debug.log('compiling element styles...', 1);
        var content = '';
        fs.unlink(filePath, function() {
            for (var i in elementClasses) {
                var el = elementClasses[i];
                if (el.__BASE_DIR === undefined) return;
                var assumed = el.__BASE_DIR() + 'element.css';
                fs.readFile(assumed, 'utf8', function(err, data) {
                    if (err) return Debug.log('could not read ' + assumed + ': ' + err, 0);
                    fs.appendFile(filePath, data, (err) => {
                        if (err) return Debug.log('could not write view to file ' + filePath + ': ' + err, 0);
                    });
                });
            }
        });
    };

    /***
     * Generates an element's html and (optionally) recursively walks through all children */
    this.buildElement = function(element, recursive, count) {
        if (element === undefined || element === null)
            return '';

        var count = count + 1 || 0,
            recursive = recursive || true,
            content = '';

        Debug.log('building element ' + element.toString() + ' count: ' + count, 2);

        /* Walk through all children, if available, and build them */
        if (recursive && element.FINAL == false) {
            element.children.step(function(e) {
                content += this.buildElement(e, true, count);
            }.bind(this));
        } else if (element.content !== undefined) {
            content = element.content;
        }

        /* Apply Theme */
        if (this.theme !== null)
            this.theme.apply(element);

        /* Compose HTML Element */
        var attr = {
            eid: element.id,
            class: element.body.styleRules.data.join(' '),
            type: element.TYPE,
            style: this.buildStyleString(element) };
        if (element.body.attributes !== undefined) {
            for(var a in element.body.attributes)
                attr[a] = element.body.attributes[a];
        }
        var html = this.createHtmlElement(attr, content, element.body.type);
        return html;
    };

    this.buildStyleString = function(element) {
        if (!element.active)
            return 'display: none;';

        if (element.body === undefined)
            return '';

        var style = '';
        for (var i in element.body.style) {
            style += ' ' + i.replace('_', '-') + ': ' + element.body.style[i] + ';';
        }
        return style.trim();
    };

    this.createHtmlElement = function(attributes, content, type) {
        var type = type || 'div',
            html = '<' + type;
        for (var i in attributes) {
            html += ' ' + i + '="' + attributes[i] + '"';
        }
        html += '>\r\n' + content + '</' + type + '>\r\n';
        return html;
    };

    this.setTheme = function(theme) {
        Debug.log('changed active theme to ' + theme.key);
        this.theme = theme;
    };

    this.getViewFilePath = function(rootId) {
        return CACHE_DIR + 'view/' + 'view_' + rootId + '.html';
    };
};

module.exports = new Render();
