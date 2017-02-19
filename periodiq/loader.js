/**
 * Framework Entry Point;
*  loads entire inhertance tree and creates the namespace.
 * @module Periodiq
 **/

const fs = require('fs');
const path = require('path');
const Debug = require('./debug.js');

const ROOT_DIR = path.join(__dirname + '/');
const STATIC_DIR = ROOT_DIR + '/static';
const ELEMENT_DIR = ROOT_DIR + '/elements';
const CACHE_DIR = ROOT_DIR + '/cache';

var namespace = {
    Element: {},
    ROOT_DIR: ROOT_DIR };

/**
 * @module Periodiq
 * @function loadElementDir
 * Looks recursively for element modules in a given root directory,
 * and then returns an array with found modules, already loaded.
 * Element classes are recognized in any folder that contains an element.js file.
 *
 * The element keys (aka class names) will be named after the location
 * where they have been found in. example:
 *      /rootDir/home/menu/top/button -> HomeMenuTopButton
 * @param {string} rootDir The directory to be searched for element classes.
 * @returns {object} - An object containing all loaded element classes.
 **/
namespace.loadElementDir = function(rootDir) {
    if (rootDir == ELEMENT_DIR)
        Debug.log('loading built-in standard elements', 0);
    else
        Debug.log('loading external element set from ' + rootDir, 0);

    /* Returns found element modules according to folder structure,
     * for example 'content', 'content/image' or 'root' */
    var walk = function(dir) {
        var elements = [],
        list = fs.readdirSync(dir);
        list.forEach(function(element) {
            element = dir + '/' + element;
            var stat = fs.statSync(element);
            if (stat && stat.isDirectory())
                elements = elements.concat(walk(element));
            else if (element.endsWith('element.js'))
                elements.push(element);
        });
        return elements;
    };

    /* beautifies all found element modules to camelcase and loads given module */
    var loadElements = function(modulePaths) {
        var loaded = {};
        modulePaths.forEach(function(path) {
            var buildClassName = function() {
                var trim = path.replace(rootDir, '').replace('/element.js', '').slice(1);
                var keys = trim.split('/'), key = '';
                keys.forEach((k) => { key += k.charAt(0).toUpperCase() + k.slice(1); });
                return key; };
            try {
                var key = '';
                var __class = require(path);
                /* Retrieve possible class name override */
                if (__class.__CLASS_NAME !== undefined) {
                    key = __class.__CLASS_NAME;
                } else {
                    key = buildClassName();
                }

                loaded[key] = __class;
                loaded[key].__BASE_DIR = function() { return path.replace('element.js', ''); };
                Debug.log('loaded element ' + key +
                    ' (...' + path.slice(path.length - 24) + ')', 1);
            } catch(err) {
                Debug.log('could not load module <' + key + '>, ' + err, 0);
            }
        });
        return loaded;
    };
    var loaded = loadElements(walk(rootDir));
    Debug.log('loaded a total of ' + Object.keys(loaded).length + ' elements', 0);
    /* compile and dispatch the main style file once for each element import */
    /* Okay let's just _not_ do this, okay? */
    // namespace.Render.buildStyles(loaded, CACHE_DIR + '/styles/main.css');
    return loaded;
}

/* Compose references + base directory functions since we can't really store
 * normal properties within a constructor of a class */
    namespace.Core = require(STATIC_DIR + '/core.js');
    namespace.Core.__BASE_DIR = function() { return STATIC_DIR; };

    namespace.Render = require(STATIC_DIR + '/render.js');
    namespace.Render.__BASE_DIR = function() { return STATIC_DIR; };

    namespace.Element = namespace.loadElementDir(ELEMENT_DIR);
    namespace.Element.__BASE_DIR = function() { return ELEMENT_DIR; };

module.exports = namespace;
