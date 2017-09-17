import React from "react";
import { Provider } from "react-redux";
import ReactDom from "react-dom";
import Store from "./redux/store";
import Main from "./components/Main";
import "semantic-ui-css/semantic.min.css";

const App = () => {
  return (
    <Provider store={Store}>
      <Main />
    </ Provider>
  );
};

ReactDom.render (
  <App />,
  window.document.getElementById("react-app"),
);
