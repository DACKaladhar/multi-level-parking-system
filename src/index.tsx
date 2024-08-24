import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { CompanyPanel } from "./components/company-panel";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CompanyPanel />
  </React.StrictMode>
);
