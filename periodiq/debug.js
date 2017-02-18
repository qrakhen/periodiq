var fs = require('fs');

var Debug = function() {
    this.logLevel = 1;
    this.writeToFile = true;
    this.logFile = __dirname + '/log/log_'
        + new Date().getHours() + '_'
        + new Date().getMinutes() + '.txt';

    this.log = function(anything, logLevel) {
        var logLevel = logLevel || 0; // Only log important stuff by default
        if (this.logLevel < logLevel)
            return;

        var date = new Date(),
            prefix = '[' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ']:[' + logLevel + ']' + (typeof anything === 'string' ? '' : '(' + typeof anything + ') ');
        console.log(prefix, anything);
        if (this.writeToFile) fs.appendFile(this.logFile, prefix + ' ' + anything + '\r\n', (err) => {
            if (err) console.log('debug could not write to file: ' + err);
        });
    };
};

module.exports = new Debug();
