import React from 'react';
import './App.css';
import MultiSlider from './components/MultiSlider';

function App() {
  // purely for rules, can be deleted
  const [rules, setRules] = React.useState({
    total: 1,
    sliderAtLimit: null,
    doubleClicked: null,
  });

  const [sliderAtLimit, setSliderAtLimit] = React.useState(null);
  const [state, setState] = React.useState({
    alpha: 0.1,
    beta: 0.2,
    gamma: 0.3,
    delta: 0.2,
    epsilon: 0.1,
    zeta: 0.1,
  });

  const handleOnChange = (key, value) => {
    if (state[key] === value) {
      // ignore no value change
      return;
    }

    const potentialState = {...state, [key]: value};
    const total = Object.values(potentialState).reduce(
      (total, current) => (total += current),
      0,
    );

    // prevent the total from exceeding 100%
    let adjustment = 0;
    if (total > 1) {
      adjustment = total - 1;
      setSliderAtLimit(key);
    } else {
      setSliderAtLimit(null);
    }

    // eliminate any trailing digits from float weirdness
    const rounded =
      Math.round((value - adjustment) * 100 + Number.EPSILON) / 100;

    setState({...state, [key]: rounded});
    setRules({ total, sliderAtLimit: adjustment !== 0, doubleClicked: null});
  };

  const handleOnDoubleClick = key => {
    // double click target gets 100% distribution
    const newState = {};
    Object.keys(state).forEach(datum => {
      if (datum === key) {
        newState[key] = 1;
      } else {
        newState[datum] = 0;
      }
    });

    setState(newState);
    setRules({total: 1, sliderAtLimit: null, doubleClicked: key});
  };

  return (
    <div className="App">
      <MultiSlider
        data={state}
        onChange={handleOnChange}
        onDoubleClick={handleOnDoubleClick}
        sliderAtLimit={sliderAtLimit}
        rules={rules}
      />
    </div>
  );
}

export default App;
