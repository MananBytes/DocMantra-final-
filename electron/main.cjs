const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 1000,
        minHeight: 650,
        // autoHideMenuBar hides the default Windows File/Edit/View menu for a modern software look
        MenuBae: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    //Determine if we are coding (development) or running the final .exe (production)
    const isDev = process.env.NODE_ENV == 'development';

    if (isDev) {
        //loads live React code while programming
        mainWindow.loadURL('http://localhost:5173');
    } else {
        //loads packaged files for the final .exe
        mainWindow.loadFile(path.join(__dirname, '../dist/index,html'));
    }
}

//opens the window only after electron is fully booted up
app.whenReady().then(createWindow);

//Quits software completely when the user clicks the X

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});