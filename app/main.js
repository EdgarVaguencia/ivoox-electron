var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('window-all-closed', function() {

  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {

  mainWindow = new BrowserWindow({width: 1130, 'min-height': 450, center: true, frame: true, 'dark-theme': true, title: 'iVooxNode app', icon: 'file://' + __dirname + '/media/canalivoox.jpeg'});

  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // mainWindow.setMenu(null);

  // mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
