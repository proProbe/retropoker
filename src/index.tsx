import React from "react";
import ReactDom from "react-dom";
import Main from "./js/Main";

ReactDom.render (
    <Main compiler="TypeScript" framework="React" />,
    window.document.getElementById("react-app"),
);
