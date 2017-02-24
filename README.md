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

**If you happen to have any ideas for tutorials**, please let us know - we'll see if we can make one.
We want to know what aspects of the framework are not well enough documented or have unclear usage.



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

## Tutorials

Will follow.

## Demo Project

You can clone the official demo from github (link soon).
After cloning, use `npm install` and then `npm run dev` to run the demo.

### Tips & Tricks

Here's some useful advice that can be really useful for new users:

 - Press CTRL+R to instantly reload, rebuild and rerender your current state - no manual restarting required.
 - Press F1 to render the documentation _within_ your periodiq window.
 - Press CTRL+Backspace to return to the last view/page.
 - ...

## Periodiq Overview

A complete overview on all aspects of Periodiq, supported by example code for each part.

### Elements

For the Element Documentation / Code Examples navigate into the `elements/` folder.

### Core
### Electron
### Config System



### Framework Enhancement
#### Manipulation Callbacks
(not yet stable)
Assign Callbacks to intercept the Framework default behaviour at certain points.
Where this opens another realm of possibilities for customization and optimization, it also exposes everything (including yourself) to the gates to hell.
This is because in its current state, there is absolutely no validation of what you're doing to any of the passed elements. This will be fixed soon.

##### Render Callbacks
All Callbacks need to return an (un-)modified version of the object they received, or things will break.
 - beforeElement(element)
 - beforeChild(childElement)
 - afterChild(childHtml)
 - afterElementTheme(element)
 - afterElement(html)
 - afterView(html)



#### Creating Plugins & Extension Packages
(not yet implemented)
Create npm packages or compile .pqp files using the pq-cli (Periodiq-CLI) command pq pack <src> <dest>
Sadly, this is not even remotely working well enough to actually be fun at the moment. Not sure if I'm going to keep it up - packing up extensions isn't that useful anyway, even tho I _really_ liked the idea at first.



#### Creating / Designing Themes

editme



### Exporting to another Device/OS

soon(tm)



## Periodiq-CLI
(not yet released)

    $ npm install -g pq-cli
    $ pq --v
    Periodiq-CLI v0.1.5



## FAQ

## Version History

    n.y.r
