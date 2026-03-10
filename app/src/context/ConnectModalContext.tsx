"use client";

import { createContext, useContext, useState, useCallback } from "react";

type ConnectModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ConnectModalContext = createContext<ConnectModalContextValue | null>(null);

export function ConnectModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ConnectModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ConnectModalContext.Provider>
  );
}

export function useConnectModal(): ConnectModalContextValue {
  const ctx = useContext(ConnectModalContext);
  if (!ctx) {
    throw new Error("useConnectModal must be used within ConnectModalProvider");
  }
  return ctx;
}
