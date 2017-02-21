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



Crafted by dave@sygade.eu, aka 'Qrakhen'.

http://qrakhen.net/

#### Side Note

Please keep in mind that this Framework is still undergoing early development -
some features might still be missing, and mis- or unexpected behaviour may occur.
If you got any feedback, feel free let me know via dave@sygade.eu!
You'd rather contribute something by yourself than having to wait for my response?
Make me happy, fork this project on GitHub and throw your pull requests at me.
I'd really enjoy that.



## Documentation

Still not finished and under constant development.
http://doc.pq.sygade.eu



## Example Implementation / Quick Start

This is a quick and very dirty example I put together to get a glimpse on what the absolute
basic features of _Periodiq_ are.
More examples and some demo projects will follow soon.

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

## General Overview
I'll list all important features and details here soon.

### Elements
#### Element Actions
### Core
### Render
### Electron




## Extending & Modifying Periodiq

### Creating Custom Elements

#### Basic Element Setup

Creating custom Elements is kept simple and comes with only 3 requirements:
 - Each Element needs its own folder, somewhere within your project.
 - Each Element Folder needs exactly one 'element.js' file.
 - The element.js file has to return a class definition, while extending any other Element class.

    // element.js - example
    var BaseElement = require('periodiq').Element.Base;

    class MyCustomElement extends BaseElement {
        constructor() {
            super();
        }
    }

    modules.exports = MyCustomElement;

Loading all Elements manually can cause serious mental injury.
And that's why _Periodiq_ comes with its own auto-loader that does literally everything for you.
It even names your classes in a beatiful manner:

    const CustomElements = Periodiq.loadElementDir(Path.join(\__dirname + '/my_elements/'));

You can also provide a pre- and postfix string as the 2nd and 3rd argument.
This is especially useful when working with namespaces or mixed Elements with similar names.

However, you will sometimes get to a Point where those auto-generated names just
get _way_ too long (or, when having an unorganized folder structure, _way_ too irritating).
In this case, you can extend your class prototype by another line to override
the auto-loader's naming:

    MyCustomElement.\__CLASS_NAME_OVERRIDE = 'SuperCustomizedClassName_With_Underscores';

Beware of extending a class that has an overwritten name!
If you forget to unset or override that property in a child class,
all your inheriting classes will be known as 'SuperCustomizedClassName_With_Underscores'.

#### Assigning an Action

Actions are the 'client'-side parts of an element.
They will be loaded for each element that has an action file in its folder.
The action file has to be called `element.action.js`.
If the Periodiq loader finds that file, it will assign it to the Element's prototype and included within html output.
The Action class will be created for every single element of that type found in the element tree. If you want to turn off action execution for some element instances, set `element.blockAction` to `false`. (default: true)

Excerpt from `elements/abstract/element.action.js`

    /**
     * ...You can extend this class by using require('periodiq').Elements.Abstract.__ACTION
     *
     * Note that this will NOT be automatically extended and needs to be extended for every Element class.
     * If you really want to directly reference another element's action, you can overwrite
     * your Element.__ACTION - but that is not recommended. */
     class AbstractAction {

         /**
          * Will be called for each found DOM node for this element,
          * so the element parameter is NOT an periodiq Element class object,
          * @param {DomNode} element element dom node, queried by id. */
         constructor(element) {
             this.element = element;
         }
     }

     module.exports = AbstractAction;

#### Assigning Dedicated Dynamic Styles

    soon(tm)



### Framework Manipulation
(not yet stable/implemented)
Assign Callbacks to intercept the Framework default behaviour at certain points.
Where this opens another realm of possibilities for customization and optimization, it also exposes everything (including yourself) to the gates to hell.
This is because in its current state, there is absolutely no validation of what you're doing to any of the passed elements. This will be fixed soon.

#### Render Callbacks
All Callbacks need to return an (un-)modified version of the object they received, or things will break.
 - beforeElement(element)
 - beforeChild(childElement)
 - afterChild(childHtml)
 - afterElementTheme(element)
 - afterElement(html)
 - afterView(html)



### Creating Plugins & Extension Packages
(not yet implemented)
Create npm packages or compile .pqp files using the pq-cli (Periodiq-CLI) command pq pack <src> <dest>
Sadly, this is not even remotely working well enough to actually be fun at the moment. Not sure if I'm going to keep it up - packing up extensions isn't that useful anyway, even tho I _really_ liked the idea at first.



### Creating / Designing Themes

Themes are handy helper objects, that apply styles to all elements they're assigned to.
This does not happen once, but every single page build - making the use of multiple themes
a truly complex but rewarding challenge.
And yes, this is the point __where actual CSS comes in, so skip this part in case you're too sensitive.__

    var theme = new Theme('myTheme');

    theme.addStyle(new Style('back', {
        background_color: '#646464',
        width: '100%',
        height: '100%' },
        [ 'back' ]))
    .addStyle(new Style('default_font', {
        color: '#FEFEFE',
        font_family: 'Arial',
        font_size: '14px' },
        [ 'default_font' ]));

        module.exports = theme;

This theme can then be applied by using theme.apply(element);
If the Render instance has an active Theme set `(Render.setTheme(theme))`,
it will automatically apply it to every element that passed during render.

I know that this section lacks a lot of information and will be updated as soon as I have time for this.



## Database Connection / Models

_who needs databases when you have platform independency_

## Exporting to another Device/OS

soon(tm)

## Periodiq-CLI
(not yet released)

    $ npm install -g pq-cli
    $ pq --v
    Periodiq-CLI v0.1.5



## Changelog

    n.y.r
