import {app, BrowserWindow, screen, dialog} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
// const { autoUpdater } = require("electron-updater");
import { autoUpdater } from "electron-updater";
import logger from 'electron-log';
logger.transports.file.resolvePath = () => path.join('./app', 'logs/main.log');
logger.log("Application version: " + app.getVersion());
let win: BrowserWindow = null;
let flagUpdateAvailable = false;
let myInterval;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');


autoUpdater.setFeedURL({
  provider: 'github',
  protocol: "https",
  repo: 'dms-a',
  owner: 'amddogy',
  private: false,
  token: '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'
});
autoUpdater.autoDownload = false;

function createWindow(): BrowserWindow {
  const size = screen.getPrimaryDisplay().workAreaSize;
  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
      contextIsolation: false,  // false if you want to run e2e test with Spectron
      // webSecurity: false
    },
  });
  logger.log('createWindow');
  win.maximize();
  // win.webContents.openDevTools()
  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
       // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }
    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 1000));
  myInterval = setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 1000 * 30);
  // 1000 * 60 * 10

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

autoUpdater.on('update-available', () => {
  logger.info('update-available; downloading...');
  clearInterval(myInterval);
  if(!flagUpdateAvailable){
    flagUpdateAvailable = true;
    autoUpdater.downloadUpdate();
  }

  // if(!flagUpdateAvailable){
  //   dialog.showMessageBox({
  //     type: 'info',
  //     buttons: ['Ок'],
  //     title: 'Налична актуализация',
  //     message: 'Налична актуализация',
  //     detail: 'Започна изтегляне на нова версия. Приложението ще се рестартира, за да се инсталира актуализацията.',
  //   }).then((val) => {
  //     autoUpdater.downloadUpdate();
  //     flagUpdateAvailable = true;
  //   });
  // }
});

autoUpdater.on('checking-for-update', () => {
  logger.info('checking-for-update');
});

autoUpdater.on('update-not-available', () => {
  logger.info('update-not-available');
  flagUpdateAvailable = false;
});

autoUpdater.on('download-progress', (progressObj) => {
  logger.info('download-progress: ');
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
});

autoUpdater.on('update-downloaded', () => {
  logger.info('update-downloaded');
  dialog.showMessageBox({
    type: 'info',
    buttons: ['Рестарт'],
    title: 'Актуализациите са изтеглени',
    message: 'Актуализациите са изтеглени',
    detail: 'Изтеглена е нова версия. Рестартирайте приложението, за да приложите актуализациите.',
  }).then((val) => {
     autoUpdater.quitAndInstall()
  });
});

autoUpdater.on('error', (err) => {
  logger.info('Error in auto-update: ' +  err);
});

function sendStatusToWindow(text) {
  logger.info(text);
  win.webContents.send('message', text);
}
