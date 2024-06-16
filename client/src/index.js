import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ContextProvider } from './Context/Context';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from './Store/Store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={Store}>
        <ContextProvider>
          <Routes>
            <Route path='/*' element={<App/>}/>
          </Routes>
        </ContextProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
