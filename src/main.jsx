import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { StudyMaterialsProvider } from "./context/StudyMaterialsContext.jsx";
import { DashboardDataProvider } from "./context/DashboardDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <DashboardDataProvider>
        <StudyMaterialsProvider>
          <App />
        </StudyMaterialsProvider>
      </DashboardDataProvider>
    </AuthProvider>
  </React.StrictMode>
);
