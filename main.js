const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;
let mainWindow;

exports.execProcess = (process, callback) => {
  const { exec } = require('child_process');
  const callExec = exec(process)

  callExec.stdout.on('data', function(data){
    callback(data)
  })
  callExec.stderr.on('data', function(data){
    callback("<b>ERROR:</b> \n" + data)
  })
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    
    // Caracteristicas visuais da janela
    // autoHideMenuBar: true,
    // titleBarStyle: 'customButtonsOnHover',
    useContentSize: false, // Inibe mostragem de dimensao da janela

    webPreferences: {
      nodeIntegration: true
    }
  });
  //mainWindow.removeMenu();

  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.resolve(__dirname, '..', 'build', 'index.html')}`,
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});