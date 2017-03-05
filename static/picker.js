const Debug = require('../debug.js');
const fs = require('fs');

var ThemePicker = function() {

    this.loadTheme = function(name, folder) {
        var theme = {};
        folder = folder || (__dirname + '/../theme');
        try {
            theme = JSON.parse(fs.readFileSync(folder + '/' + name + '/theme.json').toString());
        } catch(err) {
            Debug.log('could not load theme: ' + err);
        }
        return theme;
    }
}

module.exports = new ThemePicker();
