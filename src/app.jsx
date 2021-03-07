import * as React from "react";
import * as ReactDOM from "react-dom";

function App() {
  const [clicked, setClicked] = React.useState(false);

  function handleClick() {
    setClicked(true);
  }

  return (
    <div>
      <h2>Hello from React!</h2>
      <button onClick={handleClick}>Click Me</button>
      {clicked && <h3>Clicking happened!</h3>}
    </div>
  );
}

function render() {
  ReactDOM.render(<App />, document.querySelector("#content"));
}

render();
