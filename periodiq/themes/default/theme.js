/***
 * Default Template
 **/

const Theme = require('../base.js').Theme;
const Style = require('../base.js').Style;
const __TITLE = 'default';

var theme = new Theme('theme_' + __TITLE);

theme.addStyle(new Style('back', {
        background_color: '#161616',
        width: '100%',
        height: '100%' },
        [ 'back' ]))
    .addStyle(new Style('default_font', {
        color: '#FEFEFE',
        font_family: 'Arial',
        font_size: '14px' },
        [ 'default_font' ]));

module.exports = theme;
