const fs = require('fs');
const fsProm = require('fs/promises');
const path = require('path');
const pathToFolderWithHtml = path.join(__dirname, 'project-dist');
const pathToFolderWithStyles = path.join(__dirname, 'styles');
const pathToDeleteBundle = path.join(__dirname, 'project-dist', 'bundle.css')

async function bundleStyles() {
  try {
    const filesData = await fsProm.readdir(pathToFolderWithHtml);
    let fileNamesArr = [];
    filesData.forEach((file) => {
      fileNamesArr.push(file);
    })
    if (fileNamesArr.includes('bundle.css')) {
      const bundleDeletion = await fsProm.unlink(pathToDeleteBundle)
    }

    const filesCssData = await fsProm.readdir(pathToFolderWithStyles);
    const filteredFilesCssData = filesCssData.filter(file => file.slice(-4) === '.css');
    filteredFilesCssData.forEach((file) => {
      const streamRead = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');
      let data = '';
      streamRead.on('data', chunk => { data += chunk } );
      streamRead.on('end', () => {
      fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, (error) => {
        if (error) {
          throw error;
        }
        
      })
    });
    })
  }
  catch(error) {
    console.log('error in 5 task');
  }
}
bundleStyles()