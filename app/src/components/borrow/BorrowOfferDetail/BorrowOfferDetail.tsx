import { getAssetIconUrl, getProtocolIconUrl, LOGOS } from "@/lib/constants";
import { LoanStatusPanel } from "../LoanStatusPanel";
import type { LoanOfferItem } from "@/lib/amplifi-api";

function formatPct(n: number): string {
  return (n * 100).toFixed(2);
}

export interface BorrowOfferDetailProps {
  offer: { item: LoanOfferItem; isBest: boolean };
  loanFlow?: { orderId: string } | null;
  isSendingBtc?: boolean;
  swapStep?: string;
  onBack: () => void;
}

export function BorrowOfferDetail({
  offer,
  loanFlow,
  isSendingBtc,
  swapStep,
  onBack,
}: BorrowOfferDetailProps) {
  const { item, isBest } = offer;
  const d = item.data;
  const protocolKey = (item.protocol ?? "").toLowerCase();
  const protocolDisplayName = protocolKey
    ? protocolKey.charAt(0).toUpperCase() + protocolKey.slice(1)
    : "Protocol";
  const poolName = d.pool.name;
  const liquidationPrice = d.quote?.liquidationPrice ?? 0;
  const targetLtvPct =
    d.quote?.targetLtv != null ? formatPct(d.quote.targetLtv) : "—";
  const btcPriceUsd =
    d.quote?.requiredCollateralUsd != null &&
    d.quote?.requiredCollateralAmount != null &&
    d.quote.requiredCollateralAmount > 0
      ? d.quote.requiredCollateralUsd / d.quote.requiredCollateralAmount
      : null;
  const dropPct =
    btcPriceUsd != null &&
    d.quote?.liquidationPrice != null &&
    d.quote.liquidationPrice > 0
      ? (((btcPriceUsd - d.quote.liquidationPrice) / btcPriceUsd) * 100).toFixed(0)
      : null;

  return (
    <section className="rounded-amplifi-lg bg-white p-4 sm:p-5 md:p-6 md:h-fit md:min-h-0">
      {loanFlow && (
        <LoanStatusPanel
          orderId={loanFlow.orderId}
          isSendingBtc={isSendingBtc}
          swapStep={swapStep}
        />
      )}
      <p className="mb-6 flex items-center gap-2 text-base text-amplifi-text">
        <img src={LOGOS.borrow} alt="borrow" className="h-5 w-5" />
        {isBest
          ? `${protocolDisplayName}'s Best Offer`
          : `${protocolDisplayName}'s Offer`}
      </p>
      <div className="mb-6 flex items-center gap-2 justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <img
            src={getProtocolIconUrl(item.protocol)}
            alt=""
            className="h-4 w-auto shrink-0 object-contain"
          />
          <span className="text-sm font-medium text-amplifi-text break-words min-w-0">
            {protocolDisplayName}
            {poolName ? ` · ${poolName}` : ""}
          </span>
          {isBest && (
            <span className="rounded-[4px] text-amplifi-risk-safe bg-amplifi-risk-safe-bg/50 px-1.5 py-0.5 text-sm font-normal tracking-[-0.28px] shrink-0">
              Best Offer
            </span>
          )}
        </div>
        {!loanFlow && (
          <button
            type="button"
            onClick={onBack}
            className="shrink-0 rounded p-1 hover:bg-gray-100"
            aria-label="Back to offers"
          >
            <img src={LOGOS.back} alt="back" className="h-7 w-7 text-amplifi-muted" />
          </button>
        )}
      </div>
      <div className="mb-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
        <div className="min-w-0">
          <p className="text-xs text-amplifi-muted break-words">Net APY</p>
          <p className="text-sm font-semibold text-amplifi-text">{formatPct(d.netApy)}%</p>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-amplifi-muted break-words">Max LTV</p>
          <p className="text-sm font-semibold text-amplifi-text">{formatPct(d.maxLtv)}%</p>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-amplifi-muted break-words">Liquidation price</p>
          <p className="text-sm font-semibold text-amplifi-text">
            {liquidationPrice > 0
              ? `$${liquidationPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : "—"}
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-amplifi-muted break-words">Collateral</p>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-amplifi-text">
            <img
              src={getAssetIconUrl(d.collateral.symbol)}
              alt=""
              className="h-4 w-4 shrink-0 rounded-full"
            />
            {d.collateral.symbol}
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-amplifi-muted break-words">Loan</p>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-amplifi-text">
            <img
              src={getAssetIconUrl(d.borrow.symbol)}
              alt=""
              className="h-4 w-4 shrink-0 rounded-full"
            />
            {d.borrow.symbol}
          </p>
        </div>
      </div>

      <div className="space-y-5 border-t border-amplifi-border pt-5">
        <div>
          <div className="mb-3 flex items-center gap-2 text-base text-amplifi-text">
            <img src={LOGOS.borrow} alt="attributes" className="h-5 w-5 text-amplifi-muted" />
            Market Attributes
          </div>
          <dl className="space-y-2 text-base">
            <div className="flex justify-between gap-2">
              <dt className="text-base text-amplifi-muted">Liquidation price</dt>
              <dd className="text-xl font-semibold text-amplifi-text">
                {liquidationPrice > 0
                  ? `$${liquidationPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-base text-amplifi-muted">Loan term</dt>
              <dd className="text-xl font-semibold text-amplifi-text">Unlimited</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-base text-amplifi-muted">Oracle price</dt>
              <dd className="text-xl font-semibold text-amplifi-text">
                {d.collateral.symbol} / {d.borrow.symbol} = —
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-base text-amplifi-muted">Total Fee</dt>
              <dd className="text-xl font-semibold text-amplifi-text">—</dd>
            </div>
          </dl>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-amplifi-text">
            <img src={LOGOS.ltv} alt="ltv" className="h-4 w-4 text-amplifi-muted" />
            Loan To Value
          </div>
          {dropPct != null && (
            <p className="mb-3 text-sm text-amplifi-muted">
              {d.collateral.symbol} price can fall ~{dropPct}% before your
              collateral is liquidated.
            </p>
          )}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-amplifi-muted">Loan-To-Value</p>
              <p className="font-semibold text-amplifi-text">{targetLtvPct}%</p>
            </div>
            <div>
              <p className="text-xs text-amplifi-muted">Liquidation price</p>
              <p className="font-semibold text-amplifi-text">
                {liquidationPrice > 0
                  ? `$${liquidationPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : "—"}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-amplifi-text">
            <img src={LOGOS.protocol} alt="protocol" className="h-4 w-4 text-amplifi-muted" />
            Protocol
          </div>
          <p className="text-sm text-amplifi-muted">
            Your loan is powered by {protocolDisplayName}
            {poolName ? ` (${poolName})` : ""}, an open source lending protocol.
            By continuing, you agree to{" "}
            <a
              href="#"
              className="font-medium text-amplifi-primary underline hover:text-amplifi-primary-hover"
              onClick={(e) => e.preventDefault()}
            >
              {poolName}'s Terms of Use
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
