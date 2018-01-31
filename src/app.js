import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Search from './components/Search';
import ResultList from './components/ResultList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: {},
    }

    this.handleSearchResults = this.handleSearchResults.bind(this);
  }

  handleSearchResults(results) {
    this.setState({results});
  }

  render() {
    return (
      <div>
        <h1>AI2 Corpus Search</h1>
        <Search handleSearchResults={this.handleSearchResults} />
        <ResultList results={this.state.results} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
