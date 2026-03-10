import { Outlet } from "react-router-dom";
import { useAtomiqSwap } from "@/hooks/useAtomiqSwap";
import { BorrowSwapProvider } from "@/context/BorrowSwapContext";

export function BorrowLayout() {
  const swapResult = useAtomiqSwap();

  return (
    <BorrowSwapProvider value={swapResult}>
      <Outlet />
    </BorrowSwapProvider>
  );
}
