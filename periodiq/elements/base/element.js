const AbstractElement = require('../abstract/element.js');
const List = require('sygtools').List;
const __TYPE = 'base';

/***
 * Simply extends the AbstractElement class and implements a renderable body.
 * This is where you should derive your custom (and visible) elements from,
 * since the AbstractElement class only provides the absolute basic foundation.
 * @class BaseElement */
class BaseElement extends AbstractElement {
    constructor() {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.body = {
            type: 'el',
            styleRules: new List(),
            style: {
                display: 'block'
        }};
    }

    /***
     * Adds a single rule or an array of rules to this element's rule set. */
    addStyleRule(rule) {
        this.body.styleRules.add(rule);
        return this;
    }

    removeStyleRule(rule) {
        this.body.styleRules.remove(rule);
        return this;
    }

    learnStyle(key, value) {
        this.body.style[key] = value;
        return this;
    }

    forgetStyle(key) {
        this.body.style[key] = null;
        return this;
    }



    setSize(width, height) {
        this.learnStyle('width', width).learnStyle('height', height);
        return this;
    }

    /***
     *  state: boolean, true = position: relative; false = position: absolute; default = true;
     **/
    setRelative(state) {
        if (state === undefined) state = true;
        var pos = (state === true ? 'relative' : 'absolute' );
        this.learnStyle('position', pos);
        return this;
    }

    /***
     *
     **/
    setPosition(top, right, bot, left, unit) {
        var unit = unit || 'px';
        if (top !== undefined && top !== null)
            this.learnStyle('top', (top === 'auto' ? top : top + unit));
        if (right !== undefined && right !== null)
            this.learnStyle('right', (right === 'auto' ? right : right + unit));
        if (bot !== undefined && bot !== null)
            this.learnStyle('bottom', (bot === 'auto' ? bot : bot + unit));
        if (left !== undefined && left !== null)
            this.learnStyle('left', (left === 'auto' ? left : left + unit));
        return this;
    }

    /***
     * Exactly used like CSS3 margin: setMargin(16) for 4 sided,
     * setMargin(16, 8) for horizontal and vertical margin, and so forth. */
    setMargin(top, right, bot, left, unit) {
        var unit    = unit      || 'px',
            left    = left      || 'auto',
            top     = top       || 'auto',
            right   = right     || 'auto',
            bot     = bot       || 'auto';
        this.learnStyle('margin',
            top     + (top === 'auto'   ? '' : unit) + ' ' +
            right   + (right === 'auto' ? '' : unit) + ' ' +
            bot     + (bot === 'auto'   ? '' : unit) + ' ' +
            left    + (left === 'auto'  ? '' : unit));
        return this;
    }

    __normalizeLTRBValues(left, top, right, bottom, unit) {
        var unit    = unit      || 'px',
            left    = left      || 'auto',
            top     = top       || 'auto',
            right   = right     || 'auto',
            bottom  = bottom    || 'auto';
    }

    getFullType(type) {
        type = type || '';
        return super.getFullType(this.TYPE + ' ' + type);
    }
}

module.exports = BaseElement;
