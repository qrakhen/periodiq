console.log('core.client.js');

//http://stackoverflow.com/questions/32780726/how-to-access-dom-elements-in-electron
//http://electron.atom.io/docs/api/remote/

var remote = require('electron').remote;
var pq = remote.require('./periodiq/loader.js');
console.log(pq);
