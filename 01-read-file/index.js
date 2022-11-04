async function readData() {
  try {
    const fs = require('fs');
    const path = require('path');
    const streamRead = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
    let data = '';
    streamRead.on('data', chunk => { data += chunk } );
    streamRead.on('end', () => {
    console.log(data);
});
  }
  catch(error) {
    console.log('error in 1 task');
  }
}
readData()



