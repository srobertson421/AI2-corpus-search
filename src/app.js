import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Search from './components/Search';
import ResultList from './components/ResultList';

import 'milligram/dist/milligram.min.css';

import logo from './assets/logo.png';

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
      <div className="container">
        <section className="row">
          <div className="column-25">
            <img src={logo} />
          </div>
          <div className="column-25">
            <h1 style={{marginTop: '6.7rem', marginLeft: '3rem'}}>Corpus Search</h1>
          </div>
        </section>
        <section className="row">
          <div className="column">
            <Search handleSearchResults={this.handleSearchResults} />
          </div>
        </section>
        <section className="row">
          <div className="column">
            <ResultList results={this.state.results} />
          </div>
        </section>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
