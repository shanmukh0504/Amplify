export function OrderDetailSkeleton() {
  return (
    <div className="rounded-amplifi-lg bg-white p-4 sm:p-5 md:p-6 space-y-6 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-6 w-32 skeleton-shimmer rounded" />
          <div className="h-6 w-20 skeleton-shimmer rounded" />
          <div className="h-4 w-16 skeleton-shimmer rounded" />
        </div>
        <div className="h-3 w-48 skeleton-shimmer rounded font-mono" />
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-6 w-6 skeleton-shimmer rounded" />
            <div className="h-5 w-28 skeleton-shimmer rounded" />
          </div>
        ))}
      </div>

      <dl className="grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i}>
            <div className="h-3 w-24 skeleton-shimmer rounded mb-1" />
            <div className="h-4 w-full skeleton-shimmer rounded" />
          </div>
        ))}
      </dl>
    </div>
  );
}
