/**
 * @class main client side master script */

const {ipcRenderer} = require('electron')

/**
 * */
ipcRenderer.on('update-element', function(event, data) {
    console.log('update-element', data);
    var tmpdiv = document.createElement('div'),
        target = document.getElementById(data.id),
        parent = target.parentElement;
    tmpdiv.innerHTML = data.html;
    parent.insertBefore(tmpdiv.childNodes[0], target);
    parent.removeChild(target);
});
