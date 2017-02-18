const List = require('sygtools').List;
const Periodiq = require('./modules/loader.js');
const Element = Periodiq.Element;
const Render = Periodiq.Render;
const Core = Periodiq.Core;

Core.launch(function() {
    var box = new Element.BaseElement();
    box.attach(Core.root);
    box.setBrim([16, 16, 16, 16]);

    var box2 = new Element.BaseElement();
    box2.attach(box);

    Core.root.enable();
    Render.buildElement(Core.root);
});
