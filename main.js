/***
 *
 * PeriodiQ SandBox - InDev Module is located at ./periodiq/
 *
 **/

const url = require('url');
const Path = require('path');
const List = require('sygtools').List;
const Electron = require('electron');
const Debug = require('./periodiq/debug.js');
const Periodiq = require('./periodiq/loader.js');
const Element = Periodiq.Element;
const Render = Periodiq.Render;
const Core = Periodiq.Core;
const CustomElement = Periodiq.loadElementDir(Path.join(__dirname + '/elements/'));

Core.launch(Electron, new Element.Root('pq-demo', 1280, 960), {}, function() {
    var head = new Element.Header('head', 'wurschtsemmerl');

    var footer = new CustomElement.MusicFooter();
    footer.attach(Core.root);

    var base = new Element.Base();
    base.setSize(128, 128)
        .setColor('#AA3377')
        .forgetStyle('margin');

    var base2 = new Element.Base();
    base2.setSize(96, 96)
        .setColor('#72F932')
        .setMargin(8, 8, 8, 8);


    base.attach(Core.root);
    base2.attach(Core.root);

    new Element.ActionButton().attach(footer);

    Core.root.enable();
    Render.buildView(head, Core.root, function(viewFile) {
        Core.setView(viewFile);
    });
});
