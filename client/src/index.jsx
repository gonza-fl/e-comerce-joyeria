/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { FirebaseAppProvider } from 'reactfire';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store/store';
import firebaseConfig from './Firebase';

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Provider store={store}>
      <Router>
        <React.StrictMode>
          <Suspense fallback="Cargando...">
            <App />
          </Suspense>
        </React.StrictMode>
      </Router>
    </Provider>
  </FirebaseAppProvider>,
  document.getElementById('root'),
);
reportWebVitals();
