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

export const dynamic = "force-dynamic";

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

      {/* 2. Format & Category Filter Strip */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-[#e50914]" />
          <span>Category &amp; Industry</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {NEW_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = category === cat.id;
            return (
              <Link
                key={cat.id}
                href={buildUrl({ category: cat.id, page: 1 })}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#e50914] text-white shadow-md shadow-red-600/30 scale-[1.02]"
                    : "bg-[#14141f] hover:bg-[#1c1c2b] text-slate-300 hover:text-white border border-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. Year & Decade Filters */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-blue-400" />
          <span>Release Year</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {YEAR_OPTIONS.map((y) => {
            const isActive = (y.id === "all" && (!year || year === "all")) || year === y.id;
            return (
              <Link
                key={y.id}
                href={buildUrl({ year: y.id, page: 1 })}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-white/20 text-white font-bold border border-white/30"
                    : "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-white/5"
                }`}
              >
                {y.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. Genres Filter Pills */}
      {genres.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Genres
            </span>
            {genre && (
              <Link
                href={buildUrl({ genre: undefined, page: 1 })}
                className="text-xs text-[#e50914] hover:underline"
              >
                Clear genre filter
              </Link>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {genres.map((g) => {
              const isActive = genre === g.slug;
              return (
                <Link
                  key={g.id || g.slug}
                  href={buildUrl({ genre: isActive ? undefined : g.slug, page: 1 })}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#e50914] text-white font-semibold shadow-sm"
                      : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
                  }`}
                >
                  {g.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Active Filters Summary Bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-slate-300">
          <span className="font-semibold text-white">Active Filters:</span>
          {category !== "all" && (
            <span className="px-2 py-0.5 rounded-lg bg-[#e50914]/20 text-[#e50914] border border-[#e50914]/30 uppercase font-semibold">
              Category: {category}
            </span>
          )}
          {genre && (
            <span className="px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold">
              Genre: {genre}
            </span>
          )}
          {year && year !== "all" && (
            <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
              Year: {year}
            </span>
          )}
          {sort !== "latest" && (
            <span className="px-2 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
              Sort: {sort}
            </span>
          )}
          <Link
            href="/new"
            className="ml-auto inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </Link>
        </div>
      )}

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
