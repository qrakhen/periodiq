const Debug = require('../debug.js');
const url = require('url');
const path = require('path');
const a = require('../loader.js');

/**
 * The Core Instance is Periodiq's super controller.
 * It is used to launch Periodiq, change views or to communicate with the render thread, for example.
 * @todo The Core is also currently being abused to register shortcuts, which should be made somewhere else, imho.
 * @class Core */
var Core = function() {
    /**
     * Launches Periodiq's Core instace, passing the required electron object
     * (needs to be required from outside), a rootElement and a callback that
     * will be fired as soon as the Core finished initialization.
     * Params could be passed like this:
     *
     *      Core.launch(require('electron'), new Periodiq.Element.Root(), function() { ... });
     *
     * Please keep in mind that it is necessary to wait for the callback to fire,
     * anything related to periodiq won't work besides creating elements.
     *
     * @function launch
     * @memberof Core
     * @instance
     * @param {Electron} electron Electron class (as returned by require())
     * @param {Element} rootElement The root (origin) element, where the entire page is rooted
     * @param {function} ready Finish callback */
    this.launch = function(electron, rootElement, ready) {
        this.history    = { cursor: 0, log: [] };
        this.root       = rootElement;
        this.rpid       = null;
        this.electron   = electron;
        this.app        = this.electron.app;
        this.Window     = this.electron.BrowserWindow;
        this.app.on('ready', function() {
            /* Init Shortcuts */
            electron.globalShortcut.register('F1', function() {
                Debug.log('doc shortcut triggered', 0);
                this.setView(path.join(__dirname + '/../doc/index.html'));
            }.bind(this));
            electron.globalShortcut.register('Ctrl+Backspace', function() {
                Debug.log('history back shortcut triggered', 0);
                this.historyBack();
            }.bind(this));

            /* Init mainFrame */
            this.mainFrame = new this.Window({
                width: rootElement.body.style.width,
                height: rootElement.body.style.height });
            this.mainFrame.setMenu(null);
            this.rpid = this.mainFrame.webContents;
            ready();
        }.bind(this));
    }.bind(this);

    this.setView = function(filePath, noHistory) {
        Debug.log('setting view to ' + filePath, 1);
        this.mainFrame.loadURL(url.format({
            pathname: filePath,
            protocol: 'file:',
            slashes: true
        }));
        if (noHistory) return;
        this.history.cursor++;
        this.history.log.push(filePath);
    };

    this.historyBack = function() {
        if (this.history.cursor > 0) this.history.cursor--;
        this.setView(this.history.log[this.history.cursor], true);
    };
};

module.exports = new Core();
