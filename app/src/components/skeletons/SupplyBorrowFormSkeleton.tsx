export function SupplyBorrowFormSkeleton() {
  return (
    <div className="relative space-y-1.5">
      <div className="rounded-amplifi bg-white p-4 sm:p-6">
        <div className="mb-4 sm:mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 w-full">
            <div className="h-4 w-4 skeleton-shimmer rounded" />
            <div className="flex items-center justify-between w-full">
              <div className="h-4 w-32 skeleton-shimmer rounded" />
              <div className="h-5 w-5 skeleton-shimmer rounded" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-2">
          <div className="flex items-center justify-between w-full">
            <div className="h-10 w-24 skeleton-shimmer rounded" />
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 skeleton-shimmer rounded-full" />
                <div className="h-4 w-10 skeleton-shimmer rounded" />
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="h-4 w-28 skeleton-shimmer rounded" />
            <div className="flex items-center gap-2">
              <div className="h-4 w-12 skeleton-shimmer rounded" />
              <div className="h-6 w-10 skeleton-shimmer rounded" />
              <div className="h-6 w-10 skeleton-shimmer rounded" />
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <div className="h-4 w-24 skeleton-shimmer rounded" />
            <div className="h-4 w-16 skeleton-shimmer rounded" />
          </div>
          <div className="h-8 w-full skeleton-shimmer rounded" />
        </div>
      </div>

      <div className="rounded-amplifi bg-white p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-5 w-5 skeleton-shimmer rounded" />
          <div className="h-4 w-16 skeleton-shimmer rounded" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="h-10 w-20 skeleton-shimmer rounded" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 skeleton-shimmer rounded-full" />
            <div className="h-4 w-12 skeleton-shimmer rounded" />
            <div className="h-5 w-5 skeleton-shimmer rounded" />
          </div>
        </div>
      </div>

      <div className="h-12 w-full skeleton-shimmer rounded-amplifi" />
    </div>
  );
}
