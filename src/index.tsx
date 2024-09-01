import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { CompanyPanelContainer } from "./components/company-panel-container";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CompanyPanelContainer />
  </React.StrictMode>
);
