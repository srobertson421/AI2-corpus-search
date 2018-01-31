# AI2-corpus-search
Term frequency search for use with a corpus of text documents

## CLI Tool

### Installation
Both the module and cli version of this tool utilize `node` as a runtime. Be sure to have `node` v7 or above installed. You can install node from this the Node.js site: [Node](https://nodejs.org/en/). There are also versions available via `apt-get` on Ubuntu and `brew` on Mac OS. Be sure to install `npm` as well.

### Usage
To use the cli tool, located in the `corpus-search-cli.js` file, run the following command. Note this command will be using the `samples/` directory, but can be swapped out to use any other directory containing text files.
```
node corpus-search-cli.js ./samples sea whale queequeg
```
The first argument to the cli tool is the directory containing your text files. This can have as many text files located in it as you'd like. The subsequent arguments are the terms to search for. You can pass in as many terms as you like, separated by spaces.

The output of the cli tool should reflect this JSON structure where the key is the term and the value is an object containing the TF score and the filename that had that score:

```
{
  "sea": {
    "score": 0.0040871934604905,
    "file": "mobydick-chapter5.txt"
  },
  "whale": {
    "score": 0.00052056220718376,
    "file": "mobydick-chapter3.txt"
  },
  "queequeg": {
    "score": 0.0040871934604905,
    "file": "mobydick-chapter5.txt"
  }
}
```

## Web Application

### Installation
To run the Node/Express/React web application you need to install the dependencies listed in `package.json` using the command:
```
npm install
```

### Usage
Run `npm start` to run the server in development mode. Then open a web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the React front-end. You may use the search bar to search the `samples/` directory with as many terms as you'd like, separated by commas.

The results of the search should show below the search field. Each result will contain the word, the TF score, and the filename which had that score. The results are also links that when clicked will open a new tab showing the scored text file.
