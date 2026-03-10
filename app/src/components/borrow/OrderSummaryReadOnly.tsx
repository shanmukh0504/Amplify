import { ASSET_ICONS, LOGOS, getAssetIconUrl } from "@/lib/constants";

export interface OrderSummaryReadOnlyProps {
  supplyAmountUsd: number;
  borrowAmountUsd: number;
  btcEquivalent: number;
  ltvPct: number;
  borrowSymbol?: string;
}

export function OrderSummaryReadOnly({
  supplyAmountUsd,
  borrowAmountUsd,
  btcEquivalent,
  ltvPct,
  borrowSymbol = "USDC",
}: OrderSummaryReadOnlyProps) {
  return (
    <div className="relative space-y-1.5">
      <div className="rounded-amplifi bg-white p-4 sm:p-6">
        <div className="mb-4 sm:mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 w-full">
            <img src={LOGOS.import} alt="input" className="h-4 w-4 text-amplifi-text" />
            <div className="flex items-center justify-between w-full">
              <span className="text-base text-amplifi-text">Supply Collateral</span>
              <img src={LOGOS.swap} alt="arrow" className="h-5 w-5 text-amplifi-text" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-2">
          <div className="flex items-center justify-between w-full">
            <div className="w-full min-w-0 border-0 bg-transparent p-0 text-4xl font-medium text-amplifi-amount">
              ${supplyAmountUsd.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <img src={ASSET_ICONS.BTC} alt="" className="h-8 w-8 rounded-full object-cover" />
                <span className="text-base text-amplifi-text">BTC</span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between tracking-[-0.32px]">
            <div className="text-base text-amplifi-text text-amplifi-muted min-w-[140px]">
              ≈ {btcEquivalent.toFixed(8)} BTC
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-base text-amplifi-text">
            <span>Loan-to-value (%)</span>
            <div className="flex items-center gap-1.5">
              {ltvPct <= 50 && (
                <span className="rounded-[4px] text-amplifi-risk-safe bg-amplifi-risk-safe-bg/50 px-1.5 py-0.5 text-sm font-normal tracking-[-0.28px]">
                  Low risk!
                </span>
              )}
              {ltvPct > 50 && ltvPct <= 65 && (
                <span className="rounded-[4px] text-amplifi-risk-medium bg-amplifi-risk-medium-bg/50 px-1.5 py-0.5 text-sm font-normal tracking-[-0.28px]">
                  Med risk
                </span>
              )}
              {ltvPct > 65 && (
                <span className="rounded-[4px] text-amplifi-risk-hard bg-amplifi-risk-hard-bg/50 px-1.5 py-0.5 text-sm font-normal tracking-[-0.28px]">
                  High risk
                </span>
              )}
              <img src={LOGOS.info} alt="info" className="h-5 w-5 text-amplifi-text" />
            </div>
          </div>
          <div className="relative h-8 w-full">
            <div
              className="pointer-events-none absolute top-1/2 h-1 -translate-y-1/2 rounded-l-full"
              style={{
                width: `${(ltvPct / 80) * 100}%`,
                background:
                  ltvPct <= 50 ? "#00CD3B" : ltvPct <= 65 ? "#D08700" : "#DC2626",
              }}
            />
            <div
              className="pointer-events-none absolute top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-[10px] border border-[#8A8A8A] bg-white font-semibold text-amplifi-text"
              style={{
                width: 48,
                height: 32,
                left: `clamp(0px, calc(${(ltvPct / 80) * 100}% - 24px), calc(100% - 48px))`,
              }}
            >
              {ltvPct}%
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-amplifi bg-white p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <img src={LOGOS.export} alt="output" className="h-5 w-5 text-amplifi-text" />
          <span className="text-base text-amplifi-text">Borrow</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="text-4xl font-medium text-amplifi-amount min-h-[2.25rem] flex items-center">
            ${borrowAmountUsd.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </div>
          <div className="flex items-center gap-2">
            <img src={getAssetIconUrl(borrowSymbol)} alt="" className="h-8 w-8 rounded-full object-cover" />
            <span className="text-base text-amplifi-text">{borrowSymbol}</span>
            <img src={LOGOS.dropdown} alt="arrow down" className="h-5 w-5 text-amplifi-text" />
          </div>
        </div>
      </div>
    </div>
  );
}
