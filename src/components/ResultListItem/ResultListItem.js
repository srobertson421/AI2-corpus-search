import React from 'react';

const ResultListItem = ({ result }) => (
  <div>
    <h3><a href={`/document/${result.file}`} target="_blank">{result.file} - TF Score: {result.score}</a></h3>
  </div>
)

export default ResultListItem
