import { createContext, useContext } from "react";
import type { UseAtomiqSwapResult } from "@/hooks/useAtomiqSwap";

const BorrowSwapContext = createContext<UseAtomiqSwapResult | null>(null);

export function BorrowSwapProvider({
  value,
  children,
}: {
  value: UseAtomiqSwapResult;
  children: React.ReactNode;
}) {
  return (
    <BorrowSwapContext.Provider value={value}>
      {children}
    </BorrowSwapContext.Provider>
  );
}

export function useBorrowSwap(): UseAtomiqSwapResult {
  const ctx = useContext(BorrowSwapContext);
  if (!ctx) {
    throw new Error("useBorrowSwap must be used within BorrowSwapProvider");
  }
  return ctx;
}
