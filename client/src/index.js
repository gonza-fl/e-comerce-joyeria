import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.js";

import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>

    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
