"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Film, Tv, Flame, Search, Bookmark } from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();
  const [watchlistCount, setWatchlistCount] = useState<number>(0);

  useEffect(() => {
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
    return () => {
      window.removeEventListener("watchlist-updated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  // Hide bottom nav on watch pages to provide true cinema immersion
  if (pathname.startsWith("/watch/")) {
    return null;
  }

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "New & Hot", href: "/trending", icon: Flame },
    { label: "Catalog", href: "/movies", icon: Film },
    { label: "Search", href: "/search", icon: Search },
    { label: "My List", href: "/watchlist", icon: Bookmark, badge: watchlistCount },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c12]/95 backdrop-blur-2xl border-t border-white/10 px-3 py-1.5 shadow-[0_-4px_25px_rgba(0,0,0,0.9)] pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]"
      aria-label="Mobile Navigation"
    >
      <div className="grid grid-cols-5 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 transition-all duration-200 select-none cursor-pointer ${
                isActive
                  ? "text-white font-bold"
                  : "text-[#8c8c9a] hover:text-white"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? "scale-110 text-white stroke-[2.3]" : "stroke-[1.8]"
                  }`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2.5 bg-[#e50914] text-white text-[9px] font-black min-w-[15px] h-[15px] flex items-center justify-center rounded-full px-1 shadow-sm">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight truncate max-w-[62px] ${
                  isActive ? "text-white font-semibold" : "text-[#8c8c9a]"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] mt-0.5 shadow-sm shadow-red-500/50" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomNav;
