const Debug = require('../debug.js');
const url = require('url');
const path = require('path');

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
     * @param {object} options The options to be passed into the window
     * @param {function} ready Finish callback */
    this.launch = function(electron, rootElement, options, ready) {
        this.history    = { cursor: 0, log: [] };
        this.root       = rootElement;
        this.rpid       = null;
        this.electron   = electron;
        this.app        = this.electron.app;
        this.Window     = this.electron.BrowserWindow;
        this.app.on('ready', function() {
            /* Init mainFrame */
            this.mainFrame = new this.Window({
                width: parseInt(rootElement.body.style.width),
                height: parseInt(rootElement.body.style.height),
                title: 'Periodiq.' });
            this.mainFrame.setMenu(null);
            this.rpid = this.mainFrame.webContents;

            /* Init Shortcuts */
            electron.globalShortcut.register('F1', function() {
                Debug.log('doc shortcut triggered', 1);
                this.setView(path.join(__dirname + '/../doc/index.html'));
            }.bind(this));
            electron.globalShortcut.register('Ctrl+Backspace', function() {
                Debug.log('history back shortcut triggered', 1);
                this.historyBack();
            }.bind(this));
            electron.globalShortcut.register('F2', function() {
                Debug.log('dev tools shortcut triggered', 1);
                this.rpid.openDevTools()
            }.bind(this));
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

    /**
     * Updates just the target element in the mainFrame by selecting its element id and replacing found nodes html
     * Please keep in mind that the Core does not render the element prior to updating,
     * this needs to be done by using Render.buildElement(element);
     * @function updateViewElement
     * @memberof Core
     * @instance
     * @param {Element} targetElement the element to be updated */
    this.updateViewElement = function(targetElement) {

    }

    this.historyBack = function() {
        if (this.history.cursor > 0) this.history.cursor--;
        this.setView(this.history.log[this.history.cursor], true);
    };
};

module.exports = new Core();
