const { app, BrowserWindow, Menu } = require('electron');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1080,
    // 24=バーの幅
    height: 720 + 24,
    title: 'さんばんにんきのくすりばこ',
    autoHideMenuBar: true,
  });
  mainWindow.resizable = true

  mainWindow.loadFile('index.html');
};

const template = Menu.buildFromTemplate([
  {
    label: "File",
    submenu: [
      { role: 'close', label: 'Close this window' }
    ]
  },
])

// メニューを適用する
Menu.setApplicationMenu(template);

app.once('ready', () => {
  createWindow();
});

app.once('window-all-closed', () => app.quit());