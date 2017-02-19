/***
 *
 * PeriodiQ SandBox - InDev Module is located at ./periodiq/
 *
 **/

const Path = require('path');
const List = require('sygtools').List;
const Electron = require('electron');
const Debug = require('./periodiq/debug.js');
const Periodiq = require('./periodiq/loader.js');
const Element = Periodiq.Element;
const Render = Periodiq.Render;
const Core = Periodiq.Core;
const CustomElement = Periodiq.loadElementDir(Path.join(__dirname + '/elements/'));

Core.launch(Electron, new Element.Root('pq-demo', 1280, 960), function() {
    var back = new Element.Base();
    back.addStyleRule(['back', 'default_font'])
        .attach(Core.root)
        .setMargin(16, 16, 32, 0)
        .setSize(1280, 960)
        .setRelative(false)
        .setPosition(null, null, 0, 0)
        .learnStyle({ background_color: '#141414' });

    var footer = new CustomElement.MusicFooter();
    footer.attach(back);

    Core.root.enable();
    Render.buildView(null, Core.root, function(viewFile) {
        Core.setView(viewFile);
    });
});
