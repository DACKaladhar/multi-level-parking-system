import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ConfigurablePanelBody } from "./components/ConfigurablePanelBody";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigurablePanelBody />
  </React.StrictMode>
);
