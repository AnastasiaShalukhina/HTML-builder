const fsProm = require('fs/promises');
const path = require('path');
const pathToFolderCopyFrom = path.join(__dirname, 'files');
const pathToFolderCopyTo = path.join(__dirname, 'files-copy');


async function copyDirectory() {
  try {
    const folderDeletion = await fsProm.rm(pathToFolderCopyTo, {recursive: true, force: true});
    const newFolder = await fsProm.mkdir(pathToFolderCopyTo, {recursive: true}); // path for files to copy
    const filesData = await fsProm.readdir(pathToFolderCopyFrom);
  
    filesData.forEach((file) => {
    fsProm.copyFile(path.join(pathToFolderCopyFrom, file), path.join(pathToFolderCopyTo, file));
  })
  }
  catch(error) {
    console.log('error in 4 task');
  }
};
copyDirectory();
