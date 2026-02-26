import { useState } from "react";

function Counter() {
  let [counter, setCounter] = useState<number>(0);

  let incrementCounter = () => setCounter(counter + 1);

  let decrementCounter = () => {
    if (counter > 0) setCounter(counter - 1);
  };
  return (
    <div className="container">
      <h2 className="text-primary">Counter App</h2>
      <div className="p-3 mb-4">
        <button className="btn btn-success mx-3" onClick={incrementCounter}>
          ➕
        </button>
        <button className="btn btn-danger" onClick={decrementCounter}>
          ➖
        </button>
      </div>
      <div>
        <h3 className="text-info">
          Counter: <span className="badge text-bg-secondary">{counter}</span>
        </h3>
      </div>
    </div>
  );
}

export default Counter;
