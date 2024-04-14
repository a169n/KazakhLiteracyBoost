import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { SnackbarProvider } from "notistack";
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider>
          <ToastContainer position="top-right" pauseOnHover={false} stacked={true} />
          <App />
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
