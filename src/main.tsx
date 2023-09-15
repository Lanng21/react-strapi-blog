import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BlogProvider } from "./hooks/useBlogContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BlogProvider>
      <App />
    </BlogProvider>
  </React.StrictMode>
);
