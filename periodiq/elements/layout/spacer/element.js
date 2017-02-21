


class LayoutSpacerElement extends require('../../base/element.js') {
    constructor(height) {
        super();
        this.body.style = {
            display: 'block',
            width: '100%',
            height: height + 'px'
        }
    }
}
