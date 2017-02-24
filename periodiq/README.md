  periodiq.
=============

**periodiq** is a HTML-free, lightweight and vastly extendable open-source Framework for NodeJS,
designed to provide a pleasant and simple yet well-structured and guided coding experience for app and web development.

Altough **periodiq**'s main application case is intended to be targeted at the structured and organized creation of
platform-independent applications, it doesn't close the other doors: **periodiq** invites you to convert your creative,
experimental and innovative output and ideas into working applications.
**periodiq** comes with just as much rules as really needed, but always keeps them as little as possible.

Even tho it is based on Electron, **periodiq**'s workflow completely abandons any form of interaction with HTML.
You are completely detached from the monotonous torture of writing static markup, assigning CSS classes or using complex
templating engines. This results in a feeling of freedom and levitation that persists to the last commit and beyond.

It's just pure & solid JavaScript. And some CSS.

**periodiq** comes with a structured component-like system, a smart and fully extendable element tree to perfectly fit
all the needs for even the most adventurous projects. It is completely written using ES6 closures like classes,
seperated into module files - so you can easily extend **periodiq**'s vast collection of standard built-in elements.
And all that requires is the creation of one single file - **periodiq** will implement your module on it's own and make
it accessible within the framework during run-time.

After you sticked together some elements, you kindly ask the **periodiq**'s Render system to do the dirty work.
The entire element tree provided will be rendered down to a fully working application (or web) page, automatically
including all scoped scripts, styles and attributes.



Enjoy using **periodiq**, the framework that pleasingly takes away the boring parts and only leaves the good bits.



_Crafted by:_

