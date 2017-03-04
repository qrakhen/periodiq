/* @todo if dev */
/* @todo von außen ansteuerbar */

const fs = require('fs');
const Debug = require('../debug.js');
const BUILD_DIR = __dirname + '/../build/';

var Assembler = function() {

    this.buildElementStyles = function(elements, namespace, theme) {
        if (theme === undefined) theme = require(__dirname + '/picker.js').loadTheme('default');
        var outputFilePath = BUILD_DIR + 'styles/elements.' + namespace + '.css';
        fs.unlink(outputFilePath, function(err) {
            if (err) Debug.log(err, 3);

            var stack = '';
            for (var e in elements) {
                var __class = elements[e];
                var file = __class.__BASE_DIR + '/element.css';
                if (!fs.existsSync(file))
                    continue;

                var content = fs.readFileSync(file, { encoding: 'UTF8' });
                content = content
                    .replace(/(: .*)( )(.*;)/g, '$1&nbsp;$3')
                    .replace(/(.)( )(\.)/g, '$1&nbsp;$3')
                    .replace(/\s/g, '')
                    .replace(/\n/g, '')
                    .replace(/&nbsp;/g, ' ');

                for (var color in theme.colors) {
                    var placeHolder = '\\\$' + color;
                    var regex = new RegExp(placeHolder, 'g');
                    content = content.replace(regex, theme.colors[color]);
                }
                content = content.replace(/.element/g, '.' + __class.__NAMESPACE + '_' + __class.__CLASS_NAME);
                stack += content + '\r\n';
            }

            fs.writeFile(outputFilePath, stack, function(err) {
                if (err) console.log(err);
                Debug.success('build finished: css styles for namespace ' + namespace);
            });
        });
    }
}

module.exports = new Assembler();
