import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ThemeProvider } from "./components/provider/theme-provider";
import SocketProvider from "./components/provider/socket-provider";
import { QueryProvider } from "./components/provider/query-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <SocketProvider>
      <ThemeProvider defaultTheme="dark" storageKey="chat-loom-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </SocketProvider>
  </QueryProvider>
);
