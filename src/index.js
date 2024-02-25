const { app, BrowserWindow,ipcMain,dialog } = require('electron');
const vision = require('@google-cloud/vision');
const path = require('path');
ipcMain.on('m',(Event,arg)=>
{
  dialog.showOpenDialog(wi, {
    buttonLabel:'select Image',
   defaultPath:app.getPath('home'),
   properties:['multiSelections','showHiddenFiles','createDirectory'],
   filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
  }).then(result => {
    console.log(result.canceled)//show if canceled
    console.log(result.filePaths)//print path in ternminal
  }).catch(err => {
    console.log(err)//print error if there
  })
}
)
app.on('ready',()=>
{
  createWindow();
});
 function createWindow() 
{
  wi = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, 
    }
  });
  wi.loadFile(path.join(__dirname, 'index.html'));
  wi.webContents.openDevTools();// open console window in browser
};
//this code from google cloud vision  for imge text to editable text  conversion
const client = new vision.ImageAnnotatorClient();
 const fileName = 'result.filePaths';//accessing path of img from dialog method as above 
// Performs text detection on the local file
const [result] = await client.textDetection(fileName);
const detections = result.textAnnotations;
console.log('Text:');
detections.forEach(text => console.log(text));// you can use document.write(text); to print text in browser page