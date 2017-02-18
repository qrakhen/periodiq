const RootElement = require('../elements/root/element.js');
const url = require('url');
const path = require('path');

var Core = function() {
    this.electron = require('electron');
    this.app = this.electron.app;
    this.Window = this.electron.BrowserWindow;
    this.root = null;

    this.launch = function(callback) {
        this.app.on('ready', function() {
            this.mainFrame = new this.Window({width: 1420, height: 960});
            this.root = new RootElement();
            callback();
        }.bind(this));
    }.bind(this);

    this.setView = function(filePath) {
        this.mainFrame.loadURL(url.format({
            pathname: filePath,
            protocol: 'file:',
            slashes: true
        }));
    };

    this.setHtml = function(html) {

    };
};

module.exports = new Core();
