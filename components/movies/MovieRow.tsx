"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieItem } from "@/lib/types";
import { MovieCard } from "./MovieCard";

interface MovieRowProps {
  title: string;
  items: MovieItem[];
  viewAllHref?: string;
  showRank?: boolean;
}

export function MovieRow({ title, items, viewAllHref, showRank = false }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="relative py-6 sm:py-8 group/row">
      {/* Row Header */}
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-5 bg-[#e50914] rounded-full"></div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white font-display uppercase">
            {title}
          </h2>
        </div>

        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1 group/link"
          >
            <span>Explore All</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform text-[#e50914]" />
          </Link>
        )}
      </div>

      {/* Row Scroll Container */}
      <div className="relative px-4 sm:px-6 lg:px-8">
        {/* Left Arrow (Desktop Only) */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-[#e50914] text-white items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-200 shadow-xl backdrop-blur-md border border-white/10 -translate-x-2 group-hover/row:translate-x-0 cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Horizontal Slider with Touch Momentum & Snapping */}
        <div
          ref={rowRef}
          className="flex items-center gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {items.map((movie, idx) => (
            <div key={movie.id} className="w-[125px] sm:w-[165px] md:w-[190px] flex-shrink-0 snap-start">
              <MovieCard movie={movie} rank={showRank ? idx + 1 : undefined} priority={idx < 4} />
            </div>
          ))}
        </div>

        {/* Right Arrow (Desktop Only) */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-[#e50914] text-white items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-200 shadow-xl backdrop-blur-md border border-white/10 translate-x-2 group-hover/row:translate-x-0 cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
