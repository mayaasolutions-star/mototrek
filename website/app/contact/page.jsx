"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main id="top">
      {/* HERO */}
      <section className="relative min-h-[80vh] lg:min-h-[650px] flex items-end">
        <img
          src="/images/contact-hero.webp"
          data-template-id="hero-image"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          alt="Mototrek Motorcycle Riding Gear Store in Pune"
        />

        <div className="hero-overlay absolute inset-0 bg-[linear-gradient(90deg,rgba(16,40,30,.94)_0%,rgba(16,40,30,.72)_48%,rgba(16,40,30,.24)_100%)]"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-10 pb-12 sm:pb-16 lg:pb-24 text-white">
          <div className="max-w-3xl fade-up">
            <p className="uppercase tracking-[0.30em] text-xs font-semibold text-[#f0b04d] mb-5">
              CONTACT US
            </p>

            <h1 className="serif font-bold leading-[1.1] text-4xl sm:text-5xl lg:text-6xl mb-5">
              We're Here<br />
              Whenever You Need Us.
            </h1>

            <p className="text-base sm:text-lg leading-7 sm:leading-8 text-white/85 max-w-2xl">
              Whether you're looking for the right riding gear, planning your next adventure or simply have a question, we'd love to hear from you. Scroll down to choose the best way to connect with our team.
            </p>
          </div>
        </div>
      </section>

      {/* LET'S CONNECT */}
      <section id="connect" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1.55fr_0.85fr] gap-10 lg:gap-14 items-start">
            {/* LEFT CONTENT */}
            <div>
              {/* Heading */}
              <div className="max-w-3xl mb-16">
                <p className="uppercase tracking-[0.30em] text-xs font-semibold text-[#6c756b] mb-4">
                  LET'S CONNECT
                </p>

                <h2 className="serif text-4xl lg:text-5xl font-bold text-[#18382a] leading-tight mb-6">
                  We're Here to Help
                </h2>

                <p className="text-lg leading-8 text-[#59635a]">
                  Have a question, need riding gear recommendations or planning a visit? Reach out in the way that's most convenient for you—we're always happy to help.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid md:grid-cols-2 gap-5 lg:gap-8">
                {/* Visit */}
                <article className="rounded-2xl border border-[#18382a]/10 p-6 lg:p-8 hover:-translate-y-1 hover:shadow-xl transition">
                  <MapPin className="w-10 h-10 text-[#c45d2a] mb-6" />

                  <h3 className="text-2xl font-semibold text-[#18382a] mb-4">
                    Visit Our Store
                  </h3>

                  <p className="leading-7 text-[#59635a] mb-6">
                    See the gear in person, try the right fit and get honest advice from our team before you buy.
                  </p>

                  <a
                    href="https://maps.app.goo.gl/ZTWPXaEB6hmSL4uy7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#c45d2a] hover:underline"
                  >
                    Get Directions →
                  </a>
                </article>

                {/* WhatsApp */}
                <article className="rounded-2xl border border-[#18382a]/10 p-8 hover:shadow-xl transition">
                  <MessageCircle className="w-10 h-10 text-[#c45d2a] mb-6" />

                  <h3 className="text-2xl font-semibold text-[#18382a] mb-4">
                    Chat on WhatsApp
                  </h3>

                  <p className="leading-7 text-[#59635a] mb-6">
                    Need a quick answer? Message us for product enquiries, availability or riding gear recommendations.
                  </p>

                  <a
                    href="https://wa.me/919511901753"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#c45d2a] hover:underline"
                  >
                    Start Chat →
                  </a>
                </article>

                {/* Call */}
                <article className="rounded-2xl border border-[#18382a]/10 p-8 hover:shadow-xl transition">
                  <PhoneCall className="w-10 h-10 text-[#c45d2a] mb-6" />

                  <h3 className="text-2xl font-semibold text-[#18382a] mb-4">
                    Give Us a Call
                  </h3>

                  <p className="leading-7 text-[#59635a] mb-6">
                    Prefer talking? Call us for product guidance, store information or any questions before your visit.
                  </p>

                  <a
                    href="tel:+919511901753"
                    className="font-semibold text-[#c45d2a] hover:underline"
                  >
                    Call Now →
                  </a>
                </article>

                {/* Expert Help */}
                <article className="rounded-2xl bg-[#18382a] p-8 text-white">
                  <ShieldCheck className="w-10 h-10 text-[#f0b04d] mb-6" />

                  <h3 className="text-2xl font-semibold mb-4">
                    Need Help Choosing?
                  </h3>

                  <p className="leading-7 text-white/80 mb-6">
                    Tell us what you ride, where you ride and your budget. We'll help you choose gear that suits your needs.
                  </p>

                  <a
                    href="https://wa.me/919511901753"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#f0b04d] hover:text-white"
                  >
                    Talk to a Gear Expert →
                  </a>
                </article>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:sticky lg:top-28 rounded-3xl bg-[#18382a] p-6 sm:p-8 lg:p-10 text-white shadow-xl">
              <p className="uppercase tracking-[0.30em] text-xs font-semibold text-[#f0b04d] mb-4">
                BEFORE YOU VISIT
              </p>

              <h3 className="serif text-2xl lg:text-3xl font-bold mb-6">
                What You Can Expect
              </h3>

              <p className="text-white/75 leading-7 mb-8">
                Whether you're buying your first helmet or upgrading your riding setup, we'll help you choose gear that fits your motorcycle, riding style and budget.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#f0b04d] shrink-0" />
                  <p className="text-white/80">
                    Try different sizes before you buy.
                  </p>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#f0b04d] shrink-0" />
                  <p className="text-white/80">
                    Compare products from trusted brands.
                  </p>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#f0b04d] shrink-0" />
                  <p className="text-white/80">
                    Get honest recommendations from experienced riders.
                  </p>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#f0b04d] shrink-0" />
                  <p className="text-white/80">
                    Find the right gear for commuting, touring and adventure riding.
                  </p>
                </div>
              </div>

              <div className="mt-10 rounded-2xl bg-white/10 p-5">
                <p className="text-sm uppercase tracking-widest text-[#f0b04d] mb-2">
                  Walk-ins Welcome
                </p>

                <p className="text-white/80 leading-7">
                  No appointment needed. Drop in during store hours and our team will be happy to help.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
