import { useWallet } from "@/store/useWallet";

/**
 * Derives wallet readiness for swap/borrow from store.
 * - isWalletReadyForSwap: both Bitcoin wallet instance and Starknet signer exist
 * - isWalletRestoring: store is connecting (e.g. during reconnect)
 */
export function useWalletReadyState() {
  const { bitcoinWalletInstance, starknetSigner, isConnecting } = useWallet();

  const isWalletReadyForSwap = Boolean(
    bitcoinWalletInstance && starknetSigner
  );
  const isWalletRestoring = isConnecting;

  return { isWalletReadyForSwap, isWalletRestoring };
}
