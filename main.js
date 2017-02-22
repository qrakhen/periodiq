/***
 *
 * PeriodiQ SandBox - InDev Module is located at ./periodiq/
 *
 **/

const url = require('url');
const Path = require('path');
const List = require('sygtools').List;
const Electron = require('electron');
const Debug = require('./periodiq/debug.js');
const Periodiq = require('./periodiq/loader.js');
const Element = Periodiq.Element;
const Render = Periodiq.Render;
const Core = Periodiq.Core;
const ThemePicker = require('./periodiq/theme/picker.js');
//const CustomElement = Periodiq.loadElementDir(Path.join(__dirname + '/elements/'));

Core.launch(Electron, new Element.Root('pq-demo', 1280, 960), {}, function() {
    var theme = ThemePicker.loadTheme('default');
    Core.root.setColor(theme.colors.background).setTextColor(theme.colors.text.main);
    var spacer = new Element.LayoutSpacer().attach(Core.root);
    var content = new Element.LayoutContainer().attach(Core.root)
        .learnStyle('text-align', 'center')
        .learnStyle('border-bottom', '2px solid ' + theme.colors.accent)
        .setColor(theme.colors.layer);
    var wrapper = new Element.LayoutWrapper()
        .attach(content)
        .center();
    var headline = new Element.ContentHeadline('periodiq.').attach(wrapper).center();
    var spacer2  = new Element.LayoutSpacer().attach(wrapper);
    var button = new Element.ActionButton().attach(wrapper).setMargin(0, 0, 30, 0);
    var dropdown = new Element.NavigationDropdown('sers').attach(wrapper)
        .addMenuEntry('menui1')
        .addMenuEntry('menui2')
        .addMenuEntry('leberkaese');
    /*var grid = new Element.LayoutGrid(12).attach(wrapper).setColor('#141414')
        .appendToGrid(new Element.Base().setSize(32, 240).setColor('#726432'), 2)
        .appendToGrid(new Element.Base().setSize(32, 240).setColor('#364f1c'), 3)
        .appendToGrid(new Element.Base().setSize(32, 240).setColor('#9a3053'), 4)
        .appendToGrid(new Element.Base().setSize(32, 120).setColor('#04f892'), 3);*/

    content.attach(Core.root);
    Render.buildView(Core.root, function(viewFile) {
        Core.setView(viewFile);
    });
});
