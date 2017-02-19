  periodiq.
=============

_Periodiq_ is a fast, lightweight and extendable open-source Framework for NodeJS,
designed to provide a pleasant and simple yet well-structured and guided coding experience.

_Periodiq_'s main application case is intended to be targeted at the
structured and organized creation of platform-independent applications -
but it doesn't close the other doors: _Periodiq_ invites you to convert your
creative, experimental and innovative output and ideas into working applications.
_Periodiq_ comes with just as much rules as really needed, but always keeps them as little as possible.

_Periodiq_'s workflow completely abandons any form of interaction with HTML or CSS.
You are completely detached from the monotonous torture of writing static markup,
resulting in a feeling of freedom and levitation that persists to the last commit and beyond.

Just pure, simple and honest JavaScript.

_Periodiq_ comes with the so-called 'ElementTree' system, a smart and fully extendable
module tree to perfectly fit all the needs for even the most adventurous projects.
You'll also get in touch with the simple yet truly flexible RenderInstance -
it builds, processes and caches everything you put into it - fully automated.
Its best friend, the CacheWatcher, will take care of monitoring and managing
your generated cache - so a refresh will only happen to the actual affected parts -
with atomic precision, resulting in highly optimizied performance.

By using Electron as the backbone of _Periodiq_'s rendering and user interface
system, a wide range of platforms can easily be targeted and reached.

You must be asking: 'Doesn't Electron somehow require HTML/CSS?'

The answer is yes, it does. But _Periodiq_'s RenderInstance takes that off of your
shoulders - and does the dirty work for you. A lot. It recognizes every change made
to the element tree and translates your JavaScript code into dynamically generated HTML files.
_Periodiq_ does a good job at hiding every sign of possible HTML/CSS contamination
across the Framework.

Please keep in mind that this Framework is still undergoing early development -
some features might still be missing, and mis- or unexpected behaviour may occur.
If you got any feedback, feel free let me know via dave@sygade.eu!
You'd rather contribute something by yourself than having to wait for my response?
Make me happy, fork this project on GitHub and throw your pull requests at me.
I'd really enjoy that.



Crafted by dave@sygade.eu, aka 'Qrakhen'.

http://qrakhen.net/



## Documentation

...still being written, and in its current state you'd turn out to be confused rather than actually informed. I'm sorry for that - until the docs are live, you can always
checkout my comments in the source code, the most important parts are well covered.



## Example Implementation / Quick Start

This is a Quick Start example I put together to get a glimpse on the absolute
basic features of _Periodiq_ - more Examples will follow soon, along with the docs.

    // require electron to later pass it into periodiq's core
    const Electron = require('electron');
    // load the periodiq object, containing both the core and render instances
    const Periodiq = require('periodiq');
    // Element is a collection of all built-in elements that can be directly used,
    // extended, or modified, and is stored as another object within the Periodiq object
    const Element = Periodiq.Element;
    const Render = Periodiq.Render;
    const Core = Periodiq.Core;

    // launch the core, providing the electron instance, a root element, and a finish callback
    Core.launch(Electron, new Element.Root('example', 960, 720), function() {
        // create a new element, attach it to the root element,
        // set its margin, assign a custom size,
        // and apply a background color
        // checkout periodiq/elements/base/element.js for a list of all basic styling functions.
        var back = new Element.Base();
        back.attach(Core.root)
            .setMargin(32, 32)
            .setSize(960, 720)
            // even tho you don't have to, you still _can_ use actual CSS here if you really want to.
            .learnStyle({
                background_color: '#141414',
                font-size: '14px'
            });

        // let's create another element, but attach it to the 'back' element instead of the root
        var square = new Element.Base();
        square.attach(back)
            .setSize(64, 64)
            .setPosition(128, 128);

        // we need to enable the root element in order for the render instance to
        // not bypass it along all its children
        Core.root.enable();

        // build any given element's html, including all children, recursively.
        // in this case, we want to render the root element, resulting in the entire
        // page to be rendered
        Render.buildView(Core.root, function(viewFile) {
            // activate the view triggering an url redirect in electron
            Core.setView(viewFile);
        });
    });



## Extending Elements / Creating Custom Elements

Creating custom Elements is kept simple and comes with only 3 requirements:
 - Each Element needs its own folder, somewhere within your project.
 - Each Element Folder needs exactly one 'element.js' file.
 - The element.js file has to return a class definition, while extending any other Element class.

    // element.js - example

    class MyCustomElement extends BaseElement {
        constructor() {
            super();
        }
    }

    modules.exports = MyCustomElement;

Loading all Elements manually can cause serious mental injury.
And that's why _Periodiq_ comes with its own auto-loader that does literally everything for you.
It even names your classes in a beatiful manner:

    // the Periodiq object also provides a function to import your own elements
    // created somewhere within your project. In this example, we're loading a
    // ./my_elements/ folder, which should contain one folder each per Element,
    // as described above. Element Folders can also be placed within each other -
    // to enhance readability especially when creating bigger Element structures.
    // Just keep in mind that any folder without 'element.js' will not be recognized.
    // This function automatically generates the class name based on the element.js file's location,
    // so if your element.js was located at './my_elements/home/menu/top/element.js',
    // this function would return 'HomeMenuTop' as this Element's class key,
    // making your Element accessible using 'CustomElements.HomeMenuTop';
    const CustomElements = Periodiq.loadElementDir(Path.join(\__dirname + '/my_elements/'));

However, you will sometimes get to a Point where those auto-generated names just
get _way_ too long (or, when having an unorganized folder structure, _way_ too irritating).
In this case, you can extend your class prototype by another line to override
the auto-loader's naming:

    MyCustomElement.__CLASS_NAME = 'SuperCustomizedClassName_With_Underscores';

Beware of extending a class with an overwritten name!
If you forgrt to unset or override that property in a child class,
all your inheriting classes will be known as 'SuperCustomizedClassName_With_Underscores'.



## Creating Plugins
### RenderPlugin
#### RenderPreProcessor
#### RenderPostProcessor


## 'Client'-Side JavaScript

## Creating / Designing Themes

Themes are super handy helper objects, that apply styles to all elements they're assigned to.
This does not happen once, but every single page build - making the use of multiple themes
a truly complex but rewarding challenge.

    // Theme Examples soon(tm)



## Database / Models



## Exporting to another Device/OS



### Changelog

    nope.jpg
