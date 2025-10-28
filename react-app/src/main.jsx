import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Toast from "./components/Toast";
import { AppProvider } from "./context/AppContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
      <Toast />
    </AppProvider>
  </React.StrictMode>
);
