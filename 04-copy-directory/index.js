const fsProm = require('fs/promises');
const path = require('path');
const pathToFolderCopyFrom = path.join(__dirname, 'files');
const pathToFolderCopyTo = path.join(__dirname, 'files-copy');


async function copyDirectory() {
  const folderDeletion = await fsProm.rm(path.join(__dirname, 'files-copy'), {recursive: true, force: true});
  const newFolder = await fsProm.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}); // path for files to copy
  const filesData = await fsProm.readdir(pathToFolderCopyFrom);
  
  filesData.forEach((file) => {
    fsProm.copyFile(path.join(pathToFolderCopyFrom, file), path.join(pathToFolderCopyTo, file));
  })
};
copyDirectory();
