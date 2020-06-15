import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
const rootEl = document.getElementById("root");
// ReactDOM.render(<App />, rootEl)
const root = ReactDOM.unstable_createRoot(rootEl);
root.render(<App />);
