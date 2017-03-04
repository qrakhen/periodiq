const Path  = require('path');
const fs = require('fs');

/**
 * Creates default JSON-configuration-file for periodiq app-configurations.
 * The new file is stored as periodiq/config/pq.app.json */
var AppConfigs = function() {
    var fileName = 'pq.app.json';
    var configs = JSON.stringify({

        /* Strimg - name of the application */
        name: 'pqapp',

        /* Strimg - company distributing the application */
        company: 'company',

        /* Strimg - description of the application */
        description: '',

        /* String - default theme of the app */
        defaultTheme: 'default',

        /* Integer - LogLevel determins how much of of the apps debug log-messesges are shown in console */
        debugLogLevel: 0,

        /* Object - GlobalShortcuts can be used anywhere in the app */
        globalShortcuts: {

        }
    });
    this.write = function() {
        fs.writeFileSync(Path.join(__dirname + '/../config/' + fileName), configs, function(err) {
            if(err) {
                return Debug.log(err);
            }
            Debug.success('New internal ' + fileName + ' file created');
        });
    };
}
module.exports = new AppConfigs();
