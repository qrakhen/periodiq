const List = require('sygtools').List;

/**
 * Simply extends the AbstractElement class and implements a renderable body.
 * This is where you should derive your custom (and visible) elements from,
 * since the AbstractElement class only provides the absolute basic foundation.
 * @extends AbstractElement */
class BaseElement extends require('../abstract/element.js') {
    constructor() {
        super();
        this.TYPE = 'Element::' + BaseElement.__CLASS_NAME;
        this.body = {
            type: 'el',
            styleRules: new List(),
            style: {
                display: 'block'
        }};
    }

    /**
     * Adds a single rule or an array of rules to this element's rule set.
     * @param {string} rule */
    addStyleRule(rule) {
        this.body.styleRules.add(rule);
        return this;
    }

    /**
     * Removes a single rule or an array of rules to this element's rule set.
     * @param {string} rule */
    removeStyleRule(rule) {
        this.body.styleRules.remove(rule);
        return this;
    }

    /**
     * Overwrites given style value or adds a new one it if didn't exist
     * @param {string} key
     * @param {string} value */
    learnStyle(key, value) {
        this.body.style[key] = value;
        return this;
    }

    /**
     * Forgets (removes) the style with given key
     * @param {string} key */
    forgetStyle(key) {
        this.body.style[key] = null;
        return this;
    }

    /**
     * Sets this element's background color.
     * @param {string} hex */
    setColor(hex) {
        this.learnStyle('background-color', hex);
        return this;
    }

    /**
     * Sets this element's text (content) color.
     * @param {string} hex */
    setTextColor(hex) {
        this.learnStyle('color', hex);
        return this;
    }

    /**
     * */
    setSize(width, height, unit) {
        var unit = unit || 'px';
        this.learnStyle('width', (width === 'auto' ? width : width + unit))
            .learnStyle('height', (height === 'auto' ? height : height + unit));
        return this;
    }

    /**
     * Sets this element's position property to either relative (true) or absolute (false)
     * @param {boolean} state true sets position: relative, false sets position: absolute. default true; */
    setRelative(state) {
        if (state === undefined) state = true;
        var pos = (state === true ? 'relative' : 'absolute' );
        this.learnStyle('position', pos);
        return this;
    }

    /**
     * Sets the position of this element for each side.
     * @param {string} unit Unit to be used, px per default. */
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

    /**
     * Sets the margin for each side, auto if none given.
     * @param {string} unit Unit to be used, px per default. */
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

    getFullType(type) {
        type = type || '';
        return super.getFullType(this.TYPE + ' ' + type);
    }
}

module.exports = BaseElement;
