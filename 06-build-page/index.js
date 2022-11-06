const fs = require('fs');
const fsProm = require('fs/promises');
const path = require('path');
const templatePath = path.join(__dirname, 'template.html')
const pathToFolderWithHtml = path.join(__dirname, 'components');
const pathToIndexHtml = path.join(__dirname, 'project-dist', 'index.html')
const pathToFolderWithCss = path.join(__dirname, 'styles');
const pathToStyleCss = path.join(__dirname, 'project-dist', 'style.css')

async function createLanding() {
  
  try {
    const projectDistDeletion = await fsProm.rm(path.join(__dirname, 'project-dist'), {recursive: true, force: true});
    // html
    let templateContent = await fsProm.readFile(templatePath, { encoding: 'utf8' }); // read of template file
    const projectDist = await fsProm.mkdir(path.join(__dirname, 'project-dist')); // creation of folder pr-dist
    const htmlData = await fsProm.readdir(pathToFolderWithHtml); // all html files from components 

    htmlData.forEach(async (file) => {
      let nameWithoutExt = file.split('.')[0]; // names without extentions
      let htmlPart = await fsProm.readFile(path.join(pathToFolderWithHtml, file), 'utf-8'); // read of each component
      templateContent = templateContent.replace(`{{${nameWithoutExt}}}`, htmlPart); // replace of tags
      let creationIndexHtml = await fsProm.writeFile(pathToIndexHtml, templateContent); // fullfill of index.html
    });
    
    // carrying styles to css
    const cssData = await fsProm.readdir(pathToFolderWithCss); // all css files from styles folder
    cssData.forEach( async (file) => {
      let fileCssContent = await fsProm.readFile(path.join(pathToFolderWithCss, file), { encoding: 'utf8' });
      let styleCssFullFillment = await fsProm.appendFile(pathToStyleCss, fileCssContent);
    })
  }
  
  catch(error) {
    console.log('error in sixth task')
  }
}
createLanding();