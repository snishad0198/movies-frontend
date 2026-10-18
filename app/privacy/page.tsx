import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck, Lock, Eye, FileText, ChevronRight, Mail, Instagram, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Movies.snishad",
  description: "Learn how Movies.snishad protects your privacy, manages cookies, and handles data security across our entertainment platform.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 18, 2026";

  return (
    <div className="min-h-screen bg-[#08080c] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 text-slate-300">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-white font-semibold">Privacy Policy</span>
        </div>

        {/* Header Hero */}
        <div className="space-y-3 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>User Privacy & Data Protection</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400">
            Last Updated: <strong className="text-white">{lastUpdated}</strong>
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-300">
          {/* Section 1 */}
          <section className="p-6 rounded-2xl bg-[#101018] border border-white/5 space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#e50914] text-white text-xs font-black flex items-center justify-center">1</span>
              <span>Introduction &amp; Commitment</span>
            </h2>
            <p>
              Welcome to <strong className="text-white">Movies.snishad</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the Platform&rdquo;). We are committed to providing you with a clean, secure, and privacy-respecting entertainment experience. This Privacy Policy outlines what information is collected, how it is handled, and your choices regarding your browsing privacy.
            </p>
            <p>
              By accessing or using Movies.snishad, you agree to the collection and handling of information as described in this policy.
            </p>
          </section>

          {/* Section 2 */}
          <section className="p-6 rounded-2xl bg-[#101018] border border-white/5 space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#e50914] text-white text-xs font-black flex items-center justify-center">2</span>
              <span>Information We Collect</span>
            </h2>
            <p>
              Movies.snishad does not require account registration or collect sensitive personal credentials (such as credit cards or government IDs). The limited information we process includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Client-Side Storage:</strong> Your Watchlist, Continue Watching queue, and Region preferences are stored locally in your browser&apos;s <code className="text-[#e50914] bg-white/5 px-1 rounded">localStorage</code> and cookies for your convenience. This data remains on your device.
              </li>
              <li>
                <strong className="text-white">Technical Diagnostics:</strong> Standard web server logs including IP address, browser type, operating system, and approximate country/region (for localized recommendations).
              </li>
              <li>
                <strong className="text-white">Search Queries:</strong> Movie and web series search queries entered to retrieve matching titles from our database.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="p-6 rounded-2xl bg-[#101018] border border-white/5 space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#e50914] text-white text-xs font-black flex items-center justify-center">3</span>
              <span>Third-Party Services &amp; Embeds</span>
            </h2>
            <p>
              Our platform interacts with trusted third-party providers to enhance functionality:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">The Movie Database (TMDB):</strong> Used for metadata, synopsis, cast, and high-definition poster artwork.
              </li>
              <li>
                <strong className="text-white">Google Analytics (GA4):</strong> Aggregated and anonymized traffic metrics to evaluate page speed, popular titles, and browser compatibility.
              </li>
              <li>
                <strong className="text-white">Third-Party Video Hosts:</strong> Streaming video embeds are served from external public CDN servers. Interacting with third-party player frames is subject to those external domains&apos; privacy terms.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="p-6 rounded-2xl bg-[#101018] border border-white/5 space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#e50914] text-white text-xs font-black flex items-center justify-center">4</span>
              <span>Content Hosting &amp; DMCA</span>
            </h2>
            <p>
              Movies.snishad is an entertainment index and catalog. <strong className="text-white">We do not host, store, or upload video files or copyrighted media on our own servers.</strong> All streaming links and embeds point to publicly available third-party sources on the internet.
            </p>
            <p>
              If you are a copyright owner and wish to request removal of an index link, please email us directly with verifiable evidence of ownership, and the link will be removed immediately.
            </p>
          </section>

          {/* Section 5 */}
          <section className="p-6 rounded-2xl bg-[#101018] border border-white/5 space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#e50914] text-white text-xs font-black flex items-center justify-center">5</span>
              <span>Contact Us</span>
            </h2>
            <p>
              For privacy inquiries, DMCA requests, or general feedback, connect with the developer directly:
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="mailto:snishad01985@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#e50914]" />
                <span>snishad01985@gmail.com</span>
              </a>
              <a
                href="https://instagram.com/snishad.me_"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/30 font-semibold transition-all cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>@snishad.me_</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
