import React from 'react';

const ResultBox = ({ tripPlan }) => {
  // Simple check for whether the tripPlan is available
  if (!tripPlan) {
    return <div>Loading trip plan...</div>;  // or handle the absence of tripPlan in a different way
  }

  // Assuming tripPlan is an object with some properties to display
  return (
    <div className="result-box">
      <h2>Your Trip Plan</h2>
      <ul>
        <li> {tripPlan}</li>
      </ul>
    </div>
  );
};

export default ResultBox;
