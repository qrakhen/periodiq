/***
 *
 * PeriodiQ SandBox - InDev Module is located at ./periodiq/
 *
 **/

const List = require('sygtools').List;
const Electron = require('electron');
const Debug = require('./periodiq/debug.js');
const Periodiq = require('./periodiq/loader.js');
const Element = Periodiq.Element;
const Render = Periodiq.Render;
const Core = Periodiq.Core;

Core.launch(Electron, new Element.Root('pq-demo', 960, 720), function() {
    var outerBox = new Element.Base();
    outerBox.attach(Core.root);
    outerBox.setBrim([16, 32, 16, 64]);

    var innerBox = new Element.Base();
    innerBox.attach(outerBox);
    innerBox.setStyle('background-color', '#A77242');
    innerBox.setSize(666, 666, true);

    console.log(innerBox.getElementDirectory());
    var e = innerBox;
    for (var i = 0; i < 20; i++) {
        var n = new Element.Base();
        n.attach(e)
            .setSize(300 - (i * 10), 300 - (i * 10), true)
            .setStyle('background-color', '#' + i * 4 + '' + i * 3 + '32')
            .setBrim([8]);
        e = n;
    }

    var paragraph = new Element.ContentParagraph();
    paragraph.attach(innerBox);
    paragraph.content = 'Lorem Ipsum Error Terror';

    Core.root.enable();
    Render.buildView(Core.root, function(viewFile) {
        Core.setView(viewFile);
    });
});
