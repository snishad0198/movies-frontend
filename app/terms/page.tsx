import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { FileText, ShieldAlert, CheckCircle2, ChevronRight, Mail, Instagram, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Movies.snishad",
  description: "Terms and conditions governing the use of Movies.snishad streaming and entertainment index.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfServicePage() {
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
          <span className="text-white font-semibold">Terms of Service</span>
        </div>

        {/* Header Hero */}
        <div className="space-y-3 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
            <FileText className="w-4 h-4" />
            <span>Platform Agreement & Guidelines</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Terms of Service
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
              <span>Acceptance of Terms</span>
            </h2>
            <p>
              By accessing, browsing, or using <strong className="text-white">Movies.snishad</strong> (&ldquo;the Website&rdquo; or &ldquo;the Service&rdquo;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this platform.
            </p>
          </section>

          {/* Section 2 */}
          <section className="p-6 rounded-2xl bg-[#101018] border border-white/5 space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#e50914] text-white text-xs font-black flex items-center justify-center">2</span>
              <span>Service Description &amp; Educational Purpose</span>
            </h2>
            <p>
              Movies.snishad operates as an online database and entertainment search aggregator. The platform provides reviews, metadata, trailers, and catalog organization for movies and television series.
            </p>
            <p>
              This website was engineered as a high-performance demonstration of modern web engineering, responsive user interfaces, and Next.js technology for personal and educational purposes.
            </p>
          </section>

          {/* Section 3 */}
          <section className="p-6 rounded-2xl bg-[#101018] border border-white/5 space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#e50914] text-white text-xs font-black flex items-center justify-center">3</span>
              <span>Non-Hosting &amp; Third-Party Content</span>
            </h2>
            <p>
              <strong className="text-white">Movies.snishad does not host, upload, or store any video files, media streams, or digital content on its servers.</strong> All media playback and streaming embeds are provided by autonomous third-party servers and public internet indexers.
            </p>
            <p>
              We do not control, endorse, or assume responsibility for the content, privacy policies, or practices of any third-party websites or services linked to our platform.
            </p>
          </section>

          {/* Section 4 */}
          <section className="p-6 rounded-2xl bg-[#101018] border border-white/5 space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#e50914] text-white text-xs font-black flex items-center justify-center">4</span>
              <span>DMCA &amp; Copyright Compliance</span>
            </h2>
            <p>
              We respect the intellectual property rights of creators and content owners. If you believe that your copyrighted work is accessible through an index link on Movies.snishad without authorization, you may submit a formal notification with:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>Direct URL link to the page containing the reference on our platform.</li>
              <li>Your contact information and a statement of good-faith belief.</li>
            </ul>
            <p className="pt-1">
              Upon receipt of valid notice, the relevant link or reference will be taken down promptly.
            </p>
          </section>

          {/* Section 5 */}
          <section className="p-6 rounded-2xl bg-[#101018] border border-white/5 space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#e50914] text-white text-xs font-black flex items-center justify-center">5</span>
              <span>Limitation of Liability</span>
            </h2>
            <p>
              Movies.snishad is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied. In no event shall the platform owner, developer (SNishad), or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising from your access to or use of the service.
            </p>
          </section>

          {/* Section 6 */}
          <section className="p-6 rounded-2xl bg-[#101018] border border-white/5 space-y-3">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#e50914] text-white text-xs font-black flex items-center justify-center">6</span>
              <span>Developer Attribution &amp; Contact</span>
            </h2>
            <p>
              Created and maintained by <strong className="text-white">SNishad</strong>. For legal matters, business inquiries, or technical support, contact:
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
