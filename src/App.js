import React from 'react';
import './App.css';
import MultiSlider from './components/MultiSlider';

function App() {
  const [state, setState] = React.useState({
    alpha: 0.1,
    beta: 0.2,
    gamma: 0.3,
    delta: 0.2,
    epsilon: 0.1,
    zeta: 0.1,
  });

  const handleOnChange = (key, value) => {
    const potentialState = {...state, [key]: value};
    const total = Object.values(potentialState).reduce(
      (total, current) => (total += current),
      0,
    );

    // prevent the total from exceeding 100%
    let adjustment = 0;
    if (total > 1) {
      adjustment = total - 1;
    }

    // eliminate any trailing digits from float weirdness
    const rounded = Math.round((value - adjustment) * 100 + Number.EPSILON) / 100;
    setState({...state, [key]: rounded});
  };

  return (
    <div className="App">
      <MultiSlider data={state} onChange={handleOnChange} />
    </div>
  );
}

export default App;
