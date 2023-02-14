import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        closeOnClick
        rtl={false}
        theme="light"
        draggable
        pauseOnHover={false}
      />
      <App />
    </BrowserRouter>
  </Provider>
);
