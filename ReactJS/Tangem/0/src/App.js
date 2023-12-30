import './style/scss/global.scss';
import './style/scss/surprise.scss';
import { SurpriseTop, SurpriseBottom } from './components/surprise/Surprise';

function App() {
  const surpriseDiscount = "10%OFF";
  const surpriseCode = "10FRIDAY";
  return (
    <div className="surprise">
      <SurpriseTop startData="24" endData="27" discount={surpriseDiscount} code={surpriseCode} />
      <SurpriseBottom discount={surpriseDiscount} code={surpriseCode} />
    </div>
  );
}

export default App;
