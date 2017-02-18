/***
 * A Template Theme to display how a theme is made
 **/

const Theme = require('../base.js').Theme;
const Style = require('../base.js').Style;
const __TITLE = 'template';

var theme = new Theme('theme_' + __TITLE);

theme.addStyle(new Style('base', {      // style key/title
        background_color: '#DEDEDE'     // css data as json
    }, [
        'base',       // target types, aiming at the style rules
        ':-back'      // of any element. the ':' is used like a wildcard
    ])
);

module.exports = theme;
