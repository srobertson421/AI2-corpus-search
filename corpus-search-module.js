const path = require('path');
const fs = require('fs');

module.exports = function searchCorpus(termArr, callback) {
  const TFReport = {};

  const dirPath = path.resolve('samples');
  const words = termArr;

  fs.readdir(dirPath, (err, files) => {
    if(err) {
      console.log('Error with directory read - make sure to provide a directory', err);
      process.exit(-1);
    }

    files.forEach(file => {
      TFReport[file] = {terms: {}, finished: false};
      words.forEach(word => TFReport[file].terms[word] = 0)
    });

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

        contentsFlattened.forEach(content => {
          words.forEach(word => {
            if(word === content) {
              TFReport[filePath.fileName].terms[word] += 1;
            }
          });
        });

        TFReport[filePath.fileName].finished = true;
        checkComplete();
      });
    });
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
        if(results[word]) {
          if(results[word].score < termCount) {
            results[word] = {
              score: termCount,
              file: key,
            }
          }
        } else {
          results[word] = {
            score: termCount,
            file: key,
          }
        }
      });
    });

    callback(results);
  }
}
