/***
 * Loads the PeriodiQ Framework
 **/
const fs = require('fs');
const path = require('path');

global.Debug = require('./debug.js');
global.ROOT_DIR = path.join(__dirname + '/../');

/* allow params to provide an array of custom module directories, too */
const MODULE_DIR = ROOT_DIR + '/modules';
const ELEMENT_DIR = MODULE_DIR + '/elements';

var namespace = {
    Render: require(MODULE_DIR + '/static/render.js'),
    Core: require(MODULE_DIR + '/static/core.js'),
    Element: {}};

/**
 * looks recursively for element modules in a given root directory,
 * and then returns an array with found modules, already loaded */
namespace.loadModules = function(rootDir) {
    Debug.log('looking up element modules...', 1);
    Debug.log('walking into ' + rootDir, 1);
    /* Returns found element modules according to folder structure,
     * for example 'content', 'content/image' or 'root' */
    var walk = function(dir) {
        var items = [],
        list = fs.readdirSync(dir);
        list.forEach(function(item) {
            item = dir + '/' + item;
            var stat = fs.statSync(item);
            if (stat && stat.isDirectory())
                items = items.concat(walk(item));
            else if (item.endsWith('element.js'))
                items.push(item);
        });
        return items;
    };
    /* beautifies all found element modules to camelcase and loads given module */
    var load = function(modulePaths) {
        var loaded = {};
        modulePaths.forEach(function(path) {
            Debug.log('loading module from ...' + path.slice(path.length - 24), 1);
            var trim = path.replace(rootDir, '').replace('/element.js', '').slice(1);
            var keys = trim.split('/');
            var key = '';
            keys.forEach((k) => { key += k.charAt(0).toUpperCase() + k.slice(1); });
            try {
                loaded[key] = require(path);
                Debug.log('successfully loaded element module ' + key, 1);
            } catch(err) {
                Debug.log('could not load module <' + key + '>', 0);
            }
        });
        return loaded;
    };
    return load(walk(rootDir));
}

namespace.Element = namespace.loadModules(ELEMENT_DIR);
module.exports = namespace;

/*sass.render({
    file: 'modules/elements/*.scss',
    outputStyle: 'compressed' },
    function(e, r) {
        if (e) Debugger.error(e);
        console.log('sass compiled!');
        fs.writeFile('cache/styles/element.min.css', r.css, function(e) {
            if (e) Debugger.error(e);
            console.log('sass written!');
        });
});*/
