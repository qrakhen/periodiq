const BaseElement = require('../../../periodiq/elements/base/element.js');
const __TYPE = 'music-footer';

class MusicFooter extends BaseElement {
    constructor() {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.buttons = {
            playPause: null,
            previous: null,
            next: null
        };
        this.body.style = {
            background_color: '#181818',
            margin: 0,
            width: '100%',
            height: '96px',
            position: 'absolute',
            left: 0,
            bottom: 0
        };
    }
}

module.exports = MusicFooter;
