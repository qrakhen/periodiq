const List = require('sygtools').List;

/**
 * Simply extends the AbstractElement class and implements a renderable body.
 * This is where you should derive your custom (and visible) elements from,
 * since the AbstractElement class only provides the absolute basic foundation.
 * @extends AbstractElement */
class BaseElement extends require('../abstract/element.js') {
    constructor() {
        super();
        this.body = {
            type: 'el',
            /** Additional CSS classes */
            class: new List(),
            /** HTML Attributes */ 
            attributes: {},
            /** Manually overriding style object */
            style: {}
        }
    }

    /**
     * Adds an additional CSS class next to the static one (i.e. pq_Base)
     * @param {string} rule */
    addClass(cssClass) {
        this.body.class.add(cssClass);
        return this;
    }

    /**
     * Removes given CSS class
     * @param {string} rule */
    removeClass(cssClass) {
        this.body.class.remove(cssClass);
        return this;
    }

    show() {
        this.body.style.display = null;
        return this;
    }

    hide() {
        this.body.style.display = 'none';
        return this;
    }

    /**
     * Overwrites given style value or adds a new one it if didn't exist
     * Also overrides this element's .css file, if given, because learnStyle sets inline styles.
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
     * any param null = unchanged
     * */
    setSize(width, height, unit) {
        if (width !== null) this.learnStyle('width', width);
        if (height !== null) this.learnStyle('height', height);
        return this;
    }

    center() {
        this.body.style.margin_left = 'auto';
        this.body.style.margin_right = 'auto';
        return this;
    }

    /**
     * returns a percentage that results from columns out of total (i.e. 50% when providing 6 and 12)
     * @param {integer} total default 12
     * @todo broken.  */
    getSpan(columns, total, width) {
        var total = total || 12;
        var width = width || 100;
        return parseFloat(((total / columns) * width)) + '%';
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
     * @todo change param == null? dont overwrite
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

    appendUnit(val, unit) {
        if (!val.contains('%') && !val.contains('px'))
            return val + (unit || 'px');
    }
}

module.exports = BaseElement;
