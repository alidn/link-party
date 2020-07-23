import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {RecoilRoot} from 'recoil/dist';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const rootEl = document.getElementById('root');
// ReactDOM.render(<App />, rootEl)
const root = ReactDOM.unstable_createRoot(rootEl);
root.render(
  <Router>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </Router>
);
