"use client";

import React, { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { MovieItem } from "@/lib/types";

interface WatchlistButtonProps {
  movie: MovieItem;
  className?: string;
  showText?: boolean;
}

export function WatchlistButton({ movie, className = "", showText = false }: WatchlistButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sn_watchlist");
      if (stored) {
        const list: MovieItem[] = JSON.parse(stored);
        const exists = list.some((m) => String(m.id) === String(movie.id) || m.slug === movie.slug);
        setIsSaved(exists);
      }
    } catch {}
  }, [movie.id, movie.slug]);

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);

    try {
      const stored = localStorage.getItem("sn_watchlist");
      let list: MovieItem[] = stored ? JSON.parse(stored) : [];

      const exists = list.some((m) => String(m.id) === String(movie.id) || m.slug === movie.slug);

      if (exists) {
        list = list.filter((m) => String(m.id) !== String(movie.id) && m.slug !== movie.slug);
        setIsSaved(false);
      } else {
        list.unshift(movie);
        setIsSaved(true);
      }

      localStorage.setItem("sn_watchlist", JSON.stringify(list));
      window.dispatchEvent(new Event("watchlist-updated"));
    } catch (err) {
      console.error("Watchlist storage error:", err);
    }
  };

  return (
    <button
      onClick={toggleWatchlist}
      type="button"
      aria-label={isSaved ? "Remove from Watchlist" : "Add to Watchlist"}
      title={isSaved ? "Remove from Watchlist" : "Add to Watchlist"}
      className={`inline-flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
        animating ? "scale-125" : "scale-100"
      } ${
        isSaved
          ? "text-[#e50914] bg-[#e50914]/15 border-[#e50914]/40"
          : "text-slate-300 hover:text-white bg-black/60 hover:bg-black/80 border-white/10"
      } ${className}`}
    >
      <Bookmark
        className={`w-4 h-4 transition-colors ${
          isSaved ? "fill-[#e50914] text-[#e50914]" : "text-current"
        }`}
      />
      {showText && (
        <span className="text-xs font-semibold">
          {isSaved ? "In Watchlist" : "Add to Watchlist"}
        </span>
      )}
    </button>
  );
}
