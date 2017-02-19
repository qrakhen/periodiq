
/*################################:PeriodiQ:##################################*\
    This is an example implementation of the PeriodiQ Framework.
    For closer information on how to use PeriodiQ, check out our documentation:
     > http://doc.periodiq.sygade.eu
    You can also check out the provided readme.md for a small presentation of
    many features including several short usage examples for each feature.
\*############################################################################*/

/* require electron to later pass it into periodiq's core */
const Electron = require('electron');
/* load the periodiq object, containing the core and render instances */
const Periodiq = require('./periodiq/loader.js');
/* Element is a collection of all built-in elements that can be used */
const Element = Periodiq.Element;
const Render = Periodiq.Render;
const Core = Periodiq.Core;
/* the Periodiq object provides a function to import custom elements created within your project
 * this function also automatically generates the class name based on the element.js file location
 * so if your element.js is located at ./home/menu/top/, Periodiq will call it 'HomeMenuTop' */
const CustomElements = Periodiq.loadElementDir(Path.join(__dirname +  + '/my_elements/'));

/* launch the core, providing the electron instance, a root element, and a finish callback */
Core.launch(Electron, new Element.Root('example', 960, 720), function() {
    /* create a new element, attach it to the root element,
     * set its margin to 0, assign a custom size
     * and apply a background color */
    var back = new Element.Base();
    back.attach(Core.root)
        .setBrim([0])
        .setSize(960, 720, true)
        .learnStyle({ background_color: '#141414' });

    /* we need to enable the root element in order for the render instance to
     * not bypass it along all its children */
    Core.root.enable();

    /* build any given element's html, including all children, recursively.
     * in this case, we want to render the root element, resulting in the entire
     * page to be rendered */
    Render.buildView(Core.root, function(viewFile) {
        /* activate the view triggering an url redirect in electron */
        Core.setView(viewFile);
    });
});
