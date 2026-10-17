import React from "react";
import { getMovies, getGenres } from "@/lib/api";
import { MovieCard } from "@/components/movies/MovieCard";
import { Compass } from "lucide-react";

interface GenrePageProps {
  params: {
    slug: string;
  };
}

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: GenrePageProps): Promise<Metadata> {
  const genreName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  const title = `Best ${genreName} Movies & Series - Watch & Download | Movies.snishad`;
  const description = `Explore top-rated ${genreName} movies and TV shows in Ultra HD. Stream online in 1080p with multiple fast cloud mirrors and direct downloads on Movies.snishad.`;

  return {
    title,
    description,
    keywords: [
      `${genreName.toLowerCase()} movies`,
      `watch ${genreName.toLowerCase()} online`,
      `${genreName.toLowerCase()} series`,
      "movies snishad",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://movies-snishad.vercel.app/genre/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function GenrePage({ params }: GenrePageProps) {
  const genres = await getGenres();
  const currentGenre = genres.find((g) => g.slug === params.slug) || {
    name: params.slug.toUpperCase(),
    slug: params.slug,
  };

  const data = await getMovies({ genre: params.slug, limit: 30 });
  const items = data?.movies || [];

  return (
    <div className="min-h-screen bg-[#08080c] pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Compass className="w-6 h-6 text-[#e50914]" />
          <h1 className="font-display text-2xl sm:text-4xl font-black text-white uppercase tracking-wide">
            {currentGenre.name} Movies &amp; Series
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Showing curated titles classified under {currentGenre.name}.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {items.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-slate-400">
          <p className="text-base font-semibold text-white mb-1">No titles found for {currentGenre.name}</p>
          <p className="text-xs">Try exploring other genres from the navigation bar.</p>
        </div>
      )}
    </div>
  );
}
