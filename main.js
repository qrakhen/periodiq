const List = require('sygtools').List;
const Periodiq = require('./modules/loader.js');
const Element = Periodiq.Element;
const Render = Periodiq.Render;
const Core = Periodiq.Core;

Core.launch(function() {
    var outerBox = new Element.BaseElement();
    outerBox.attach(Core.root);
    outerBox.setBrim([16, 32, 16, 64]);

    var innerBox = new Element.BaseElement();
    innerBox.attach(outerBox);
    innerBox.setStyle('background-color', '#A77242');
    innerBox.setSize(270, 240, true);

    var paragraph = new Element.ParagraphElement();
    paragraph.attach(innerBox);
    paragraph.content = 'Lorem Ipsum Error Terror';

    Core.root.enable();
    Render.buildView(Core.root, function(viewFile) {
        Core.setView(viewFile);
    });
});
