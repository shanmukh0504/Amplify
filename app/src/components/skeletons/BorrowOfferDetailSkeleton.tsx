import { LOGOS } from "@/lib/constants";

export function BorrowOfferDetailSkeleton() {
  return (
    <section className="rounded-amplifi-lg bg-white p-4 sm:p-5 md:p-6 md:h-fit md:min-h-0">
      <p className="mb-6 flex items-center gap-2 text-base text-amplifi-text">
        <img src={LOGOS.borrow} alt="" className="h-5 w-5" />
        <div className="h-4 w-40 skeleton-shimmer rounded" />
      </p>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 skeleton-shimmer rounded" />
          <div className="h-4 w-36 skeleton-shimmer rounded" />
          <div className="h-4 w-16 skeleton-shimmer rounded" />
        </div>
        <div className="h-7 w-7 skeleton-shimmer rounded" />
      </div>
      <div className="mb-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="min-w-0 space-y-1">
            <div className="h-3 w-16 skeleton-shimmer rounded" />
            <div className="h-4 w-14 skeleton-shimmer rounded" />
          </div>
        ))}
      </div>
      <div className="space-y-5 border-t border-amplifi-border pt-5">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-5 w-5 skeleton-shimmer rounded" />
            <div className="h-4 w-32 skeleton-shimmer rounded" />
          </div>
          <dl className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between gap-2">
                <div className="h-4 w-28 skeleton-shimmer rounded" />
                <div className="h-5 w-24 skeleton-shimmer rounded" />
              </div>
            ))}
          </dl>
        </div>
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-4 w-4 skeleton-shimmer rounded" />
            <div className="h-4 w-24 skeleton-shimmer rounded" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="h-3 w-20 skeleton-shimmer rounded" />
              <div className="h-4 w-12 skeleton-shimmer rounded" />
            </div>
            <div className="space-y-1">
              <div className="h-3 w-24 skeleton-shimmer rounded" />
              <div className="h-4 w-20 skeleton-shimmer rounded" />
            </div>
          </div>
        </div>
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-4 w-4 skeleton-shimmer rounded" />
            <div className="h-4 w-16 skeleton-shimmer rounded" />
          </div>
          <div className="h-12 w-full skeleton-shimmer rounded" />
        </div>
      </div>
    </section>
  );
}
