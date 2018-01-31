import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();

    const searchTerms = [e.target.search.value];

    axios.post('/search', { searchTerms }).then(response => {
      this.props.handleSearchResults(response.data);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSearch}>
        <input type="text" name="search" placeholder="Enter search term" />
        <button type="submit">Search</button>
      </form>
    )
  }
}

export default Search;
