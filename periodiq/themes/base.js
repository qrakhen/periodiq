const List = require('sygtools').List;

class Theme {
    constructor(key) {
        this.key = key;
        this.styles = new List();
    }

    addStyle(style) {
        this.styles.add(style);
        return this;
    }

    getStyle(key) {
        return this.styles.findOne('key', key);
    }

    apply(element) {
        if (element.body === null || element.body === undefined)
            return;

        this.styles.step(function(s) {
            s.targetRules.step(function(t) {
                element.body.styleRules.step(function(r) {
                    /* Styles apply if they're exactly matching with a rule,
                     * of if they present a part of a rule string,
                     * using ':' as wildcard (i.e. :etRule) */
                     var _t = t;
                     if (t.charAt(0) === ':')
                        _t = _t.slice(1);

                     if ((_t === r) || (r.endsWith(_t)))
                        s.apply(element);
                });
            });
        });
        return this;
    }
};

class Style {
    constructor(key, data, targetRules) {
        this.key = key;
        this.data = data;
        this.targetRules = new List(null, targetRules);
    }

    setStyle(data) {
        this.style = data;
        return this;
    }

    addTarget(targetRules) {
        this.targetRules.add(targetRules);
        return this;
    }

    apply(element) {
        for(var i in this.data)
            element.body.style[i] = this.data[i];
        return this;
    }
};

module.exports.Theme = Theme;
module.exports.Style = Style;
