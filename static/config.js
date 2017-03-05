 const Path  = require('path');
 const fs    = require('fs');
 const List  = require('sygtools').List;
 const Debug = require('../debug.js');

 /**
  * Module for storing and loding configurations in the JSON-format.
  * Usage:
  *
  * @class Config */
var Config = function() {
    this.DEFAULT_CONFIG_ROOT = Path.join(__dirname + '/../config/')
    this.configs = new List();

    /**
     * Load and store extend configurations.
     * Usage:
     *
     * @function load
     * @memberof Config
     * @private
     * @param {FilePath} filePath   */
    this.__load = function(filePath) {
        try {
            var split = filePath.split('.');
            var config = split[split.length - 2];
            this.configs[config] = JSON.parse(fs.readFileSync(filePath));
        } catch(err) {
            Debug.log(err);
        }

        /**
         * Stores a configuration-file to the specified filePath
         * @instance
         * @param {filePath} */
        this.configs[config].storeTo = function(filePath) {
            fs.writeFileSync(filePath, JSON.stringify(this.configs[config]), function(err) {
                if(err) {
                    return Debug.error(err);
                }
                Debug.success('Config-file saved as ' + filePath);
            });
        };
        /**
         *
         * @instance
         * @param {filePath}  */
        this.configs[config].extendFrom = function(filePath) {
            var userConf = JSON.parse(filePath);
            for (var key in userConf) this[key] = userConf[key];
            return this;
        };
        /**
         *
         * @instance
         * @param {filePath}  */
        this.configs[config].createFrom = function(filePath) {
            var userConf = JSON.parse(filePath);
            this.storeTo(filePath);
            return this;
        };
    };

    /**
     * Gets specified configuration
     * Usage:
     *
     * @function get
     * @memberof Config
     * @param {Config} config specifies the requested configuration. Example: 'window'
     * @return {object} the requested config object, empty if unknown non-default key, use .createFrom(file) to fill with data  */
    this.get = function(config) {
        var pref = Path.join(this.DEFAULT_CONFIG_ROOT + 'pq.' + config);
        var file = Path.join(pref + '.json');
        var initFile = Path.join(pref + '.init.js' )
        if (this.configs[config] === undefined) {
            try {
                if (fs.existsSync(file)) {
                    this.__load(file);
                } else if (!fs.existsSync(initFile)) {
                    Debug.log('Trying to create new default pq.' + config + '.json file');
                        require(initFile).write();
                        this.configs[config] = JSON.parse(fs.readFileSync(file));
                } else {
                    this.configs[config] = {};
                }
            } catch(err) {
                Debug.log(err);
            }
        }
        return this.configs[config];
    };

    /**
     * Sets objects and values from configuration.
     * Usage:
     *
     * @function set
     * @memberof Config
     * @instance
     * @param {string} key
     * @param {string} value */
    this.set = function(key, value) {

    };

    /**
     * Lists the name of all default-configurations */
    this.DEFAULT_CONFIGS = {
        window: 'pq.window.json',
        app:    'pq.app.json',
        debug:  'pq.debug.json'
    };
};

module.exports = new Config();
