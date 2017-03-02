
/**
 * @extends ContentElement */
class ContentImage extends require('../element.js') {
    constructor(src, w, h) {
        super();
        this.body.type = 'img';
        this.body.attributes.src = src || '';
        if (w) this.learnStyle('width', w);
        if (h) this.learnStyle('height', h);
    }
}

module.exports = ContentImage;
