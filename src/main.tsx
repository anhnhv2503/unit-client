import { ThemeProvider } from "@/components/context/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NotificationProvider } from "./components/context/NotificationProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <NotificationProvider>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </NotificationProvider>
);
