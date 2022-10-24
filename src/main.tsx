import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import routes from "@/routes";
import { worker } from "./mocks/browser";

worker.start({
  onUnhandledRequest: "bypass",
});

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </React.StrictMode>
);
