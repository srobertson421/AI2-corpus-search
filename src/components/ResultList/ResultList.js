import React from 'react';

import ResultListItem from '../ResultListItem';

function renderResults(results) {
  return Object.keys(results).map(key => {
    const result = results[key];
    return <ResultListItem key={key} result={result} />
  });
}

const ResultList = props => {
  const { results } = props;

  return (
    <div>
      { renderResults(results) }
    </div>
  );
}

export default ResultList;
