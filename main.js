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

Core.launch(Electron, new Element.Root('pq-demo', 1280, 960), {}, function() {
    var head = new Element.Header('head', 'wurschtsemmerl');

    var back = new Element.Base();
    back.addStyleRule(['back', 'default_font'])
        .attach(Core.root)
        .setSize(100, 100, '%')
        .setRelative(false)
        .setPosition(null, null, 0, 0);

    var footer = new CustomElement.MusicFooter();
    footer.addStyleRule(['back']);
    footer.attach(back);

    var base = new Element.Base();
    base.setSize(128, 128)
        .setColor('#AA3377')
        .forgetStyle('margin');

    base.attach(Core.root);

    for(var i = 0; i < 12; i++) {
        var a = new Element.Base();
        a.setSize(a.getSpan(1, 12, 80), '200px');
        a.setMargin(0, 3, 0, 3);
        a.setColor('#326496')
            .learnStyle('display', 'inline-block')
            .attach(Core.root);
    }

    new Element.ActionButton().attach(footer);

    Core.root.enable();
    Render.buildView(head, Core.root, function(viewFile) {
        Core.setView(viewFile);
    });
});
