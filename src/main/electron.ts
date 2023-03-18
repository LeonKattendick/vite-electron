import { app, BrowserWindow } from 'electron';
import { join } from 'node:path';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const DIST_ELECTRON = join(__dirname, '..');
const DIST = join(DIST_ELECTRON, './dist');

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
  else mainWindow.loadFile(join(DIST, 'index.html'));
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
