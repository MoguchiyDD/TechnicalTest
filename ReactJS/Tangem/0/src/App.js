import React from 'react';
import { SurpriseTop, SurpriseBottom } from './components/surprise/Surprise';
import './style/scss/global.scss';
import './style/scss/surprise/surprise.scss';

function App() {
  const surpriseDiscount = "10%OFF";
  const surpriseCode = "10FRIDAY";

  return (
    <div className="surprise">
      <SurpriseTop discount={surpriseDiscount} code={surpriseCode} />
      <SurpriseBottom discount={surpriseDiscount} code={surpriseCode} />
    </div>
  );
}

export default App;
