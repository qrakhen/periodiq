const fs = require('fs');
const Path = require('path');
const Debug = require('../debug.js');
const CACHE_DIR = Path.join(__dirname + '/../cache/');

/**
 * @class Render */
var Render = function() {
    this.theme = null; //move to config
    this.__count = 0;

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
    this.buildView = function(bodyRoot, done) {
        this.__count = 0;
        bodyRoot.enable();

        var clientScript = '<script src="' + Path.join(__dirname + '/client.js') + '"></script>';
        var clientCss = '<link rel="stylesheet" href="' + Path.join(__dirname + '/../build/styles/elements.pq.css') + '">';
        var headerElement = this.createHtmlElement(null, clientScript + clientCss, 'head');

        Debug.log('rendering view from root ' + bodyRoot.toString(), 1);
        /* @todo: Check cache first */
        var body = this.createHtmlElement(null, this.buildElement(bodyRoot), 'body'),
            head = headerElement,
            html = this.createHtmlElement({style: 'overflow: hidden;'}, head + body, 'html');
        /* afterView(html) */
        Debug.log(this.__count + ' elements rendered', 1);
        this.__dispatch(html, bodyRoot.rootId, done);
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
     * @function buildStyles
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

        Debug.log('building element ' + element.toString() + ' count: ' + this.__count, 2);

        /* Walk through all children, if available, and build them */
        if (recursive && element.children.data.length > 0) {
            element.children.step(function(e) {
                /** @todo beforeChild(e); */
                var childHtml = this.buildElement(e, true, true);
                /** @todo afterChild(childHtml) */
                content += childHtml;
            }.bind(this));
        } else if (element.content !== undefined) {
            content = element.content;
        }

        /* return untouched element if it's the head anchor */
        if (element.body.type === 'head')
            return this.createHtmlElement({}, content, element.body.type);

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
        var html = this.createHtmlElement(attr, content, element.body.type);

        /** @todo afterElement(html) */
        if (element.ACTION !== null && element.ACTION !== undefined) {
            if (!element.blockAction) html += this.__buildActionScriptTag(element);
            else Debug.log('skipping action script tag for ' + element.getId() + ' due to blockAction', 3);
        }
        return html;
    };

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
        if (!element.visible)
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
