
/**
 * A fixed container that stays glued to a given side */
class FixedContainer extends require('../element.js') {
    /**
     *
     * @param {string} facing [top/right/bottom/left] the direction the container will be facing to
     * @param {string} size width/height depending on orienation as css string */
    constructor(facing, size) {
        super();
        facing = facing || 'bottom';
        size = size || '120px';
        this.learnStyle(facing, 'auto');
        if (facing == 'left' || facing == 'right') this.learnStyle('width', size);
        else this.learnStyle('height', size);
    }
}

module.exports = FixedContainer;
