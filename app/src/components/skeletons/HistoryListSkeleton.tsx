import { LOGOS } from "@/lib/constants";

export function HistoryListSkeleton() {
  return (
    <div className="rounded-amplifi-lg bg-white p-4 sm:p-5 md:p-6">
      <p className="mb-4 flex items-center gap-2 text-base text-amplifi-text">
        <img src={LOGOS.borrow} alt="" className="h-5 w-5" />
        Orders
      </p>
      <ul className="space-y-0">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <li
            key={i}
            className="flex items-center justify-between gap-3 border-b border-amplifi-border py-5 last:border-b-0"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 skeleton-shimmer rounded-full" />
                <div className="h-4 w-20 skeleton-shimmer rounded" />
              </div>
              <span className="text-amplifi-muted">→</span>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 skeleton-shimmer rounded-full" />
                <div className="h-4 w-12 skeleton-shimmer rounded" />
              </div>
              <div className="h-5 w-16 skeleton-shimmer rounded" />
              <div className="h-3 w-12 skeleton-shimmer rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-24 skeleton-shimmer rounded" />
              <div className="h-5 w-5 skeleton-shimmer rounded" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
