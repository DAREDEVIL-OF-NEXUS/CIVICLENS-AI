import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/theme.css";
import { HashRouter } from "react-router-dom";

import App from "./App.jsx";
import { ComplaintsProvider } from "./context/ComplaintsProvider.jsx";
import { UserSessionProvider } from "./context/UserSessionContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <UserSessionProvider>
        <ComplaintsProvider>
          <App />
        </ComplaintsProvider>
      </UserSessionProvider>
    </HashRouter>
  </React.StrictMode>
);