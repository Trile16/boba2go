"use client";
const { SessionProvider } = require("next-auth/react");

export function AppProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
