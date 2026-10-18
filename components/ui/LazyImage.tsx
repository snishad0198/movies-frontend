"use client";

import React, { useState, useEffect, useRef } from "react";
import { Film } from "lucide-react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  containerClassName?: string;
  priority?: boolean;
  fill?: boolean;
}

/**
 * Universal Netflix-Grade LazyImage Component
 * - Fixes browser horizontal carousel starvation: only loads when near or inside viewport!
 * - High priority (fetchpriority="high", loading="eager") for visible cards and billboard
 * - Netflix sleek dark shimmer placeholder while loading (no awkward circles or shapes)
 * - Zero-flicker cached image detection
 * - Smooth opacity fade-in
 */
export function LazyImage({
  src,
  alt,
  fill = false,
  className = "",
  containerClassName = "",
  priority = false,
  fallbackText,
  ...rest
}: LazyImageProps) {
  const [isInView, setIsInView] = useState<boolean>(priority);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const validSrc = typeof src === "string" && src.trim().length > 0 && !hasError ? src : null;

  // Real IntersectionObserver with horizontal & vertical awareness
  useEffect(() => {
    if (priority || isInView) return;

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        {
          // 250px vertical margin, 150px horizontal margin
          // Loads right before entering viewport, stops far-away cards from hogging bandwidth!
          rootMargin: "250px 150px",
          threshold: 0.01,
        }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    } else {
      // Fallback: load immediately if no IntersectionObserver
      setIsInView(true);
    }
  }, [priority, isInView]);

  // Check if already cached in browser memory
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [isInView, validSrc]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden bg-[#141418] relative select-none ${
        fill ? "absolute inset-0 w-full h-full" : "relative"
      } ${containerClassName}`}
    >
      {/* 1. Sleek Netflix Shimmer Loading Wave (No circles, pure seamless poster shimmer) */}
      {!isLoaded && validSrc && (
        <div className="absolute inset-0 z-10 bg-[#161620] skeleton-shimmer pointer-events-none" />
      )}

      {/* 2. Error / Fallback State */}
      {(!validSrc || hasError) && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-[#181824] to-[#0c0c14] border border-white/5 p-3 text-center">
          <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center mb-1.5">
            <Film className="w-4 h-4 text-[#e50914]" />
          </div>
          <span className="text-xs font-bold text-slate-200 line-clamp-2 px-1">
            {fallbackText || alt || "Movies.snishad"}
          </span>
          <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">
            Ultra HD
          </span>
        </div>
      )}

      {/* 3. Direct Fast Image (Rendered ONLY when element is in view or priority) */}
      {validSrc && isInView && (
        <img
          ref={imgRef}
          src={validSrc}
          alt={alt || "Movie poster"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          // @ts-ignore
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setIsLoaded(true);
            setHasError(true);
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
          {...rest}
        />
      )}
    </div>
  );
}

export default LazyImage;

