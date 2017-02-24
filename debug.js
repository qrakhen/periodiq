var fs = require('fs');
var colors = require('colors');

var Debug = function() {
    var argIndex = process.argv.indexOf('--debug');
    var argLevel = parseInt(process.argv[argIndex + 1]);
    if (argLevel > 0) console.log('  pq.debugger loaded with logLevel ' + argLevel);
    this.logLevel = argLevel || 0;
    this.writeToFile = (this.logLevel > -1);
    this.logFile = __dirname + '/log/log_'
        + new Date().getHours() + '_'
        + new Date().getMinutes() + '.txt';

    this.__log = function(anything, logLevel) {
        var logLevel = logLevel || 0; // Only log important stuff by default
        if (this.logLevel < logLevel)
            return;

        var date = new Date(),
            //prefix = '[' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ']:[' + logLevel + ']' + (typeof anything === 'string' ? '' : '(' + typeof anything + ') ');
            prefix = '  [PQDBG(' + logLevel + ')] >';
        console.log(prefix, anything);
        if (this.writeToFile) fs.appendFile(this.logFile, prefix + ' ' + anything + '\r\n', (err) => {
            if (err) console.log('debug could not write to file: ' + err);
        });
    };

    this.log = function(anything, logLevel) {
        return this.__log('LOG: '.cyan + anything, logLevel);
    };

    this.success = function(anything, logLevel) {
        return this.__log('SUCCESS: '.green + anything, logLevel);
    };

    this.fail = function(anything, logLevel) {
        return this.__log('FAIL: '.yellow + anything, logLevel);
    };

    this.error = function(anything, logLevel) {
        return this.__log('!ERROR: '.red + anything, logLevel);
    };

    this.warn = function(anything, logLevel) {
        return this.__log('WARN: '.yellow + anything, logLevel);
    };
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
