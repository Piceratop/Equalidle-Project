import React from "react";
import ReactDOM from "react-dom";
import Header from "./Components/Header";

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
