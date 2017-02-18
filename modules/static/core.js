var Core = function() {
    this.electron = require('electron');
    this.app = this.electron.app;
    this.Window = this.electron.BrowserWindow;
    this.root = {};

    this.initMainFrame = function() {
        this.mainFrame = new this.Window({width: 720, height: 480});
    }.bind(this);

    this.app.on('ready', this.initMainFrame);
};

exports = new Core();
