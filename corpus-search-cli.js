const path = require('path');
const fs = require('fs');

// Singleton for state during async operations
const TFReport = {};

// Check for arguments
// Directory of docs should always be the first arg
if(process.argv.length <= 2) {
  console.log('Please include arguments to this script');
  process.exit(-1);
}

// Create absolute path to directory
const dirPath = path.resolve(process.argv[2]);

// Generate array of words passed as args
const words = process.argv.slice(3);

// Read files list from directory path
fs.readdir(dirPath, (err, files) => {
  if(err) {
    console.log('Error with directory read - make sure to provide a directory', err);
    process.exit(-1);
  }

  // Generate state structure via files found
  files.forEach(file => {
    TFReport[file] = {terms: {}, finished: false};
    words.forEach(word => TFReport[file].terms[word] = 0)
  });

  // Create new array with absolute file paths and names
  // then pass into readFiles()
  const filesArr = files.map(file => ({fullPath: `${dirPath}/${file}`, fileName: file}));
  readFiles(filesArr);
});

function readFiles(filesArr) {
  if(!Array.isArray(filesArr)) {
    console.log('Cannot read from non-array of file paths');
    process.exit(-1);
  }

  filesArr.forEach(filePath => {
    fs.readFile(filePath.fullPath, 'utf8', (err, contents) => {
      if(err) {
        console.log('Error with file read', err);
        process.exit(-1);
      }

      const contentsFlattened = contents.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '').toLowerCase().split(' ');
      TFReport[filePath.fileName].docLength = contentsFlattened.length;

      countTerms(contentsFlattened, filePath);
    });
  });
}

function countTerms(contentsFlattened, filePath) {
  contentsFlattened.forEach(content => {
    words.forEach(word => {
      if(word === content) {
        TFReport[filePath.fileName].terms[word] += 1;
      }
    });
  });

  TFReport[filePath.fileName].finished = true;
  checkComplete();
}

function checkComplete() {
  let complete = true;
  Object.keys(TFReport).forEach(key => {
    const doc = TFReport[key];
    if(!doc.finished) {
      complete = false;
    }
  });

  if(complete) {
    scoreSearch();
  }
}

function scoreSearch() {
  const results = {};
  words.forEach(word => {
    Object.keys(TFReport).forEach(key => {
      const doc = TFReport[key];
      const termCount = doc.terms[word];
      const score = termCount / doc.docLength;
      if(results[word]) {
        if(results[word].score < termCount) {
          results[word] = {
            score,
            file: key,
          }
        }
      } else {
        results[word] = {
          score,
          file: key,
        }
      }
    });
  });

  console.log(JSON.stringify(results));
}
