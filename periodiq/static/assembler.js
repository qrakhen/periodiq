/* @todo if dev */
/* @todo von außen ansteuerbar */

const fs = require('fs');
const pq = require(__dirname + '/../loader.js');
const BUILD_DIR = __dirname + '/../build/';

var Assembler = function() {

    this.buildElementStyles = function(elementDir, namespace) {
        var outputFilePath = BUILD_DIR + 'styles/elements.' + namespace + '.css';
        fs.unlink(outputFilePath, function(err) {
            if (err) console.log(err)
            var elements = pq.loadElementDir(elementDir, namespace);

            var stack = '';
            for (var e in elements) {
                var __class = elements[e];
                var file = __class.__BASE_DIR + '/element.css';
                if (!fs.existsSync(file))
                    continue;

                var content = fs.readFileSync(file, { encoding: 'UTF8' });
                content = content.replace(/\t/g, '').replace(/\n/g, '');
                content = content.replace(/.element/g, ' .' + __class.__NAMESPACE + '_' + __class.__CLASS_NAME);
                stack += content + '\r\n';
            }

            fs.writeFile(outputFilePath, stack, function(err) {
                if (err) console.log(err);
                console.log('done');
            });
        });
    }
}

module.exports = new Assembler();
