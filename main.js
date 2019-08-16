const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

app.on('ready', function(){
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol:'file:',
    slashes: true
  }));
  //---------------------------------------------QUIT ALL WINOWS IN APP-------------------------------------------------------------
  mainWindow.on('closed', function(){
    app.quit();
  });
 

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

// ---------------------------------START A NEW EXTRA WINDOW FOR THE BUTTON IN THE SUBMENU OF 'FILE' / 'somethingMeaningFull' ------
// click(){ createAddWindow();
function createAddwindow() {
  addWindow = new BrowserWindow({
    width: 300 ,
    height: 200,
    title: 'something'
  });
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol:'file:',
    slashes: true
  }));
  // --------------------------------------------------------Garbage collection fix----------------------------------------------------
  addWindow.on('close'), function(){
    addWindow = null;
  }
}
// --------------------------------------mainMenuTemplate----------------------------------------------------------------------------
const mainMenuTemplate = [
  {
    label:'file', 
    submenu: [
      {
        label: 'somethingMeaningFull',
        // click is when the mouse clicks on the button, in this case its the button with the name abow this line.
        click(){
          createAddwindow();
        }
      },
      {
        label: 'stillTestingPurpeses'
      },
      {
        label: 'Quit',
        // this is a ternary operator | this '?' represent or | this ':' represtent if statement
        accelerator: process.platform == 'darwin' ? 'Command+Q' :
        'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

//  ------------------------------ if run on mac, add empty object to Menu--------------------------------------------
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// ADD DEVTOOLS IF NOT IN PRODUCTION---------------Unluck DevTools with  Ctrl + I     ---------------------------
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' :
        'ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toogleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}