"use client";

import React from "react";

export function MovieCardSkeleton({ showTitle = true }: { showTitle?: boolean }) {
  return (
    <div className="relative flex-shrink-0 select-none rounded-md sm:rounded-xl overflow-hidden bg-[#14141c] border border-white/5 shadow-md">
      {/* Sleek Shimmering Poster Box (Clean Netflix style - no weird circle!) */}
      <div className="relative aspect-[2/3] w-full bg-[#181822] skeleton-shimmer" />

      {/* Optional Title and Metadata strip */}
      {showTitle && (
        <div className="p-2.5 sm:p-3 bg-[#111116] space-y-1.5">
          <div className="h-3 sm:h-3.5 bg-white/10 rounded w-4/5 skeleton-shimmer" />
          <div className="flex items-center justify-between pt-1">
            <div className="h-2.5 bg-white/10 rounded w-1/3 skeleton-shimmer" />
            <div className="h-2.5 bg-white/10 rounded w-1/4 skeleton-shimmer" />
          </div>
        </div>
      )}
    </div>
  );
}

export function MovieGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default MovieCardSkeleton;

