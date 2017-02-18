/***
 * Loads the PeriodiQ Framework
 **/

const path = require('path');

global.Debug = require('./debug.js');
global.ROOT_DIR = path.join(__dirname + '/../');

var _loadElements = [
    'abstract',
    'base',
    'root',
    'paragraph'
]

module.exports = {
    Render: require('./static/render.js'),
    Core: require('./static/core.js'),
    Element: {
        AbstractElement: require('./elements/abstract/element.js'),
        BaseElement: require('./elements/base/element.js'),
        RootElement: require('./elements/root/element.js'),
        ParagraphElement: require('./elements/paragraph/element.js')
    }
};
