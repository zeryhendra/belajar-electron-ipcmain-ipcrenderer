// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')

var mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      enableRemoteModule: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })


  mainWindow.loadFile('index.html')

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

/* ipcMain */
ipcMain.on('button-main', async (event, args) => {
  let ret = await dialog.showOpenDialog({
    properties: [
      'multiSelections'
    ]
  });

  console.log(ret.filePaths);
});

/* ipcRenderer */
ipcMain.on('btn-renderer', async (event, args) => {
  let ret = await dialog.showOpenDialog({
    properties: ['multiSelections']
  });

  event.reply('mainToRenderer', ret.filePaths);
})

