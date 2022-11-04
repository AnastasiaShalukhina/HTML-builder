async function keepTalking() {
  try {
    const fs = require('fs');
    const path = require('path');
    const { stdin: input, stdout: output, stdout } = require('process'); 
    const readline = require('readline');
    const write = fs.createWriteStream(path.join(__dirname, 'destination.txt'));
    const rl = readline.createInterface({ input, output });
    process.on('exit', () => {
        console.log("Удачи в кросс-чеке!");
    });
    stdout.write('Тяженько в RS учится? ')

    rl.on('line', answer => {
      
      if(answer.trim() !== "exit") {
        write.write(answer + "\n");
      } else {
        rl.close();
      }
           
    });
  }  
  catch(error) {
    console.log('error in 2 task');
  }
}
keepTalking()