/**
 * Loading skeleton component
 */

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
      <div className="h-10 bg-gray-300 rounded"></div>
    </div>
  );
}

export function SkeletonCardGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonText() {
  return (
    <div className="space-y-4">
      <div className="h-6 bg-gray-300 rounded w-full animate-pulse"></div>
      <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
    </div>
  );
}