[david@sygade.eu /Qrakhen](http://qrakhen.net/)

[mennoxx@sygade.eu](http://sygade.eu)


##### Links
 - [Homepage](http://periodiq.org)
 - [Documentation](http://docs.periodiq.org)
 - [GitHub Repository](https://github.com/qrakhen/periodiq)
 - [NPM Package(not published yet)]()



#### Side Note

Please keep in mind that this Framework is still undergoing early development -
some features might still be missing, and mis- or unexpected behaviour may occur.
If you got any feedback, feel free let me us know!
You'd rather contribute something by yourself than having to wait for a response?
Make me happy, fork this project on GitHub and throw your pull requests at us.
We'd really enjoy that.



## Setup Guide

This guide will quickly introduce you on how to create a new **periodiq** project.

 - Create a new directory for your project `$ mkdir periodiq` and `$ cd periodiq/`.
 - Now run the `$ npm init` command, and enter whatever you like.
 - Install Electron using `$ npm install -D electron`.
 - Install **periodiq** using `$ npm install -D periodiq`.
 - Edit the `package.json` and add:

    "scripts": {
        "dev": "electron main.js --indev --debug 3"
    }

 - Now create a `main.js` file.
 - You're good to go! Read the next step on how to implement **periodiq**.



## Basic Implementation / Quick Start

This is a quick and dirty example I put together to get a glimpse on what the absolute
basic features of **periodiq** are.
More examples and some demo projects will follow soon.

    // require electron to later pass it into periodiq's core
    const Electron = require('electron');
    // load the periodiq object, containing everything you need
    const Periodiq = require('periodiq');
    // Element is a collection of all built-in elements that can be directly used,
    // extended, or modified, and is stored as another object within the Periodiq object
    const Element = Periodiq.Element;
    const Render = Periodiq.Render;
    const Core = Periodiq.Core;

    // launch the core, providing the electron object, a new root element, null for the settings and a finish callback
    Core.launch(Electron, new Element.Root('example'), null, function() {
        // create a new element, attach it to the root element,
        // set its margin, assign a custom size,
        // and apply a background color
        // checkout the documentation for AbstractElement and BaseElement to get more information about the included functions.
        var base = new Element.Base();
        base.attach(Core.root)
            .setMargin(32, 32)
            .setSize(420, 270)
            .setColor('#1696A4');

        // let's create a button and attach it to the element we created before
        var button = new ActionButton.Base();
        button.attach(base);

        // now render the root element recursively including all children using buildView
        Render.buildView(Core.root, function(file) {
            // activate the view we got from the  by triggering an url redirect in electron
            Core.setView(file);
        });
    });

Now launch the rocket by running `npm run dev`. Woo!
Read on if you want to know how to add or extend elements, create scoped styles,
implement view-side javascript, add events, and much, much more!
You'll find a section describing every feature within this readme,
and detailed information on every class, property and function in the [documentation](http://docs.periodiq.org).

### Tutorials

You can find tutorials for specific topics like 'how to create a custom element' in the tutorials/ folder,
listed as seperate .md files for you to check out.

List of Tutorials:

 - How to create, extend, style and use Elements.

### Demo Project

You can clone the official demo from github (link soon).
After cloning, use `npm install` and then `npm run dev` to run the demo.



# Periodiq Overview MOVE TUTORIAL PARTS INTO TUTORIAL FILES

A complete overview on all aspects of Periodiq, supported by example code for each part.

## Elements

The Element System is the heart of **periodiq**.
We also like to call it the `Periodiq table of Elements` :)
Some day, there will be something in this section.
Just not today.

### Element Creation

Creating custom Elements is kept simple and comes with only 3 requirements:
 - Each Element needs its own folder, somewhere within your project.
 - Each Element Folder needs exactly one 'element.js' file.
 - The element.js file has to return a class definition, while extending any other Element class.

We recommend reading the [Documentation](http://docs.periodiq.org) for closer information.

    // element.js - example
    var BaseElement = require('periodiq').Element.Base;

    class MyCustomElement extends BaseElement {
        constructor() {
            super();
        }
    }

    modules.exports = MyCustomElement;

Loading all Elements manually can cause serious mental injury.
And that's why **periodiq** comes with its own auto-loader that does literally everything for you:

    const CustomElements = Periodiq.loadElementDir(Path.join(__dirname + '/my_elements/'));

All you need to do is group your seperate element folders in one single 'set'-folder.
You can also provide a pre- and postfix string for the class names as the 2nd and 3rd argument.
This is especially useful when working with namespaces or mixed Elements with similar names.

It is recommended (and **important** if you use multiple element sets) that you include a set.json
at the root of your element directory. See an example in periodiq/elements/set.json:

    {
        "title": "periodiq standard elements",
        "namespace": "pq",
        "author": "dave@sygade.eu"
    }

This file tells the **periodiq** loader what namespace those elements are in and will use it to prepend it as prefix to all Element's CSS classes, for example.
If you do not use a prefix, or `set.json` at all, the prefix will be `noset` and multiple element sets will get mixed up and messy.


### Element Styling

Elements can be styled in a very easy way.
All you need to do is add an element.css file into your element directory, and that's it.
Within that file, you have access to all variables defined in the /theme/ folder,
depending and the currently active theme.

In that file, you will be provided with the `.element` selector, which will be
replaced with the correct element's CSS class.

Example File, `/elements/action/buttons/element.css`:

    .element {
        display: inline-block;
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        background-color: $mainColor;
        font-color: $fontBright;
        transition: all 0.3s;
    }

    .element:hover {
        background-color: $accent;
    }

You can also add custom classes if needed (i.e. for composite-type elements that have fixed children) by using `element.addClass('myCssClass');`.

#### Themes

soon

### Actions

#### The Action Class

Actions are the 'client'-side parts of an element.
They will be loaded for each element that has an action file in its folder,
which has to be called `element.action.js` in order to be detected when loading all elements.
If the Periodiq loader finds that file, it will assign it to the Element's prototype and included within html output.
The Action class will be created for every single element of that type found in the element tree.
If you want to turn off action execution for some element instances, set `element.blockAction` to `false`. (default: true)

Check the AbstractAction Documentation for closer information.

#### The EventController

The EventController is the interface between the render and the main thread.
An Action instance can trigger an event via the EventController,
and from there, there provided event information will be passed to all listeners.
Assigning a listener can be done by calling `EventController.addListener(eventName, callback)`.
As soon as EventController.trigger(eventName, senderId, data) is called,
`callback(eventName, senderId, data)` will be called for all listeners that are listening to `eventName`

Check the EventController Documentation for closer information.

#### Example Action/Event Implementation

Let's create a button-like Element that can be clicked and send a message to the main thread.
After creating a new element (`button/element.js`), add the file `button/element.action.js`:

    //file: button/element.action.js

    var pq = require('periodiq');

    class ButtonAction extends pq.Element.Abstract.Action {

         constructor(element) {
             super(element);
             element.addEventListener('click', function() {
                /* this.event is a reference to the EventController instance */
                 this.event.trigger('button', element.id, {});
             }.bind(this));
         }
     }

     module.exports = ButtonAction;

This code would already send some event information to the main thread,
but without any listeners assigned, not much would happen.
So we'll have to assign listener callbacks.
This is simply done by using EventController.addListener(eventName, callback);
You can assign _any_ function, from anywhere.
The callback will be called with (eventName, senderId, data);

    EventController.addListener('click', function(eventName, senderId, data) {
        console.log(senderId + ' sent ' + eventName, data);
    });



### Dedicated Dynamic Styles

    soon(tm)



### Core
### Render
### Electron


## Framework Manipulation
(not yet stable/implemented)
Assign Callbacks to intercept the Framework default behaviour at certain points.
Where this opens another realm of possibilities for customization and optimization, it also exposes everything (including yourself) to the gates to hell.
This is because in its current state, there is absolutely no validation of what you're doing to any of the passed elements. This will be fixed soon.

### Render Callbacks
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

editme



## Database Connection / Models

_who needs databases when you have platform independency_



## Exporting to another Device/OS

soon(tm)



## Periodiq-CLI
(not yet released)

    $ npm install -g pq-cli
    $ pq --v
    Periodiq-CLI v0.1.5



## FAQ

## Version History

    n.y.r
