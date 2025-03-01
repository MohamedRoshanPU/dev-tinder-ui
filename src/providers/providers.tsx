"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { getQueryClient } from "@/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
