import React from "react";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components";
import Layout from "./layout";
import { render } from "react-dom";
import "./style.css";
import { SnackbarProvider } from "notistack";

const history = createBrowserHistory();

const root = (
  <Provider store={store}>
    <Router history={history}>
      <Layout>
        <App />
      </Layout>
    </Router>
  </Provider>
);

render(root, document.getElementById("root"));
