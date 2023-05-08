import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Equalidown from "./components/Equalidown";
import { EqualidownProvider } from "./contexts/equalidown";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EqualidownProvider>
      <Equalidown />
    </EqualidownProvider>
  </React.StrictMode>
);
