"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Film } from "lucide-react";

interface LazyImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallbackText?: string;
  containerClassName?: string;
}

/**
 * Universal LazyImage Component
 * - Native Next.js lazy loading with loading="lazy"
 * - Shimmer wave skeleton placeholder during load (scetone loading)
 * - Smooth fade-in transition (opacity 0 -> 100)
 * - Safe fallback placeholder if image URL fails or is empty
 */
export function LazyImage({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  className = "",
  containerClassName = "",
  priority = false,
  fallbackText,
  ...rest
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  // If no source or invalid
  const validSrc = typeof src === "string" && src.trim().length > 0 && !hasError ? src : null;

  React.useEffect(() => {
    if (imgRef.current) {
      if (imgRef.current.complete && imgRef.current.naturalWidth > 0) {
        setIsLoading(false);
      }
    }
  }, [validSrc]);

  return (
    <div
      className={`overflow-hidden bg-[#121218] ${
        fill ? "absolute inset-0 w-full h-full" : "relative"
      } ${containerClassName}`}
    >
      {/* 1. Shimmer Skeleton Loading State (only shown briefly until image loads) */}
      {isLoading && validSrc && (
        <div className="absolute inset-0 z-10 bg-[#161622] animate-pulse flex items-center justify-center pointer-events-none">
          <Film className="w-6 h-6 text-white/10" />
        </div>
      )}

      {/* 2. Error / Fallback State with gradient and readable text */}
      {(!validSrc || hasError) && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-[#181824] to-[#0c0c14] border border-white/5 p-3 text-center">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2">
            <Film className="w-5 h-5 text-[#e50914]" />
          </div>
          <span className="text-xs font-bold text-slate-200 line-clamp-2 px-1">
            {fallbackText || alt || "Movies.snishad"}
          </span>
          <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">
            Ultra HD
          </span>
        </div>
      )}

      {/* 3. Direct Fast Image */}
      {validSrc && (
        <img
          ref={imgRef}
          src={validSrc}
          alt={alt || "Movie poster"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`w-full h-full object-cover transition-transform duration-300 ${className}`}
        />
      )}
    </div>
  );
}

export default LazyImage;
