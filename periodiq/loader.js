const fs = require('fs');
const Path = require('path');
const Debug = require('./debug.js');
const Assembler = require('./static/assembler');

const NAMESPACE = 'pq';
const ROOT_DIR = Path.join(__dirname + '/');
const STATIC_DIR = ROOT_DIR + '/static';
const ELEMENT_DIR = ROOT_DIR + '/elements';
const CACHE_DIR = ROOT_DIR + '/cache';

const ARG_INDEV = (process.argv.indexOf('--indev') > -1);
const ARG_BUILD = (process.argv.indexOf('--build') > -1);

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
 * The provided root directory should contain a set.json file that describes
 * that set of elements. The 'prefix' stored in there key will be used to prefix
 * all element's main css classes and to build the css file from all elements.
 * If your element directory does not contain an set.json file, NO prefix
 * will be taken - which might result in an obfuscated namespace.
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
 * @param {boolean} compileCss if true, all included CSS files will be compiled into the build folder. default is set by the start parameter --indev and --build
 * @returns {object} - An object containing all loaded element classes.
 **/
namespace.loadElementDir = function(rootDir, prefix, postfix, compileCss) {
    if (rootDir == ELEMENT_DIR)
        Debug.log('loading built-in standard elements', 0);
    else
        Debug.log('loading external element set from ' + rootDir, 0);

    var elementSet = {};
    try {
        elementSet = JSON.parse(fs.readFileSync(rootDir + '/set.json').toString());
        Debug.success('element set.json found: <' + elementSet.title + '>');
    } catch(err) {
        Debug.error('error while trying to parse set.json: ' + err, 0);
        elementSet.prefix = 'noset';
    }

    /* Returns found element modules according to folder structure,
     * for example 'content', 'content/image' or 'root' */
    var walk = function(dir) {
        var elements = [];
        var list = fs.readdirSync(dir);
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
            try {
                var __class = require(path);
                var __name = new __class().constructor.name;

                __name = (prefix + __name + postfix).trim();

                __class.__BASE_DIR = Path.normalize(path.replace('element.js', ''));
                __class.__CLASS_NAME = __name;
                __class.__NAMESPACE = elementSet.namespace;

                /* Try to find element action */
                var actionPath = path.replace('.js', '.action.js');
                if (fs.existsSync(actionPath)) {
                    try {
                        var action = require(actionPath);
                        action.__PATH = Path.normalize(actionPath);
                        __class.__ACTION = action;
                        Debug.success(__name + '.ACTION loaded.', 3);
                    } catch(err) {
                        __class.Action = null;
                        Debug.fail(__name + '.ACTION found but loaded, reason: ' + err, 3);
                    }
                }

                loaded[__name] = __class;

                Debug.success('loaded element ' + __name +
                    ' (...' + path.slice(path.length - 24) + ')', 1);
            } catch(err) {
                Debug.warn('could not load module <' + __name + '>, ' + err, 0);
            }
        });

        if ((ARG_INDEV === true) || (ARG_BUILD === true)) {
            Debug.log('starting build', 0);
            Assembler.buildElementStyles(loaded, elementSet.namespace);
        }
        return loaded;
    };
    var loaded = loadElements(walk(rootDir));
    Debug.log('loaded a total of ' + Object.keys(loaded).length + ' elements', 0);
    return loaded;
}

/**
 * Object containing all default/standard Element Classes
 * @memberof Periodiq */
namespace.Element = namespace.loadElementDir(ELEMENT_DIR, NAMESPACE);


module.exports = namespace;
