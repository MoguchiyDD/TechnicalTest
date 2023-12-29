import './style/scss/global.scss';
import './style/scss/surprise.scss';
import { SurpriseTop } from './components/surprise/Surprise';

function App() {
  return (
    <SurpriseTop startData="24" endData="27" discount="10%OFF" code="10FRIDAY" />
  );
}

export default App;
