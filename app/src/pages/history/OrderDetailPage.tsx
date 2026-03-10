import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrder, type BridgeOrder } from "@/lib/amplifi-api";
import { ASSET_ICONS, BTC_EXPLORER_BASE, STARKNET_EXPLORER_BASE } from "@/lib/constants";
import { OrderDetailSkeleton } from "@/components/skeletons";
import { LoanStatusPanel } from "@/components/borrow/LoanStatusPanel";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function satsToBtc(sats: string): string {
  return (Number(sats) / 1e8).toFixed(8);
}

function statusBadge(status: string): { label: string; className: string } {
  const s = status?.toUpperCase?.() ?? "";
  switch (s) {
    case "SETTLED":
      return { label: "Completed", className: "bg-[#F3FDF6] text-[#033122]" };
    case "FAILED":
    case "EXPIRED":
    case "REFUNDED":
      return { label: s.replace("_", " "), className: "bg-red-50 text-red-700" };
    case "CREATED":
    case "SWAP_CREATED":
      return { label: "Pending", className: "bg-amber-50 text-amber-800" };
    case "BTC_SENT":
    case "BTC_CONFIRMED":
    case "CLAIMING":
      return { label: "In Progress", className: "bg-blue-50 text-blue-700" };
    default:
      return { label: status, className: "bg-gray-100 text-gray-700" };
  }
}

export function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<BridgeOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;
    setLoading(true);
    getOrder(orderId)
      .then((res) => {
        if (!cancelled && res.data) setOrder(res.data);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load order");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [orderId]);

  if (!orderId) {
    return (
      <div className="relative mx-auto w-full max-w-[1400px] min-w-0 py-6 px-4">
        <p className="text-sm text-red-600">Invalid order.</p>
        <button
          type="button"
          onClick={() => navigate("/history")}
          className="mt-4 text-sm text-amplifi-primary hover:underline"
        >
          Back to history
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="relative mx-auto w-full max-w-[1400px] min-w-0 py-6 px-4 sm:py-8 sm:px-0">
        <div className="mb-6 h-5 w-20 skeleton-shimmer rounded" aria-hidden />
        <OrderDetailSkeleton />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="relative mx-auto w-full max-w-[1400px] min-w-0 py-6 px-4">
        <p className="text-sm text-red-600">{error ?? "Order not found."}</p>
        <button
          type="button"
          onClick={() => navigate("/history")}
          className="mt-4 text-sm text-amplifi-primary hover:underline"
        >
          Back to history
        </button>
      </div>
    );
  }

  const badge = statusBadge(order.status);
  const amountBtc = order.amountSource ? satsToBtc(order.amountSource) : satsToBtc(order.amount);
  const amountOut = order.amountDestination ? satsToBtc(order.amountDestination) : null;
  const isInProgress =
    order.status !== "SETTLED" &&
    order.status !== "FAILED" &&
    order.status !== "EXPIRED" &&
    order.status !== "REFUNDED";

  return (
    <div className="relative mx-auto w-full max-w-[1400px] min-w-0 py-6 px-4 sm:py-8 sm:px-0">
      <button
        type="button"
        onClick={() => navigate("/history")}
        className="mb-6 flex items-center gap-2 text-sm text-amplifi-muted hover:text-amplifi-text"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to history
      </button>

      <div className="rounded-amplifi-lg bg-white p-4 sm:p-5 md:p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-amplifi-text">Order Details</h2>
            <span className={`rounded-[4px] px-2.5 py-1 text-sm font-medium ${badge.className}`}>
              {badge.label}
            </span>
            <span className="text-sm text-amplifi-muted capitalize">{order.action}</span>
          </div>
          <p className="text-xs text-amplifi-muted font-mono">{order.id}</p>
        </div>

        {isInProgress && (
          <LoanStatusPanel orderId={order.id} swapStep={undefined} />
        )}

        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-amplifi-muted">Amount (BTC)</dt>
            <dd className="mt-1 flex items-center gap-2 text-base font-medium text-amplifi-text">
              <img src={ASSET_ICONS.BTC} alt="" className="h-5 w-5 rounded-full" />
              {amountBtc} {order.sourceAsset}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-amplifi-muted">Destination</dt>
            <dd className="mt-1 flex items-center gap-2 text-base font-medium text-amplifi-text">
              <img
                src={ASSET_ICONS[order.destinationAsset as keyof typeof ASSET_ICONS] ?? ASSET_ICONS.WBTC}
                alt=""
                className="h-5 w-5 rounded-full"
              />
              {order.destinationAsset}
              {amountOut != null && ` (≈ ${amountOut})`}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-amplifi-muted">Created</dt>
            <dd className="mt-1 text-sm text-amplifi-text">{formatDate(order.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-xs text-amplifi-muted">Updated</dt>
            <dd className="mt-1 text-sm text-amplifi-text">{formatDate(order.updatedAt)}</dd>
          </div>
          <div>
            <dt className="text-xs text-amplifi-muted">Receive Address</dt>
            <dd className="mt-1 break-all font-mono text-xs text-amplifi-text">
              {order.receiveAddress}
            </dd>
          </div>
          {order.bitcoinAddress && (
            <div>
              <dt className="text-xs text-amplifi-muted">Bitcoin Address</dt>
              <dd className="mt-1 break-all font-mono text-xs text-amplifi-text">
                {order.bitcoinAddress}
              </dd>
            </div>
          )}
        </dl>

        {(order.sourceTxId || order.destinationTxId) && (
          <div className="border-t border-amplifi-border pt-6">
            <h3 className="mb-3 text-sm font-medium text-amplifi-text">Transaction Links</h3>
            <div className="flex flex-wrap gap-3">
              {order.sourceTxId && (
                <a
                  href={`${BTC_EXPLORER_BASE}/tx/${order.sourceTxId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-amplifi-border px-3 py-2 text-sm text-amplifi-text hover:bg-gray-50"
                >
                  <img src={ASSET_ICONS.BTC} alt="" className="h-4 w-4 rounded-full" />
                  BTC Transaction
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {order.destinationTxId && (
                <a
                  href={`${STARKNET_EXPLORER_BASE}/tx/${order.destinationTxId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-amplifi-border px-3 py-2 text-sm text-amplifi-text hover:bg-gray-50"
                >
                  <img src={ASSET_ICONS.STRK} alt="" className="h-4 w-4 rounded-full" />
                  Starknet Transaction
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}

        {order.lastError && (
          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">Error</p>
            <p className="mt-1 text-sm text-red-700">{order.lastError}</p>
          </div>
        )}

        {order.atomiqSwapId && (
          <div>
            <dt className="text-xs text-amplifi-muted">Atomiq Swap ID</dt>
            <dd className="mt-1 break-all font-mono text-xs text-amplifi-text">
              {order.atomiqSwapId}
            </dd>
          </div>
        )}
      </div>
    </div>
  );
}
