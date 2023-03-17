import { app, BrowserWindow } from 'electron';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export let mainWindow: BrowserWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minHeight: 720,
    minWidth: 1280,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
    title: 'vite-electron',
    show: false
  });
  mainWindow.show();

  if (IS_DEVELOPMENT) mainWindow.loadURL('http://localhost:5173/');
  else mainWindow.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
