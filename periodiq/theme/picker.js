const Debug = require('../debug.js');
const fs = require('fs');

var ThemePicker = function() {

    this.loadTheme = function(name) {
        var theme = {};
        try {
            theme.colors = JSON.parse(fs.readFileSync(__dirname + '/palettes/' + name + '/colors.json').toString());
        } catch(err) {
            Debug.log('could not load theme: ' + err);
        }
        return theme;
    }
}

module.exports = new ThemePicker();
