const path = require('path');
const fs = require('fs');

let TFReport = {};

// Check for arguments
if(process.argv.length <= 2) {
  console.log('Please include arguments to this script');
  process.exit(-1);
}

const dirPath = path.resolve(process.argv[2]);
const words = process.argv.slice(3);

fs.readdir(dirPath, (err, files) => {
  if(err) {
    console.log('Error with directory read', err);
    process.exit(-1);
  }

  files.forEach(file => {
    TFReport[file] = {};
    TFReport[file].terms = {};
    words.forEach(word => TFReport[file].terms[word] = 0)
  });

  const fullPathFiles = files.map(file => ({fullPath: `${dirPath}/${file}`, fileName: file}));
  readFiles(fullPathFiles);
});

function readFiles(fullPathFiles) {
  if(!Array.isArray(fullPathFiles)) {
    console.log('Cannot read from non-array of file paths');
    process.exit(-1);
  }

  fullPathFiles.forEach(filePath => {
    fs.readFile(filePath.fullPath, 'utf8', (err, contents) => {
      if(err) {
        console.log('Error with file read', err);
        process.exit(-1);
      }

      const contentsNormalized = contents.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '').toLowerCase().split(' ');

      contentsNormalized.forEach(content => {
        words.forEach(word => {
          if(word === content) {
            TFReport[filePath.fileName].terms[word] += 1;
            console.log(`Increased ${filePath.fileName} - ${word}`, TFReport[filePath.fileName].terms[word]);
          }
        });
      });

      console.log(`Finished ${filePath.fileName}`, TFReport[filePath.fileName]);
    });
  })
}
