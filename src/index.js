import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./app/store.js";
import "antd/dist/antd.css";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <div className="dark">
        <App />
      </div>
    </Provider>
  </Router>,
  document.getElementById("root")
);
