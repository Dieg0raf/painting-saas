"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { UserProvider } from "./userProvider";
import { I18nProvider } from "./I18nProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <UserProvider>{children}</UserProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
