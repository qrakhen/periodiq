const __BASE = require('../element.js');
const __TYPE = 'btn';

const Tag = require('../../content/tag/element.js');

class __CLASS extends __BASE {
    constructor() {
        super();
        this.TYPE = this.getExtendedType(__TYPE);
        this.content = 'btn';
        this.setSize(72, 24);
        this.setColor('#727272');
        var script = new Tag('script', null, "var a = 5; var b = 7; console.log(a+b);");
        script.attach(this);
    }
}

module.exports = __CLASS;
