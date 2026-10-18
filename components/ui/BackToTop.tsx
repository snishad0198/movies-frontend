"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      type="button"
      aria-label="Scroll back to top"
      title="Back to Top"
      className="hidden md:flex items-center justify-center fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-[#e50914] hover:bg-[#ff1f2d] text-white shadow-xl shadow-red-950/50 border border-white/20 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md animate-in fade-in zoom-in-75 duration-200"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
