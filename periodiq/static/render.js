const fs = require('fs');
const Path = require('path');
const Debug = require('../debug.js');
const THEME_DEFAULT = require('../themes/empty/theme.js');
const CACHE_DIR = Path.join(__dirname + '/../cache/');
//todo use require for DIR and stuff

/**
 * @class Render */
var Render = function() {
    this.theme = THEME_DEFAULT; //move to config

    /**
     * Renders an entire element tree, starting from the provided bodyRoot,
     * stores the result in a cached html file (or uses the cached one),
     * and when done, the provided callback will be triggered, containing the
     * path to the html file.
     * @todo Implement Events for manipulation callbacks
     * @memberof Render
     * @function buildView
     * @instance
     * @param {Element} header the header element - can be set to null for an empty header
     * @param {RootElement} bodyRoot the root of the page to be rendered (i.e. Core.root)
     * @param {function} done success callback, returns the filename of the generated/cached html output */
    this.buildView = function(header, bodyRoot, done) {
        if (!bodyRoot.active) {
            throw new Exception();
            Debug.log('can not render inactive element ' + bodyRoot.toString());
            return; }

        if (header == null)
            header = this.createHtmlElement(null, null, 'head');

            // TEMP! make this beatiful pls. //
        var clientScript = '<script src="' + Path.join(__dirname + '/client.js') + '"></script>';

        if (this.theme !== null)
            Debug.log('render currently has an active theme set (' + this.theme.key + ')\r\n'
                + 'This theme will be applied to ALL elements during recursion, '
                + 'overiding all previous identical css keys in element.body.style.\r\n'
                + 'If this is not in your favor, use Render.setTheme(null)', 0);

        Debug.log('rendering view from ' + bodyRoot.toString(), 1);
        /* @todo: Check cache first */
        var _dbgTime = new Date().getTime();
        var body = this.createHtmlElement(null, this.buildElement(bodyRoot), 'body'),
            head = this.buildElement(header) + clientScript,
            html = this.createHtmlElement({style: 'overflow: hidden;'}, head + body, 'html');
        /* afterView(html) */
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

    /**
     * Please note that this only gets executed once when starting the application,
     * use nodemon for indev styling.
     * @memberof Render
     * @function buildStyles
     * @deprecated made and never used. c:
     * @instance */
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

    /**
     * Generates an element's html and (optionally) recursively walks through all children.
     * This is most commonly used if you update an element and want to render the changes.
     * @memberof Render
     * @function buildStyles
     * @instance
     * @param {Element} element element to be rendered
     * @param {boolean} recursive true = recurse through children, false = limit to this element */
    this.buildElement = function(element, recursive, count) {
        if (element === undefined || element === null)
            return '';

        if (element.__CLASS_NAME === 'Abstract') {
            Debug.log('tried to render AbstractElement, skipped ' + element.id, 0);
            return ''
        }

        var count = count + 1 || 0,
            recursive = recursive || true,
            content = '';

        Debug.log('building element ' + element.toString() + ' count: ' + count, 2);

        /* Walk through all children, if available, and build them */
        if (recursive && element.children.data.length > 0) {
            element.children.step(function(e) {
                /* beforeChild(e); */
                var childHtml = this.buildElement(e, true, count);
                /* afterChild(childHtml) */
                content += childHtml;
            }.bind(this));
        } else if (element.content !== undefined) {
            content = element.content;
        }

        /* return untouched element if it's the head anchor */
        if (element.body.type === 'head')
            return this.createHtmlElement({}, content, element.body.type);

        /* beforeElement(element) */

        /* Apply Theme */
        if (this.theme !== null)
            this.theme.apply(element);

        /* afterElementTheme(element) */

        /* Compose HTML Element */
        var attr = {
            id: element.id,
            class: element.body.styleRules.data.join(' '),
            type: element.getType(),
            style: this.buildStyleString(element) };
        if (element.body.attributes !== undefined) {
            for(var a in element.body.attributes)
                attr[a] = element.body.attributes[a];
        }
        var html = this.createHtmlElement(attr, content, element.body.type);
        /* afterElement(html) */
        if (element.ACTION !== null && element.ACTION !== undefined) {
            html += this.buildActionScriptTag(element);
        }
        return html;
    };

    this.buildActionScriptTag = function(element) {
        var script = 'var a=require("' + element.ACTION.__PATH + '");' +
            'new a(document.getElementById("' + element.id + '"));'
        return '<script>' + script + '</script>';
    };

    /**
     * @private */
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

    /**
     * @private */
    this.createHtmlElement = function(attributes, content, type) {
        var type = type || 'div',
            html = '<' + type;
        for (var i in attributes) {
            html += ' ' + i + '="' + attributes[i] + '"';
        }
        html += '>\r\n' + content + '</' + type + '>\r\n';
        return html;
    };

    /**
     * @memberof Render
     * @function setTheme
     * @instance */
    this.setTheme = function(theme) {
        Debug.log('changed active theme to ' + theme.key);
        this.theme = theme;
    };

    /**
     * @memberof Render
     * @function getViewFilePath
     * @instance */
    this.getViewFilePath = function(rootId) {
        return CACHE_DIR + 'view/' + 'view_' + rootId + '.html';
    };
};

module.exports = new Render();
