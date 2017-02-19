const Debug = require('../debug.js');
const url = require('url');

var Core = function() {
    /***
     * Launches periodiq's core, passing the required electron object
     * (needs to be required from outside), a rootElement and a callback that
     * will get triggered as soon as the Core finished initialization.
     * Params could be passed like this:
     *
     *      Core.launch(require('electron'), new Periodiq.Element.Root(), function() { ... });
     *
     * Please keep in mind that it is necessary to wait for the callback to fire,
     * anything related to periodiq won't work besides creating elements.
     */
    this.launch = function(electron, rootElement, ready) {
        this.root = rootElement;
        this.electron = electron;
        this.app = this.electron.app;
        this.Window = this.electron.BrowserWindow;
        this.app.on('ready', function() {
            this.mainFrame = new this.Window({
                width: rootElement.body.style.width,
                height: rootElement.body.style.height });
            ready();
        }.bind(this));
    }.bind(this);

    this.setView = function(filePath) {
        Debug.log('setting view to ' + filePath, 1);
        this.mainFrame.loadURL(url.format({
            pathname: filePath,
            protocol: 'file:',
            slashes: true
        }));
    };
};

module.exports = new Core();
