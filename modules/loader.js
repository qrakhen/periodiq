/***
 * Loads the PeriodiQ Framework
 **/

global.Debug = require('./debug.js');
module.exports = {
    Render: require('./static/render.js'),
    Core: require('./static/core.js'),
    Element: {
        AbstractElement: require('./elements/abstract.js'),
        BaseElement: require('./elements/base.js')
    }
};
