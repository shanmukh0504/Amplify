export function EarnFormSkeleton() {
  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      <div className="rounded-amplifi bg-white p-4 sm:p-6">
        <div className="mb-4 sm:mb-5 flex items-center gap-2">
          <div className="h-4 w-4 skeleton-shimmer rounded" />
          <div className="h-4 w-28 skeleton-shimmer rounded" />
        </div>
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-1.5">
            <div className="h-3 w-16 skeleton-shimmer rounded" />
            <div className="h-10 w-full skeleton-shimmer rounded-amplifi" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3 w-24 skeleton-shimmer rounded" />
            <div className="h-10 w-full skeleton-shimmer rounded-amplifi" />
          </div>
          <div className="h-3 w-32 skeleton-shimmer rounded" />
        </div>
      </div>

      <div className="rounded-amplifi bg-white p-4 sm:p-6">
        <div className="mb-4 sm:mb-5 flex items-center gap-2">
          <div className="h-4 w-4 skeleton-shimmer rounded" />
          <div className="h-4 w-16 skeleton-shimmer rounded" />
        </div>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <div className="h-3 w-24 skeleton-shimmer rounded mb-1" />
            <div className="h-8 w-28 skeleton-shimmer rounded" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3 w-20 skeleton-shimmer rounded" />
            <div className="h-12 w-full skeleton-shimmer rounded-amplifi" />
          </div>
          <div className="h-12 w-full skeleton-shimmer rounded-amplifi" />
        </div>
      </div>
    </div>
  );
}
