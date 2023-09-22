import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import App from "./App";

import "./index.css";

import {initializeApp} from "firebase/app";
import "firebase/auth";
import { api } from "./firebase/index"



const app = api;

const Context = createContext(null);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
