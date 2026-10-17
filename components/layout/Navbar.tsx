"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Film,
  Tv,
  Flame,
  Sparkles,
  Menu,
  X,
  Compass,
  Bookmark,
  Star,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { searchTitles } from "@/lib/api";
import { MovieItem } from "@/lib/types";
import { getImageUrl } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [watchlistCount, setWatchlistCount] = useState<number>(0);
  const [dropdownResults, setDropdownResults] = useState<MovieItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Debounced live search autocomplete
  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length < 2) {
      setDropdownResults([]);
      setShowDropdown(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const results = await searchTitles(q);
        setDropdownResults((results || []).slice(0, 6));
        setShowDropdown(true);
      } catch {
        setDropdownResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Update watchlist badge count
    const updateCount = () => {
      try {
        const stored = localStorage.getItem("sn_watchlist");
        if (stored) {
          const list = JSON.parse(stored);
          setWatchlistCount(Array.isArray(list) ? list.length : 0);
        } else {
          setWatchlistCount(0);
        }
      } catch {
        setWatchlistCount(0);
      }
    };
    updateCount();
    window.addEventListener("watchlist-updated", updateCount);
    window.addEventListener("storage", updateCount);

    // Ctrl+K or / search focus shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "Escape") {
        setShowDropdown(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("watchlist-updated", updateCount);
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowDropdown(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies", icon: Film },
    { name: "Web Series", href: "/series", icon: Tv },
    { name: "Anime", href: "/anime", icon: Sparkles },
    { name: "Trending", href: "/trending", icon: Flame },
    { name: "New Releases", href: "/new", icon: Compass },
    { name: "Watchlist", href: "/watchlist", icon: Bookmark },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#08080c]/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
          : "bg-[#08080c]/85 sm:bg-gradient-to-b sm:from-[#08080c]/95 sm:via-[#08080c]/75 sm:to-[#08080c]/20 backdrop-blur-md border-b border-white/5 py-3.5 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <img
            src="/logo.jpg"
            alt="Movies.snishad"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover ring-1 ring-white/20 group-hover:ring-[#e50914] shadow-md shadow-black/50 transition-all"
          />
          <span className="font-display text-2xl sm:text-3xl tracking-wide text-white uppercase group-hover:text-red-500 transition-colors">
            Movies<span className="text-[#e50914]">.snishad</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isWatchlist = link.href === "/watchlist";
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#e50914] text-white shadow-md shadow-red-600/30"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{link.name}</span>
                {isWatchlist && watchlistCount > 0 && (
                  <span className="bg-[#e50914] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full ring-1 ring-black/40 animate-pulse">
                    {watchlistCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Search Bar & Actions */}
        <div className="flex items-center gap-3">
          <div ref={searchContainerRef} className="relative hidden sm:block w-52 lg:w-72">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onFocus={() => {
                  if (dropdownResults.length > 0) setShowDropdown(true);
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, series..."
                className="w-full bg-[#161622]/90 border border-white/10 rounded-full py-1.5 pl-9 pr-14 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {isSearching && (
                  <Loader2 className="w-3.5 h-3.5 text-[#e50914] animate-spin" />
                )}
                {searchQuery && !isSearching && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setShowDropdown(false);
                    }}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                <kbd className="text-[9px] font-mono text-slate-500 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded pointer-events-none hidden lg:inline-block">
                  /
                </kbd>
              </div>
            </form>

            {/* Live Autocomplete Dropdown */}
            {showDropdown && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#10101a] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2 space-y-1 max-h-96 overflow-y-auto no-scrollbar">
                  {dropdownResults.length > 0 ? (
                    <>
                      {dropdownResults.map((item) => {
                        const href = item.type === "SERIES" ? `/series/${item.slug}` : `/movie/${item.slug}`;
                        const posterUrl = getImageUrl(item.poster || item.posterPath);
                        const rating = item.imdbRating ?? item.rating;
                        const isAboutMatch = (item as any).matchedInAbout;

                        return (
                          <Link
                            key={item.id}
                            href={href}
                            onClick={() => {
                              setShowDropdown(false);
                              setSearchQuery("");
                            }}
                            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                          >
                            <img
                              src={posterUrl}
                              alt={item.title}
                              className="w-8 h-12 rounded-lg object-cover bg-black/40 ring-1 ring-white/10 shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <h4 className="text-xs font-semibold text-white group-hover:text-[#e50914] truncate transition-colors">
                                {item.title}
                              </h4>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                                <span>{item.releaseYear || "2024"}</span>
                                <span className="uppercase text-[9px] px-1 rounded bg-white/5">
                                  {item.type === "SERIES" ? "Series" : "Movie"}
                                </span>
                                {rating && (
                                  <span className="flex items-center gap-0.5 text-amber-400 font-semibold">
                                    <Star className="w-2.5 h-2.5 fill-amber-400" />
                                    <span>{Number(rating).toFixed(1)}</span>
                                  </span>
                                )}
                              </div>
                              {isAboutMatch && (
                                <span className="inline-block mt-0.5 text-[9px] text-[#e50914] font-medium">
                                  Matched in Overview / About
                                </span>
                              )}
                            </div>
                          </Link>
                        );
                      })}

                      <button
                        onClick={handleSearchSubmit}
                        className="w-full mt-1 p-2 rounded-xl bg-white/5 hover:bg-[#e50914] text-slate-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>See all results for &quot;{searchQuery}&quot;</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : !isSearching ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      <p>No direct matches found</p>
                      <button
                        onClick={handleSearchSubmit}
                        className="mt-2 text-[#e50914] font-bold hover:underline"
                      >
                        Search full catalog for &quot;{searchQuery}&quot;
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#e50914]" />
                      <span>Searching titles and overviews...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile search button */}
          <Link
            href="/search"
            className="sm:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
          >
            <Search className="w-5 h-5" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0c14] border-b border-white/10 px-4 py-4 mt-2 space-y-3 shadow-2xl">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, series..."
              className="w-full bg-[#161622] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#e50914]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#e50914] text-white"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span className="flex-1">{link.name}</span>
                  {link.href === "/watchlist" && watchlistCount > 0 && (
                    <span className="bg-[#e50914] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                      {watchlistCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

