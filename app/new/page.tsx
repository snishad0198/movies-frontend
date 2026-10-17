import React from "react";
import Link from "next/link";
import { getNewReleases, getGenres } from "@/lib/api";
import { MovieCard } from "@/components/movies/MovieCard";
import {
  Sparkles,
  Filter,
  Film,
  Tv,
  Globe,
  Flame,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  RotateCcw,
} from "lucide-react";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "New Releases (2026) - Watch Latest Movies & Series in HD | Movies.snishad",
  description:
    "Discover the latest 2026 cinema releases, trending Bollywood blockbusters, Hollywood hits, anime, and OTT web series. Stream in Ultra HD with fast direct downloads on Movies.snishad.",
  keywords: [
    "new movie releases",
    "latest web series",
    "2026 movies",
    "new bollywood movies",
    "watch latest cinema",
    "movies snishad new releases",
  ],
  openGraph: {
    title: "New Releases (2026) - Latest Movies & Series | Movies.snishad",
    description:
      "Explore newly released cinema blockbusters, fresh OTT seasons, and trending anime in Ultra HD.",
    type: "website",
    url: "https://movies-snishad.vercel.app/new",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Releases (2026) | Movies.snishad",
    description: "Stream and download newly released movies and series in HD.",
  },
};

interface NewReleasesPageProps {
  searchParams: {
    page?: string;
    category?: string;
    genre?: string;
    year?: string;
    sort?: string;
  };
}

const NEW_CATEGORIES = [
  { id: "all", label: "All New Releases", icon: Sparkles },
  { id: "movies", label: "New Movies", icon: Film },
  { id: "series", label: "New Web Series", icon: Tv },
  { id: "anime", label: "New Anime", icon: Sparkles },
  { id: "bollywood", label: "Bollywood", icon: Flame },
  { id: "hollywood", label: "Hollywood", icon: Globe },
  { id: "south", label: "South Indian", icon: Flame },
];

const YEAR_OPTIONS = [
  { id: "all", label: "All Years" },
  { id: "2026", label: "2026 Hits" },
  { id: "2025", label: "2025 Releases" },
  { id: "2024", label: "2024 Releases" },
];

const SORT_OPTIONS = [
  { id: "latest", label: "Latest First" },
  { id: "rating", label: "Top Rated (IMDb)" },
  { id: "popularity", label: "Most Popular" },
];

export default async function NewReleasesPage({ searchParams }: NewReleasesPageProps) {
  const page = Math.max(1, parseInt(searchParams.page || "1", 10));
  const category = searchParams.category || "all";
  const genre = searchParams.genre;
  const year = searchParams.year;
  const sort = searchParams.sort || "latest";

  const [releaseData, genres] = await Promise.all([
    getNewReleases({
      page,
      category: category !== "all" ? category : undefined,
      genre,
      year: year !== "all" ? year : undefined,
      sort,
    }),
    getGenres(),
  ]);

  const items = releaseData?.items || [];
  const pagination = releaseData?.pagination || { page: 1, totalPages: 1, hasMore: false };

  // Helper to build filter query string
  const buildUrl = (updates: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams();
    const current = {
      ...(category !== "all" ? { category } : {}),
      ...(genre ? { genre } : {}),
      ...(year && year !== "all" ? { year } : {}),
      ...(sort !== "latest" ? { sort } : {}),
      ...updates,
    };

    Object.entries(current).forEach(([k, v]) => {
      if (v !== undefined && v !== "" && v !== "all") {
        params.set(k, String(v));
      }
    });

    const str = params.toString();
    return str ? `/new?${str}` : "/new";
  };

  const hasActiveFilters = category !== "all" || genre || (year && year !== "all") || sort !== "latest";

  return (
    <div className="min-h-screen bg-[#08080c] pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-[#e50914] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#e50914] animate-pulse" />
            <span>Fresh Arrivals • Ultra HD &bull; Multi-Audio</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-black text-white uppercase tracking-wide">
            New <span className="text-[#e50914]">Releases</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Freshly added cinema blockbusters, web episodes, and high-octane anime with fast streaming.
          </p>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs text-slate-400 font-medium">Sort by:</span>
          <div className="flex items-center gap-1 bg-[#121218] p-1 rounded-xl border border-white/10">
            {SORT_OPTIONS.map((s) => {
              const isActive = sort === s.id;
              return (
                <Link
                  key={s.id}
                  href={buildUrl({ sort: s.id, page: 1 })}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#e50914] text-white shadow-sm shadow-red-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {s.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Unified Streaming Control Toolbar */}
      <div className="bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl space-y-3">
        {/* Category Pills (Row 1) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth pb-1">
          {NEW_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = category === cat.id;
            return (
              <Link
                key={cat.id}
                href={buildUrl({ category: cat.id, page: 1 })}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#e50914] text-white shadow-md shadow-red-600/30 font-bold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{cat.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Secondary Filters Bar: Year, Genres & Active Status (Row 2) */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5 text-xs">
          {/* Release Year */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-shrink-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
              Year:
            </span>
            {YEAR_OPTIONS.map((y) => {
              const isActive = (y.id === "all" && (!year || year === "all")) || year === y.id;
              return (
                <Link
                  key={y.id}
                  href={buildUrl({ year: y.id, page: 1 })}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-white/20 text-white font-bold border border-white/30"
                      : "bg-white/[0.03] hover:bg-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {y.label.replace(" Releases", "").replace(" Hits", "")}
                </Link>
              );
            })}
          </div>

          {/* Quick Genre Pills */}
          {genres.length > 0 && (
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1 min-w-[200px]">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
                Genre:
              </span>
              {genres.slice(0, 8).map((g) => {
                const isActive = genre === g.slug;
                return (
                  <Link
                    key={g.id || g.slug}
                    href={buildUrl({ genre: isActive ? undefined : g.slug, page: 1 })}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-[#e50914] text-white font-bold shadow-sm"
                        : "bg-white/[0.03] hover:bg-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    {g.name}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Active Filter Clear Tag */}
          {hasActiveFilters && (
            <Link
              href="/new"
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-600/15 border border-red-500/30 text-[#e50914] hover:bg-red-600/25 text-xs font-bold transition-all cursor-pointer flex-shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </Link>
          )}
        </div>
      </div>

      {/* 6. Titles Grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {items.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center text-slate-400 bg-white/[0.02] rounded-3xl border border-white/5 space-y-3">
          <Film className="w-12 h-12 mx-auto text-slate-600" />
          <h3 className="text-base font-semibold text-white">No new releases found</h3>
          <p className="text-xs max-w-sm mx-auto">
            Try adjusting your category, genre, or year filter to see available titles.
          </p>
          <Link
            href="/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e50914] text-white text-xs font-bold shadow-lg shadow-red-600/30"
          >
            View All New Releases
          </Link>
        </div>
      )}

      {/* 7. Pagination Controls */}
      <div className="flex items-center justify-center gap-3 pt-8 border-t border-white/5">
        {page > 1 && (
          <Link
            href={buildUrl({ page: page - 1 })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141420] hover:bg-[#1f1f32] text-white text-xs font-bold border border-white/10 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Link>
        )}

        <span className="px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-semibold text-slate-300">
          Page {page} of {pagination.totalPages || 20}
        </span>

        {pagination.hasMore && (
          <Link
            href={buildUrl({ page: page + 1 })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#e50914] hover:bg-red-700 text-white text-xs font-bold border border-red-500/30 transition-all shadow-md shadow-red-600/30 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
