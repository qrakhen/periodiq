var Render = function() {
    this.buildElement = function(element, recursive, count) {
        var count = count++ || 0,
            recursive = recursive || true,
            content = '';
        Debug.log('building element ' + element.toString() + ' count: ' + count, 2);
        if (recursive) {
            element.children.step(function(e) {
                content += this.buildElement(e, true, count);
            }.bind(this));
        }
        var html = this.createHtmlElement({
                id: element.id,
                type: element.TYPE,
                style: this.buildStyleString(element)},
            content);
        Debug.log('finished element ' + element.toString() + ': ' + html, 2);
        return html;
    };

    this.buildStyleString = function(element) {
        if (!element.active)
            return 'display: none;';

        if (element.body === undefined)
            return '';

        var style = '';
        for (var i in element.body.style) {
            style += ' ' + i + ': ' + element.body.style[i] + ';';
        }

        var brim = '';
        for (var i in element.body.brim) {
            if (element.body.brim[i] > 0 || brim.length > 0)
                brim += ' ' + element.body.brim[i] + 'px';
        }
        if (brim.length > 0) style += ' margin:' + brim + ';';
        return style.trim();
    };

    this.buildDataAttributes = function(element) {

    };

    this.createHtmlElement = function(attributes, content, type) {
        var type = type || 'div',
            html = '<' + type;
        for (var i in attributes) {
            html += ' ' + i + '="' + attributes[i] + '"';
        }
        html += '>' + content + '</' + type + '>';
        return html;
    };
};

module.exports = new Render();
