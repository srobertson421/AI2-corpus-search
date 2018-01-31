const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require('./webpack.config.js');
const app = express();
const compiler = webpack(config);

const searchCorpus = require('./corpus-search-module');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/search', (req, res) => {
  const { searchTerms } = req.body;
  if(Array.isArray(searchTerms)) {
    searchCorpus(searchTerms, (results) => {
      res.json(results);
    });
  } else {
    res.send('Not an array');
  }
});

app.get('/document/:docName', (req, res) => {
  res.sendFile(path.join(__dirname, 'samples', req.params.docName));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
