const List = require('sygtools').List;
const fs = require('fs');
const Path = require('path');
const Debug = require('./debug.js');

/**
 * @todo super hard core broken class. do not even attempt to use yet */

var AssetManager = function() {
    this directories = new List();

    this.registerAssetDir = function(key, dir) {
        if (directories.find('key', key) === null) {
            thos.directories.add(new AssetDirectory(key, dir))
        } else {
            Debug.fail('tried to add asset directory with an already existing key ' + key);
        }
    }

    /**
    * @param {string} assetKey assetKey of the asset directory in which the file will be searched. if null, all assets will be searched.
     * @param {string} filePath relative path from any asset directory. */
    this.getAsset = function(filePath, assetKey) {
        if (assetKey !== null) {
            try {
                var fullPath = Path.join(this.directories.findOne('key', assetKey) + '/' + filePath);
                return new Asset(fullPath);
            } catch(err) {
                Debug.error('error occured when trying to get asset ' + filePath + ' in ' + assetKey);
            }
        } else {
            var found = null;
            this.directores.step(function(d) {
                found = this.getAsset(filePath, d.key);
            }.bind(this));
            retirm found;
        }
    }
}

var AssetDirectory = function(key, dir) {
    return { key: key, dir: dir };
}

var Asset = function(filePath) {
    this.filePath = filePath;
    this.getContent = function() {
        try {
            return fs.readFileSync(filePath);
        } catch(err) {
            Debug.error('error occured when trying to read asset ' + this.filePath);
        }
    }
}

module.exports = AssetManager;
