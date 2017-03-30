const fs = require('fs');
const Path = require('path');
const Debug = require('../debug.js');
const CACHE_DIR = Path.join(__dirname + '/../cache/');

/**
 * @class Render */
Render = function() {
    this.theme = null; //move to config
    this.__count = 0;
    this.__indent = 0;

    /**
     * Renders an entire element tree, starting from the provided bodyRoot,
     * stores the result in a cached html file (or uses the cached one),
     * and when done, the provided callback will be triggered, containing the
     * path to the html file.
     * @todo Implement Events for manipulation callbacks
     * @memberof Render
     * @function buildView
     * @instance
     * @param {RootElement} bodyRoot the root of the page to be rendered (i.e. Core.root)
     * @param {function} done success callback, returns the filename of the generated/cached html output */
    this.buildView = function(rootElement, done) {
        this.__count = 0;
        rootElement.enable();

        Debug.log('rendering view from root ' + rootElement.toString(), 1);
        /* @todo: Check cache first */
        var includes = (this.__buildCssIncludeTags(rootElement) + this.__buildJsIncludeTags(rootElement)),
            body = this.__createHtmlElement(null, this.buildElement(rootElement), 'body'),
            head = this.__createHtmlElement(null, includes, 'head'),
            html = this.__createHtmlElement({style: 'overflow: hidden;'}, head + body, 'html');
        /* afterView(html) */
        Debug.log(this.__count + ' elements rendered', 1);
        this.__dispatch(html, rootElement.rootId, done);
    };

    this.__dispatch = function(content, rootId, done) {
        var filePath = this.__getViewFilePath(rootId);
        fs.writeFile(filePath, content, (err) => {
            if (err) return Debug.log('could not write view to file ' + filePath + ': ' + err, 0);
            Debug.log('dispatched view file to ' + filePath, 1);
            if (done !== undefined) done(filePath);
        });
    };

    /**
     * Generates an element's html and (optionally) recursively walks through all children.
     * This is most commonly used if you update an element and want to render the changes.
     * @memberof Render
     * @function buildElement
     * @instance
     * @param {Element} element element to be rendered
     * @param {boolean} recursive true = recurse through children, false = limit to this element */
    this.buildElement = function(element, recursive, __count) {
        if (element === undefined || element === null)
            return '';

        if (element.body === undefined || element.body === null) {
            Debug.log('tried to render bodyless element, skipped: ' + element, 1);
            return ''
        }

        var count = count || 0,
            recursive = recursive || true,
            content = '';

        this.__count = (__count === true ? this.__count + 1 : 0);
        if (__count === false) this.__indent = 0;

        Debug.log('building element ' + element.toString() + ' count: ' + this.__count, 2);

        /* Walk through all children, if available, and build them */
        if (recursive && element.children.data.length > 0) {
            this.__indent++;
            element.children.step(function(e) {
                /** @todo beforeChild(e); */
                var childHtml = this.buildElement(e, true, true);
                /** @todo afterChild(childHtml) */
                content += childHtml;
            }.bind(this));
            this.__indent--;
        } else if (element.content !== undefined) {
            this.__indent++;
            content = this.__getIndent() + element.content;
            this.__indent--;
        }

        /* return untouched element if it's the head anchor */
        if (element.body.type === 'head')
            return this.__createHtmlElement({}, content, element.body.type);

        /** @todo beforeElement(element) */

        /* Compose HTML Element */
        var attr = {
            id: element.getId(),
            class: (element.getFullClass() + ' ' + element.body.class.data.join(' ')).trim(),
            type: element.TYPE,
            style: this.__buildStyleString(element) };
        if (element.body.attributes !== undefined) {
            for(var a in element.body.attributes)
                attr[a] = element.body.attributes[a];
        }

        var html = this.__createHtmlElement(attr, content, element.body.type);

        /** @todo afterElement(html) */
        if (element.ACTION !== null && element.ACTION !== undefined) {
            if (!element.blockAction) html += this.__getIndent() + this.__buildActionScriptTag(element);
            else Debug.log('skipping action script tag for ' + element.getId() + ' due to blockAction', 3);
        }
        return html;
    };

    this.__buildCssIncludeTags = function(rootElement) {
        var html = '';
        rootElement.__cssIncludes.forEach(function(href) {
            html += '<link rel="stylesheet" href="' + href + '">';
        });
        return html;
    }

    this.__buildJsIncludeTags = function(rootElement) {
        var html = '';
        rootElement.__jsIncludes.forEach(function(src) {
            html += '<script src="' + src + '"></script>';
        });
        return html;
    }

    /**
     * @private */
    this.__buildActionScriptTag = function(element) {
        /* Fix for Windows systems where the path would be completely escaped,
         * resulting in C:UsersDaveprojectsperiodiqblablabal */
        var path = element.ACTION.__PATH.replace(/\\/g, '/');
        var script = 'var a=require("' + path + '");' +
            'new a(document.getElementById("' + element.getId() + '"));'
        return '<script>' + script + '</script>';
    };

    /**
     * @private */
    this.__buildStyleString = function(element) {
        if (element.visible === false)
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
    this.__createHtmlElement = function(attributes, content, type) {
        var type = type || 'el',
            html = '<' + type,
            indent = this.__getIndent();
        for (var i in attributes) html += ' ' + i + '="' + attributes[i] + '"';
        html += '>' + (content.length > 0 ? ('\r\n' + content + '\r\n' + indent) : '') + '</' + type + '>\r\n';
        return indent + html;
    };

    /**
     * @private */
    this.__getIndent = function() {
        var indent = '';
        for (var i = 0; i < this.__indent; i++) indent += '    ';
        return indent;
    };

    /**
     * @memberof Render
     * @function setTheme
     * @instance */
    this.setTheme = function(theme) {
        this.theme = theme;
    };

    /**
     * @memberof Render
     * @function __getViewFilePath
     * @instance */
    this.__getViewFilePath = function(rootId) {
        return CACHE_DIR + 'view/' + 'view_' + rootId + '.html';
    };
};

module.exports = new Render();
