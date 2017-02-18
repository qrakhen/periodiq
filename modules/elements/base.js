var Base = function(x, y, w, h) {
    this.body = {
        x: x || 0,
        y: y || 0,
        w: w || 0,
        h: h || 0 };
    this.parent = {};
    this.children = [];
};

Base.prototype = {
    attach: function(elements) {
        var self = this;
        elements.forEach(function() {
            this.parent = self;
            self.children.push(this);
        });
    }
};

exports = Base;
