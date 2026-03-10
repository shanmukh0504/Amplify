export function BorrowOffersListSkeleton() {
  return (
    <ul className="space-y-0">
        {[1, 2, 3, 4].map((i) => (
          <li
            key={i}
            className="flex flex-col gap-4 border-b border-amplifi-border py-6 last:border-b-0"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1 flex items-center gap-2">
                <div className="h-4 w-4 skeleton-shimmer rounded" />
                <div className="flex items-center gap-2">
                  <div className="h-4 w-28 skeleton-shimmer rounded" />
                  <div className="h-4 w-16 skeleton-shimmer rounded" />
                </div>
              </div>
              <div className="h-7 w-7 skeleton-shimmer rounded" />
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="min-w-0 space-y-1">
                  <div className="h-3 w-16 skeleton-shimmer rounded" />
                  <div className="h-4 w-12 skeleton-shimmer rounded" />
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
  );
}
