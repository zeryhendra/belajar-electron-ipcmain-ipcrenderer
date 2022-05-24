const {
    ipcRenderer, ipcMain
} = require('electron');


/* ipcRenderer (renderer.js) -> ipcMain (main.js) */
document.querySelector("#btn-main").addEventListener('click', ()=>{
    ipcRenderer.send('button-main');
});


/* ipcRenderer (renderer.js) -> ipcMain (main.js) -> ipcRenderer (renderer.js) */
// sending to main.js
document.querySelector('#btn-renderer').addEventListener('click', function () {
    ipcRenderer.send('btn-renderer');
});

// getting from main.js
ipcRenderer.on('mainToRenderer', (event, args) => {
    alert(args);
})