import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import App from "./App";

import "./index.css";

import {initializeApp} from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxdjp9hlcY2mGnq5Pp5wSumM6_OEzVFSs",
  authDomain: "courseproject-f468e.firebaseapp.com",
  projectId: "courseproject-f468e",
  storageBucket: "courseproject-f468e.appspot.com",
  messagingSenderId: "36874883245",
  appId: "1:36874883245:web:6aedbbb108776f29dff624",
};

const app = initializeApp(firebaseConfig);

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
