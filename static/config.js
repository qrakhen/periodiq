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

     this.configs = new List();

     /**
      * Load and extend configurations.
      * Usage:
      *
      * @function load
      * @memberof Config
      * @instance
      * @param {FilePath} filePath   */
     this.load = function(filePath) {
         var split = filePath.split('.');
         var config = split[split.length - 2];
         this.configs[config] = JSON.parse(fs.readFileSync(JSON.stringify('config/pq.' + config + '.js')));

         this.configs[config].storeTo = function(filePath) {
             fs.writeFileSync(filePath, JSON.stringify('./config/pq.' + config + '.json'), function(err) {
                 if(err) {
                     return Debug.log(err);
                 }
                 Debug.log('SUCCESS: Config-file saved as ' + filePath);
             });
         };
         this.configs[config].extendFrom = function(filePath) {
             Debug.log(JSON.parse(filePath));
             //foreEach(item in userConfigs) {
             //  this.set(item.key, item.value)
             //}
         };
     };

     /**
      * Get objects and values from configuration.
      * Usage:
      *
      * @function get
      * @memberof Config
      * @instance
      * @param {Config} config   */
     this.get = function(config) {
         if (this.configs[config] === undefined) {
             try {
                 this.load('.../pq.' + config + '.json');
             } catch(err) {
                 Debug.log(err);
             }
         } else {
             return this.configs[config];
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
     this.DEFAULT_CONFIG = {
         window: './config/pq.window.js',
         app:    './config/pq.app.json',
         debug:  './config/pq.debug.json'
     };
 };

 module.exports = new Config();
