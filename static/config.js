 const Path  = require('path');
 const fs    = require('fs');
 const Debug = require('../debug.js');

 /**
  * Module for storing and loding configurations in the JSON-format.
  * Usage:
  *
  * @class Config */
var Config = function() {
    this.DEFAULT_CONFIG_ROOT = Path.join(__dirname + '/../config/')
    this.__configs = {};

    /**
     * Load and store extend configurations.
     * Usage:
     *
     * @function load
     * @memberof Config
     * @private
     * @param {FilePath} filePath
     * @param {string} configName optional config name override */
    this.__load = function(filePath) {
        // only read a file if the path is given, if there's none provided, we assume a new config is created //
        var config = {};
        if (filePath !== undefined && filePath !== null) {
            try {
                config = JSON.parse(fs.readFileSync(filePath));
            } catch(err) {
                Debug.error(err);
            }
        }

        // always define the functions, even for new configs //

        /**
         * Stores a configuration-file to the specified filePath
         * @memberof Config.get()
         * @instance
         * @param {filePath} */
        config.storeTo = function(filePath) {
            fs.writeFileSync(filePath, JSON.stringify(this, function(err) {
                if(err) return Debug.error(err);
                Debug.success('Config-file saved as ' + filePath);
            }));
        };
        
        /**
         *
         * @instance
         * @param {filePath}  */
        config.extendFrom = function(filePath) {
            var userConf = JSON.parse(filePath);
            for (var key in userConf) this[key] = userConf[key];
            return this;
        };

        return config;
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
        var initFile = Path.join(pref + '.init.js');
        if (this.__configs[config] === undefined) {
            try {
                if (fs.existsSync(file)) {
                    this.__configs[config] = this.__load(file);
                } else if (fs.existsSync(initFile)) {
                    Debug.log('Trying to create new default pq.' + config + '.json file');
                        require(initFile).write();
                        this.__configs[config] = this.__load(file);
                } else {
                    this.new(config);
                }
            } catch(err) {
                Debug.error(err);
            }
        }
        return this.__configs[config];
    };

    /**
     * Creates a new config, providing a configName and optional filePath.
     * If no filePath is provided, an empty config will be set - you can use the included extendFrom() function to
     * extend this config using another file, overriding equal keys and leaving the rest.
     * This function does not return the config! Use Config.get(configName) to access your config.
     * @function new
     * @memberof Config
     * @param {string} configName the name of the config, used to retrieve it with Config.get(configName)
     * @param {string} filePath an optional filePath to the initially loaded config .json file */
    this.new = function(configName, filePath) {
        if (this.__configs[configName] === undefined) {
            this.__configs[configName] = this.__load(filePath, configName)
        } else {
            Debug.error('cannot create new config ' + configNAme + ': this key already exists. extend existing config or use a different key');
        }
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
