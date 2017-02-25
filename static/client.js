/**
 * @class main client side master script */

const {ipcRenderer} = require('electron')

/**
 * */
ipcRenderer.on('update-element', function(event, data) {
    var target = document.getElementById(data.id);
    if (target) target.innerHTML = data.html;
});
