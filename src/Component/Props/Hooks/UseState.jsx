import React, { useState } from 'react';
import './UseState.css';

function UseState() {
  const [state, setState] = useState(0);
  const [color, setColor] = useState('blue');

  // Increment function
  const increment = () => {
    setState(state + 1);
  };

  // Decrement function
  const decrement = () => {
    setState(state - 1);
  };

  const reset = () => {
    setState(0);
  };

  const mouseover = () => {
    setColor(color === 'blue' ? 'red' : 'blue');
  };

  return (
    <div>
      <h1 onMouseOver={mouseover}>UseState</h1>

      <p style={{ color: color }}>
        adds local state to a component to track data that changes over time
      </p>

      <h2>{state}</h2>

      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default UseState;