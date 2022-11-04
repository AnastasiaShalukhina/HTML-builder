const fs = require('fs');
const fsProm = require('fs/promises');
const { input, output } = process;
const path = require('path');
const pathToFolder = path.join(__dirname, "secret-folder");


async function showData(pathToFolder) {
  const filesData = await fsProm.readdir(pathToFolder, {withFileTypes: true}); 
  
  filesData.forEach((file) => {
    if(file.isFile()) {
      let nameWithExt = file.name;
      let nameWithoutExt = nameWithExt.split('.')[0];
      let extWithoutDot = path.extname(nameWithExt).slice(1);
      // let sizeFile = 
      fsProm.stat(path.join(pathToFolder, nameWithExt)).then(sizeFile => console.log(`${nameWithoutExt}-${extWithoutDot}-${sizeFile.size}`));
    };
  })
};
showData(pathToFolder);
