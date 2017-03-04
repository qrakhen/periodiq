
/**
 * @extends ContentElement */
class AbstractImage extends require('../element.js') {
    constructor(src) {
        super();
        this.body.type = 'img';
        this.body.attributes.src = src || '';
    }
}

module.exports = AbstractImage;
