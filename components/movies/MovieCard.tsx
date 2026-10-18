import React from "react";
import Link from "next/link";
import { Star, Play } from "lucide-react";
import { MovieItem } from "@/lib/types";
import { formatRating, getImageUrl } from "@/lib/utils";
import { LazyImage } from "@/components/ui/LazyImage";
import { WatchlistButton } from "./WatchlistButton";
export { MovieCardSkeleton } from "@/components/ui/MovieCardSkeleton";

interface MovieCardProps {
  movie: MovieItem;
  rank?: number;
  priority?: boolean;
}

export function MovieCard({ movie, rank, priority = false }: MovieCardProps) {
  const isSeries = movie.type === "SERIES";
  const href = isSeries ? `/series/${movie.slug}` : `/movie/${movie.slug}`;
  const posterUrl = getImageUrl(movie.posterPath || (movie as any).poster);
  const rating = movie.rating ?? (movie as any).imdbRating;

  return (
    <div className="group relative flex-shrink-0 select-none">
      <Link
        href={href}
        prefetch={false}
        className="block relative overflow-hidden rounded-md sm:rounded-xl bg-[#14141c] border border-white/5 shadow-md group-hover:border-red-600/40 group-hover:shadow-2xl group-hover:shadow-red-950/30 transition-all duration-300"
      >
        {/* Poster Image Container */}
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#161620]">
          <LazyImage
            src={posterUrl}
            alt={movie.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fallbackText={movie.title}
          />

          {/* Vignette & Play Icon on Hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-lg shadow-red-600/40 transform scale-75 group-hover:scale-100 transition-transform duration-200">
              <Play className="w-4 sm:w-5 h-4 sm:h-5 fill-white ml-0.5" />
            </div>
          </div>

          {/* Series Badge (Top Left) */}
          {isSeries && (
            <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-blue-600/85 backdrop-blur-md text-white shadow-sm">
                Series
              </span>
            </div>
          )}

          {/* Rating Badge (Top Right) */}
          {rating !== null && rating !== undefined && (
            <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold bg-black/75 backdrop-blur-md text-[#f5c518] border border-white/10 shadow-sm">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#f5c518]" />
              <span>{formatRating(rating)}</span>
            </div>
          )}

          {/* Quick Bookmark Button (Bottom Right) */}
          <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <WatchlistButton movie={movie} className="p-1.5 rounded-lg border backdrop-blur-md" />
          </div>

          {/* Iconic Netflix Top 10 Outlined Typography */}
          {rank !== undefined && (
            <div
              className="absolute -bottom-2 sm:-bottom-3 -left-1 sm:-left-2 text-6xl sm:text-7xl lg:text-8xl font-display font-black leading-none select-none pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
              style={{
                color: "#08080c",
                WebkitTextStroke: "2.5px #737380",
                textShadow: "0 0 16px rgba(0,0,0,0.9)",
              }}
            >
              {rank}
            </div>
          )}
        </div>

        {/* Title & Metadata Strip */}
        <div className="p-2 sm:p-3 bg-[#111116]">
          <h3
            className="text-xs sm:text-sm font-semibold text-slate-100 truncate group-hover:text-[#e50914] transition-colors"
            title={movie.title}
          >
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 mt-0.5 sm:mt-1">
            <span>{movie.releaseYear || "2024"}</span>
            <span className="uppercase text-[9px] sm:text-[10px] tracking-wider">{movie.language || "Hindi"}</span>
          </div>
          {(movie as any).matchedInAbout && (
            <div className="mt-1">
              <span className="text-[9px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded inline-block">
                Matched in About
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

