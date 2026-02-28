export type PoolAsset = {
  symbol: string;
  address: string;
  decimals?: number;
};

export type PoolPair = {
  collateralAsset: string;
  debtAsset: string;
};

export type Pool = {
  id: string;
  name: string;
  protocolVersion: string;
  isDeprecated: boolean;
  assets: PoolAsset[];
  pairs: PoolPair[];
};

export type Position = {
  id: string;
  pool: string;
  type: string;
  collateral: string;
  collateralShares: string;
  walletAddress: string;
};

export type UserHistoryEntry = {
  pool: string;
  txHash: string;
  timestamp: number;
  collateral: string;
  type: string;
};
