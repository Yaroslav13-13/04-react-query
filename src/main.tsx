import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./components/App/App";
import "modern-normalize/modern-normalize.css";
import "./index.css";

const queryClient = new QueryClient();

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");

const root = createRoot(container);
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
