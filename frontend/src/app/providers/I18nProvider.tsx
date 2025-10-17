"use client";
import "../i18n"; // Import i18n config only on client side

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
