const fs = require('fs');
const Path = require('path');
const Debug = require('./debug.js');

const ROOT_DIR = Path.join(__dirname + '/');
const STATIC_DIR = ROOT_DIR + '/static';
const ELEMENT_DIR = ROOT_DIR + '/elements';
const CACHE_DIR = ROOT_DIR + '/cache';

/**
 * Framework Entry Point;
 * loads entire inhertance tree and creates the namespace.
 * require('periodiq') returns this namespace object.
 * @namespace Periodiq */
var namespace = {
    Element: {},
    ROOT_DIR: ROOT_DIR,
    STATIC_DIR: STATIC_DIR,
    ELEMENT_DIR: ELEMENT_DIR,
    CACHE_DIR: CACHE_DIR };

/**
 * Reference to the Debug 'singleton'
 * @memberof Periodiq */
namespace.Debug = require(ROOT_DIR + '/debug.js');
/**
 * Reference to the Core 'singleton'
 * @memberof Periodiq */
namespace.Core = require(STATIC_DIR + '/core.js');
/**
 * Reference to the Render 'singleton'
 * @memberof Periodiq */
namespace.Render = require(STATIC_DIR + '/render.js');
/**
 * Reference to the EventController 'singleton'
 * @memberof Periodiq */
namespace.EventController = require(STATIC_DIR + '/event.js');

module.export = namespace;

/**
 * Looks recursively for any element classes in a given root directory,
 * and then returns an array with all found modules, already loaded.
 * Element classes are recognized in any folder that contains an element.js file.
 *
 * The element keys (aka class names) will be named after the location
 * where they have been found in. example:
 *      /rootDir/home/menu/top/button -> HomeMenuTopButton
 *
 * You can further customize the generated names by using the pre- and postfix
 * parameters. This can be used to prepend your namespace, for example.
 * @memberof Periodiq
 * @function loadElementDir
 * @param {string} rootDir The directory to be searched for element classes.
 * @param {string} prefix optional prefix for all class names that will be returned [prefix]ClassName
 * @param {string} postfix optional postfix for all class names that will be returned ClassName[postfix]
 * @returns {object} - An object containing all loaded element classes.
 **/
namespace.loadElementDir = function(rootDir, prefix, postfix) {
    if (rootDir == ELEMENT_DIR)
        Debug.log('loading built-in standard elements', 0);
    else
        Debug.log('loading external element set from ' + rootDir, 0);

    /* Returns found element modules according to folder structure,
     * for example 'content', 'content/image' or 'root' */
    var walk = function(dir) {
        var elements = [];
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
            var prefix = prefix || '',
                postfix = postfix || '';
            var buildClassName = function() {
                var trim = path.replace(rootDir, '').replace('/element.js', '').slice(1);
                var keys = trim.split('/'), key = '';
                keys.forEach((k) => { key += k.charAt(0).toUpperCase() + k.slice(1); });
                return prefix + key + postfix; };
            try {
                var key = '';
                var __class = require(path);

                /* Retrieve possible class name override */
                if (__class.__CLASS_NAME_OVERRIDE !== undefined) {
                    key = __class.__CLASS_NAME_OVERRIDE;
                } else {
                    key = buildClassName();
                }

                __class.__BASE_DIR = Path.normalize(path.replace('element.js', ''));
                __class.__CLASS_NAME = key;

                /* Try to find element action */
                try {
                    var actionPath = path.replace('.js', '.action.js');
                    var action = require(actionPath);
                    action.__PATH = Path.normalize(actionPath);
                    __class.Action = action;
                    Debug.success(key + '.Action: found.', 3);
                } catch(err) {
                    __class.Action = null;
                    Debug.fail(key + '.Action: fail, reason: ' + err, 3);
                }

                loaded[key] = __class;

                Debug.success('loaded element ' + key +
                    ' (...' + path.slice(path.length - 24) + ')', 1);
            } catch(err) {
                Debug.warn('could not load module <' + key + '>, ' + err, 0);
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

/**
 * Object containing all default/standard Element Classes
 * @memberof Periodiq */
namespace.Element = namespace.loadElementDir(ELEMENT_DIR);

module.exports = namespace;
