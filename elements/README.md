  periodiq.
=============

### Elements

The Element System is the heart of **periodiq**.
We also like to call it the `Periodiq table of Elements` :)
Some day, there will be something in this section.
Just not today.

#### Element Creation

Creating custom Elements is kept simple and comes with only 3 requirements:
 - Each Element needs its own folder, somewhere within your project.
 - Each Element Folder needs exactly one 'element.js' file.
 - The element.js file has to return a class definition, while extending any other Element class.

We recommend reading the [Documentation](http://docs.periodiq.org) for closer information.

    // element.js - example
    var Element = require('periodiq').Element.Base;

    class MyCustomElement extends Element {
        constructor() {
            super();
        }
    }

    modules.exports = MyCustomElement;

#### Importing external/custom Elements

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
