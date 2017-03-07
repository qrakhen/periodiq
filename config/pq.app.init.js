const Path  = require('path');
const fs = require('fs');

/**
 * Creates default JSON-configuration-file for periodiq app-configurations.
 * The new file is stored as periodiq/config/pq.app.json */
var AppConfigs = function() {
    this.fileName = 'pq.app.json';
    var configs = {

        /* Strimg - name of the application */
        name: 'pq-app',

        /* Strimg - company distributing the application */
        company: 'company',

        /* Strimg - description of the application */
        description: '',

        /* String - default theme of the app */
        defaultTheme: 'default',

        /* Integer - LogLevel determins how much of of the apps debug log-messesges are shown in console */
        debugLogLevel: 3,

        /* Object - GlobalShortcuts can be used anywhere in the app */
        globalShortcuts: {

        }
    };
    this.write = function() {
        fs.writeFileSync(__dirname + '/' + this.fileName, JSON.stringify(configs, null, 4));
    };
}
module.exports = new AppConfigs();
