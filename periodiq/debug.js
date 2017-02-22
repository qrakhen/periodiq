var fs = require('fs');

var Debug = function() {
    this.logLevel = 3;
    this.writeToFile = true;
    this.logFile = __dirname + '/log/log_'
        + new Date().getHours() + '_'
        + new Date().getMinutes() + '.txt';

    this.log = function(anything, logLevel) {
        var logLevel = logLevel || 0; // Only log important stuff by default
        if (this.logLevel < logLevel)
            return;

        var date = new Date(),
            //prefix = '[' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ']:[' + logLevel + ']' + (typeof anything === 'string' ? '' : '(' + typeof anything + ') ');
            prefix = '  [PQDBG(' + logLevel + ')] > ';
        console.log(prefix, anything);
        if (this.writeToFile) fs.appendFile(this.logFile, prefix + ' ' + anything + '\r\n', (err) => {
            if (err) console.log('debug could not write to file: ' + err);
        });
    };

    this.success = function(anything, logLevel) {
        return this.log('SUCCESS: ' + anything, logLevel);
    }

    this.fail = function(anything, logLevel) {
        return this.log('FAIL: ' + anything, logLevel);
    }

    this.error = function(anything, logLevel) {
        return this.log('!ERROR: ' + anything, logLevel);
    }

    this.warn = function(anything, logLevel) {
        return this.log('WARN: ' + anything, logLevel);
    }
};

Debug.LOG_LEVEL = {
    SILENT: -1,
    PRODUCTIVE: 0,
    LESS_PRODUCTIVE: 1,
    ALMOST_DEBUGGING: 2,
    DEBUGGING: 3,
    VERBOSE: 4,
    KILL_MY_RAM: 5
};

module.exports = new Debug();
