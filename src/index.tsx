import ReactDOM from "react-dom/client";
import React from "react";
import { App } from "./router";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Не знайдено #root елемента");
}
