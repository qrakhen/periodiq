/***
 * Loads the PeriodiQ Framework
 **/

const path = require('path');

global.Debug = require('./debug.js');
global.ROOT_DIR = path.join(__dirname + '/../');
const MODULE_DIR = ROOT_DIR + '/modules';

var namespace = {
    Render: require(MODULE_DIR + '/static/render.js'),
    Core: require(MODULE_DIR + '/static/core.js'),
    Element: {}
};

var __loadedElements = [
    'abstract',
    'base',
    'root',
    'content',
    'content/paragraph',
    'content/image',
    'content/link' ];

 __loadedElements.forEach(function(e) {
    var keys = e.split('/');
    var key = '';
    keys.forEach(function(k) {
        key += k.charAt(0).toUpperCase() + k.slice(1);
    });
    var path = MODULE_DIR + '/elements/' + e + '/element.js';
    try {
        namespace.Element[key] = require(path);
    } catch(err) {
        Debug.log('could not load module <' + key + '>\r\n'
            + 'make sure this file exists or remove it from loader.js::__loadedElements;');
    }
});

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
