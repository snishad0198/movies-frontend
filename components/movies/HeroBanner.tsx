"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Play, Info, Star, Volume2, VolumeX, X } from "lucide-react";
import { MovieItem } from "@/lib/types";
import { formatRating, formatDuration, getImageUrl } from "@/lib/utils";
import { LazyImage } from "@/components/ui/LazyImage";
import { WatchlistButton } from "@/components/movies/WatchlistButton";

interface HeroBannerProps {
  items: MovieItem[];
}

export function HeroBanner({ items }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);

  useEffect(() => {
    if (!items || items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [items]);

  if (!items || items.length === 0) return null;

  const current = items[currentIndex];
  const isSeries = current.type === "SERIES";
  const detailHref = isSeries ? `/series/${current.slug}` : `/movie/${current.slug}`;
  const watchHref = `/watch/${current.slug}${isSeries ? "?season=1&episode=1" : ""}`;
  const backdropUrl = getImageUrl(current.backdropPath || (current as any).backdrop || current.posterPath || (current as any).poster);
  const rating = current.rating ?? (current as any).imdbRating;

  // Extract YouTube ID if trailerUrl is present
  const getYouTubeEmbed = (url?: string | null) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0` : null;
  };
  const trailerEmbed = getYouTubeEmbed(current.trailerUrl);

  return (
    <div className="relative w-full min-h-[490px] sm:min-h-[620px] lg:min-h-[720px] h-[75vh] sm:h-[82vh] lg:h-[88vh] bg-black overflow-hidden select-none">
      {/* Backdrop Image with Transitions */}
      <div className="absolute inset-0">
        <LazyImage
          key={current.id || currentIndex}
          src={backdropUrl}
          alt={current.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-60 transition-opacity duration-1000"
          fallbackText={current.title}
        />
        {/* Cinema Vignette Gradients */}
        {/* Top protective gradient ensuring fixed navbar is always distinct and never collides */}
        <div className="absolute top-0 left-0 right-0 h-36 sm:h-44 bg-gradient-to-b from-[#08080c] via-[#08080c]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080c] via-[#08080c]/80 to-transparent w-full md:w-3/4 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-[#08080c]/40 z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-36 bg-gradient-to-t from-[#08080c] to-transparent z-10 pointer-events-none" />
      </div>

      {/* Hero Content Container with guaranteed top clearance for fixed header */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pt-20 sm:pt-36 lg:pt-40 pb-10 sm:pb-20">
        <div className="max-w-2xl space-y-2.5 sm:space-y-3 mx-auto sm:mx-0 flex flex-col items-center sm:items-start text-center sm:text-left">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
            <span className="px-2 sm:px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-[#e50914] text-white shadow-sm">
              {isSeries ? "Featured Series" : "Featured Movie"}
            </span>
            {rating !== null && rating !== undefined && (
              <div className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold bg-black/70 text-[#f5c518] border border-white/10 backdrop-blur-md">
                <Star className="w-3.5 h-3.5 fill-[#f5c518]" />
                <span>{formatRating(rating)} IMDb</span>
              </div>
            )}
            <span className="text-xs text-slate-300 font-medium px-1">
              {current.releaseYear} &bull; {isSeries ? "All Seasons" : formatDuration(current.runtime)}
            </span>
          </div>

          {/* Centered Genre Dots on Mobile */}
          {current.genres && current.genres.length > 0 && (
            <div className="text-xs text-slate-300 font-medium flex items-center justify-center sm:justify-start gap-1.5">
              {current.genres.slice(0, 3).map((g: any, i: number) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-[#e50914] font-bold">&bull;</span>}
                  <span>{g?.genre?.name || g?.name}</span>
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-display text-2xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.1] drop-shadow-2xl line-clamp-2 sm:line-clamp-3">
            {current.title}
          </h1>

          {/* Synopsis (hidden or truncated on small mobile to keep Netflix billboard clean) */}
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base line-clamp-2 sm:line-clamp-3 leading-relaxed drop-shadow max-w-xl hidden sm:block">
            {current.overview || "Stream in 4K Ultra-HD with multiple high-speed servers and direct download links on Movies.snishad."}
          </p>

          {/* Netflix Signature Mobile Action Bar (sm:hidden) */}
          <div className="flex sm:hidden items-center justify-center gap-7 w-full pt-3 pb-1">
            {/* 1. My List Vertical Button */}
            <WatchlistButton
              movie={current}
              netflixMobile={true}
            />

            {/* 2. Netflix Signature White Play Button */}
            <Link
              href={watchHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-md bg-white hover:bg-neutral-200 text-black font-extrabold text-sm transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-black" />
              <span>Play</span>
            </Link>

            {/* 3. Details Info Button */}
            <Link
              href={detailHref}
              className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer select-none"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 bg-black/40 flex items-center justify-center hover:border-white/40">
                <Info className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[10px] font-semibold tracking-tight">Info</span>
            </Link>
          </div>

          {/* Desktop Action CTAs (hidden on mobile, visible on sm:) */}
          <div className="hidden sm:flex flex-wrap items-center gap-2.5 pt-2">
            <Link
              href={watchHref}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-extrabold text-sm transition-all shadow-xl hover:scale-[1.02] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Play Now</span>
            </Link>

            {trailerEmbed && (
              <button
                onClick={() => setTrailerModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/15 transition-all cursor-pointer"
              >
                <span>Trailer</span>
              </button>
            )}

            <Link
              href={detailHref}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-black/50 hover:bg-black/70 text-slate-300 hover:text-white font-medium text-xs sm:text-sm backdrop-blur-md border border-white/10 transition-all cursor-pointer"
            >
              <Info className="w-4 h-4" />
              <span>Details</span>
            </Link>

            <WatchlistButton
              movie={current}
              showText={true}
              className="!w-auto !justify-center !px-4 !py-2.5 sm:!py-3 !rounded-xl !bg-black/50 hover:!bg-black/70 !text-slate-300 hover:!text-white font-medium text-xs sm:text-sm !border !border-white/10 !backdrop-blur-md cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      {items.length > 1 && (
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-[#e50914]" : "w-2.5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Trailer Modal */}
      {trailerModalOpen && trailerEmbed && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <button
              onClick={() => setTrailerModalOpen(false)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/80 text-white hover:bg-[#e50914] flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={trailerEmbed}
              title={`${current.title} Trailer`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
