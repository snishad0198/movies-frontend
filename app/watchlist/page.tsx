"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, Film, Tv, Trash2, Compass, Play } from "lucide-react";
import { MovieItem } from "@/lib/types";
import { MovieCard } from "@/components/movies/MovieCard";

export const dynamic = "force-dynamic";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<MovieItem[]>([]);
  const [filter, setFilter] = useState<"ALL" | "MOVIE" | "SERIES">("ALL");
  const [mounted, setMounted] = useState(false);

  const loadWatchlist = () => {
    try {
      const stored = localStorage.getItem("sn_watchlist");
      if (stored) {
        setWatchlist(JSON.parse(stored));
      } else {
        setWatchlist([]);
      }
    } catch {
      setWatchlist([]);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadWatchlist();

    const handleUpdate = () => loadWatchlist();
    window.addEventListener("watchlist-updated", handleUpdate);
    return () => window.removeEventListener("watchlist-updated", handleUpdate);
  }, []);

  const clearAll = () => {
    if (window.confirm("Are you sure you want to clear your entire watchlist?")) {
      localStorage.removeItem("sn_watchlist");
      setWatchlist([]);
      window.dispatchEvent(new Event("watchlist-updated"));
    }
  };

  const filteredItems = watchlist.filter((item) => {
    if (filter === "MOVIE") return item.type === "MOVIE";
    if (filter === "SERIES") return item.type === "SERIES";
    return true;
  });

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#08080c] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
        <div className="h-10 bg-white/5 rounded-2xl w-48 mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-white/5 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080c] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#e50914] mb-1">
            <Bookmark className="w-5 h-5 fill-current" />
            <span className="text-xs font-bold uppercase tracking-widest">Personal Library</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            My Watchlist
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {watchlist.length} {watchlist.length === 1 ? "title" : "titles"} saved for later streaming and download.
          </p>
        </div>

        {watchlist.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 w-full sm:w-auto">
            {/* Filter Pills */}
            <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold overflow-x-auto no-scrollbar">
              <button
                onClick={() => setFilter("ALL")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filter === "ALL" ? "bg-[#e50914] text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                All ({watchlist.length})
              </button>
              <button
                onClick={() => setFilter("MOVIE")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  filter === "MOVIE" ? "bg-[#e50914] text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Movies</span>
              </button>
              <button
                onClick={() => setFilter("SERIES")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  filter === "SERIES" ? "bg-[#e50914] text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
                <span>Series</span>
              </button>
            </div>

            <button
              onClick={clearAll}
              className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid of Saved Items */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
          {filteredItems.map((movie) => (
            <MovieCard key={movie.id || movie.slug} movie={movie} />
          ))}
        </div>
      ) : watchlist.length > 0 ? (
        <div className="text-center py-20 bg-[#101016] border border-white/5 rounded-2xl p-8 max-w-md mx-auto space-y-3">
          <p className="text-sm text-slate-400">No {filter.toLowerCase()}s found in your watchlist.</p>
          <button
            onClick={() => setFilter("ALL")}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Show All Items
          </button>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-24 bg-[#101016] border border-white/5 rounded-3xl p-8 max-w-lg mx-auto space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-[#e50914]/10 border border-[#e50914]/20 flex items-center justify-center mx-auto text-[#e50914]">
            <Bookmark className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">Your Watchlist is Empty</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
              Tap the bookmark icon on any movie or series to save it here for fast access later.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/trending"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e50914] hover:bg-[#ff1f2d] text-white font-bold text-xs shadow-lg shadow-red-600/25 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Explore Trending</span>
            </Link>
            <Link
              href="/movies"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Browse All Movies</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
