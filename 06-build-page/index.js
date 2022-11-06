const fs = require('fs');
const fsProm = require('fs/promises');
const path = require('path');
const templatePath = path.join(__dirname, 'template.html')
const pathToFolderWithHtml = path.join(__dirname, 'components');
const pathToIndexHtml = path.join(__dirname, 'project-dist', 'index.html')

async function createLanding() {
  
  try {
    const projectDistDeletion = await fsProm.rm(path.join(__dirname, 'project-dist'), {recursive: true, force: true});
    
    let templateContent = await fsProm.readFile(templatePath, { encoding: 'utf8' });
    const projectDist = await fsProm.mkdir(path.join(__dirname, 'project-dist'));
    
    const htmlData = await fsProm.readdir(pathToFolderWithHtml);

    htmlData.forEach(async (file) => {
      
      let nameWithoutExt = file.split('.')[0];
      let htmlPart = await fsProm.readFile(path.join(pathToFolderWithHtml, file), 'utf-8');
      templateContent = templateContent.replace(`{{${nameWithoutExt}}}`, htmlPart);
      let creationIndexHtml = await fsProm.writeFile(pathToIndexHtml, templateContent);
      
    });
    
    
    
  }
  
  catch(error) {
    console.log('error in sixth task')
  }
}
createLanding();