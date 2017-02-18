const RootElement = require('../elements/root.js');

var Core = function() {
    this.electron = require('electron');
    this.app = this.electron.app;
    this.Window = this.electron.BrowserWindow;
    this.root = null;

    this.launch = function(callback) {
        this.app.on('ready', function() {
            var body = { x: 0, y: 0, w: 720, h: 480 };
            this.mainFrame = new this.Window({width: body.w, height: body.h});
            this.root = new RootElement(body.x, body.y, body.w, body.h);
            callback();
        }.bind(this));
    }.bind(this);
};

module.exports = new Core();
