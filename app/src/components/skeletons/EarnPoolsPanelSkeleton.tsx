export function EarnPoolsPanelSkeleton() {
  return (
    <ul className="space-y-0">
        {[1, 2, 3, 4].map((i) => (
          <li
            key={i}
            className="flex flex-col gap-3 border-b border-amplifi-border py-4 last:border-b-0"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 skeleton-shimmer rounded-full" />
                <div className="h-4 w-16 skeleton-shimmer rounded" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
              <div className="space-y-1">
                <div className="h-3 w-12 skeleton-shimmer rounded" />
                <div className="h-4 w-14 skeleton-shimmer rounded flex items-center gap-1.5" />
              </div>
              <div className="col-span-2 space-y-1">
                <div className="h-3 w-20 skeleton-shimmer rounded" />
                <div className="h-4 w-48 skeleton-shimmer rounded" />
              </div>
            </div>
          </li>
        ))}
      </ul>
  );
}
