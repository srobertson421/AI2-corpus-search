import React from 'react';

const ResultListItem = ({ result, docName }) => (
  <div>
    <h3><a href={`/document/${result.file}`} target="_blank">{docName}: {result.file} - TF Score: {result.score}</a></h3>
  </div>
)

export default ResultListItem
