"use client";

import React from "react";
import Link from "next/link";
import {
  Quote,
  ShieldCheck,
  ThumbsUp,
  Award,
  Users,
  BadgeCheck,
  ClipboardCheck,
  Store,
  Mountain,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Package,
  Bike,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main id="top">
      {/* HERO */}
      <section className="relative flex min-h-[85vh] lg:min-h-screen items-end overflow-hidden">
        <img
          src="/images/about-hero.webp"
          data-template-id="hero-image"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          alt="Mototrek team with premium motorcycle riding gear in Pune"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25"></div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-10 pb-12 sm:pb-16 lg:pb-28">
          <div className="max-w-3xl fade-up">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-[#d9ddd9]">
              OUR STORY
            </p>

            <h1 className="serif mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white">
              Built by Riders.<br />
              Driven by Trust.
            </h1>

            <p className="mb-8 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-white/90">
              Mototrek began with a simple belief—every rider deserves the right gear, honest advice and a community they can rely on. Today, we're proud to help riders choose genuine motorcycle riding gear with confidence while bringing people together through a shared passion for riding.
            </p>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section id="story" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="uppercase tracking-[0.30em] text-xs font-semibold text-[#6c756b] mb-4">
                OUR STORY
              </p>

              <h2 className="serif text-4xl lg:text-5xl font-bold leading-tight text-[#18382a] mb-8">
                It Started with a Simple Idea.
              </h2>

              <p className="text-lg leading-8 text-[#4d574f] mb-6">
                Like many riders, we struggled to find gear we could truly trust. There were endless options, conflicting advice and very little guidance from people who actually understood what riders needed.
              </p>

              <p className="text-lg leading-8 text-[#4d574f] mb-6">
                That's why Mototrek was created—to make choosing riding gear simple, honest and reliable. We believe every rider deserves genuine products, practical advice and recommendations based on real riding experience, not sales targets.
              </p>

              <p className="text-lg leading-8 text-[#4d574f] mb-10">
                Today, Mototrek is more than a riding gear store. It's a place where riders can discover trusted brands, ask questions, prepare for their next journey and become part of a growing community that shares the same passion for riding.
              </p>

              {/* Trust Box */}
              <div className="rounded-2xl bg-[#f7f3ec] p-6 border border-[#18382a]/10">
                <div className="flex items-start gap-4">
                  <Quote className="w-8 h-8 text-[#c45d2a] shrink-0" />
                  <p className="leading-7 text-[#465046]">
                    We believe the right gear isn't always the most expensive—it's the one that keeps you safe, fits your riding style and gives you the confidence to enjoy every ride.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <img
                src="/images/our-story.webp"
                alt="Mototrek team helping a rider choose motorcycle riding gear in Pune"
                width="700"
                height="850"
                loading="lazy"
                className="rounded-3xl shadow-xl object-cover w-full aspect-[4/5]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section id="values" className="py-16 lg:py-24 bg-[#e8dece]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mb-16">
            <p className="uppercase tracking-[0.30em] text-xs font-semibold text-[#6c756b] mb-4">
              OUR VALUES
            </p>

            <h2 className="serif text-4xl lg:text-5xl font-bold text-[#18382a] leading-tight mb-6">
              What Drives Every Decision We Make.
            </h2>

            <p className="text-base lg:text-lg leading-7 lg:leading-8 text-[#4d574f]">
              Everything we do is guided by one goal—to help riders choose with confidence. From the products we stock to the advice we share, trust always comes first.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:-translate-y-1 hover:shadow-xl transition">
              <ShieldCheck className="w-10 h-10 text-[#c45d2a] mb-5" />
              <h3 className="serif text-2xl text-[#18382a] mb-4">Safety First</h3>
              <p className="leading-7 text-[#59635a]">
                We believe the right gear should protect you, perform when it matters and give you confidence on every ride.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <ThumbsUp className="w-10 h-10 text-[#c45d2a] mb-5" />
              <h3 className="serif text-2xl text-[#18382a] mb-4">Honest Advice</h3>
              <p className="leading-7 text-[#59635a]">
                We recommend what suits your riding style, motorcycle and budget—not simply what's most expensive.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <Award className="w-10 h-10 text-[#c45d2a] mb-5" />
              <h3 className="serif text-2xl text-[#18382a] mb-4">Genuine Brands</h3>
              <p className="leading-7 text-[#59635a]">
                We carefully select products from brands trusted for their quality, safety and reliability.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <Users className="w-10 h-10 text-[#c45d2a] mb-5" />
              <h3 className="serif text-2xl text-[#18382a] mb-4">Built Around Riders</h3>
              <p className="leading-7 text-[#59635a]">
                More than a store, we're building a community where riders learn, connect and explore together.
              </p>
            </div>
          </div>

          <div className="mt-16 rounded-3xl bg-[#18382a] p-10 lg:p-12 text-center text-white">
            <h3 className="serif text-3xl mb-5">Our Promise</h3>
            <p className="max-w-3xl mx-auto leading-8 text-white/85">
              Every rider deserves honest guidance, genuine products and a place they can trust. That's the promise behind every recommendation, every conversation and every ride at Mototrek.
            </p>
          </div>
        </div>
      </section>

      {/* WHY MOTOTREK */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mb-16">
            <p className="uppercase tracking-[0.30em] text-xs font-semibold text-[#6c756b] mb-4">
              WHY MOTOTREK
            </p>

            <h2 className="serif text-4xl lg:text-5xl font-bold text-[#18382a] leading-tight mb-6">
              Trusted by Riders. Chosen with Confidence.
            </h2>

            <p className="text-lg leading-8 text-[#59635a]">
              Choosing the right riding gear is about more than buying a product. It's about finding advice you can trust, gear that fits your needs and people who genuinely care about your riding experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-[#18382a]/10 p-6 lg:p-8 hover:-translate-y-1 hover:shadow-xl transition">
              <BadgeCheck className="w-10 h-10 text-[#c45d2a] mb-5" />
              <h3 className="text-2xl font-semibold text-[#18382a] mb-4">Genuine Products</h3>
              <p className="leading-7 text-[#59635a]">
                We stock authentic riding gear from trusted brands, so you can buy with complete confidence.
              </p>
            </div>

            <div className="rounded-2xl border border-[#18382a]/10 p-6 lg:p-8 hover:-translate-y-1 hover:shadow-xl transition">
              <ClipboardCheck className="w-10 h-10 text-[#c45d2a] mb-5" />
              <h3 className="text-2xl font-semibold text-[#18382a] mb-4">Honest Recommendations</h3>
              <p className="leading-7 text-[#59635a]">
                We help you choose gear based on your riding style, motorcycle and budget—not sales targets.
              </p>
            </div>

            <div className="rounded-2xl border border-[#18382a]/10 p-6 lg:p-8 hover:-translate-y-1 hover:shadow-xl transition">
              <Store className="w-10 h-10 text-[#c45d2a] mb-5" />
              <h3 className="text-2xl font-semibold text-[#18382a] mb-4">Experience Before You Buy</h3>
              <p className="leading-7 text-[#59635a]">
                Visit our Pune store to compare products, check the fit and make an informed decision.
              </p>
            </div>

            <div className="rounded-2xl border border-[#18382a]/10 p-6 lg:p-8 hover:-translate-y-1 hover:shadow-xl transition">
              <Mountain className="w-10 h-10 text-[#c45d2a] mb-5" />
              <h3 className="text-2xl font-semibold text-[#18382a] mb-4">Real Riding Experience</h3>
              <p className="leading-7 text-[#59635a]">
                Our recommendations come from real-world riding across highways, cities and mountain roads—not just product catalogues.
              </p>
            </div>

            <div className="rounded-2xl border border-[#18382a]/10 p-6 lg:p-8 hover:-translate-y-1 hover:shadow-xl transition">
              <Users className="w-10 h-10 text-[#c45d2a] mb-5" />
              <h3 className="text-2xl font-semibold text-[#18382a] mb-4">Rider Community</h3>
              <p className="leading-7 text-[#59635a]">
                Join a growing community that shares knowledge, experiences and unforgettable rides together.
              </p>
            </div>

            <div className="rounded-2xl bg-[#18382a] p-8 text-white">
              <HeartHandshake className="w-10 h-10 text-[#f0b04d] mb-5" />
              <h3 className="text-2xl font-semibold mb-4">We're Here to Help</h3>
              <p className="leading-7 text-white/85 mb-6">
                Whether you're choosing your first helmet or upgrading your touring setup, our team is always happy to guide you.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-semibold text-[#f0b04d] hover:text-white transition"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OUR COMMUNITY */}
      <section id="community" className="py-16 lg:py-24 bg-[#10281e] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-16">
            <div>
              <p className="uppercase tracking-[0.30em] text-xs font-semibold text-[#b8c5ba] mb-4">
                OUR COMMUNITY
              </p>

              <h2 className="serif text-4xl lg:text-5xl font-bold leading-tight mb-6">
                The Best Rides<br />
                Are Shared.
              </h2>

              <p className="max-w-3xl text-lg leading-8 text-white/80">
                Mototrek brings together riders who love exploring new roads, learning from real experiences and making every journey more memorable. From weekend rides to community events, there's always a reason to ride together.
              </p>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-[#18382a] hover:bg-[#c45d2a] hover:text-white transition"
            >
              Explore Events
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <article className="overflow-hidden rounded-2xl bg-[#18382a]">
              <img
                src="/images/weekend-rides.webp"
                alt="Weekend motorcycle ride organised by Mototrek"
                width="600"
                height="420"
                loading="lazy"
                className="h-56 sm:h-64 lg:h-72 w-full object-cover"
              />
              <div className="p-6 lg:p-7">
                <span className="text-xs uppercase tracking-widest text-[#f0b04d]">
                  WEEKEND RIDES
                </span>
                <h3 className="serif text-2xl mt-3 mb-4">Explore New Roads</h3>
                <p className="leading-7 text-white/75">
                  Escape the routine with scenic rides, breakfast meetups and unforgettable weekends on two wheels.
                </p>
              </div>
            </article>

            <article className="overflow-hidden rounded-2xl bg-[#18382a]">
              <img
                src="/images/rider-community.webp"
                alt="Mototrek rider community gathering"
                width="600"
                height="420"
                loading="lazy"
                className="h-56 sm:h-64 lg:h-72 w-full object-cover"
              />
              <div className="p-6 lg:p-7">
                <span className="text-xs uppercase tracking-widest text-[#f0b04d]">
                  COMMUNITY
                </span>
                <h3 className="serif text-2xl mt-3 mb-4">Meet Like-Minded Riders</h3>
                <p className="leading-7 text-white/75">
                  Share experiences, exchange ideas and build friendships with people who enjoy riding as much as you do.
                </p>
              </div>
            </article>

            <article className="overflow-hidden rounded-2xl bg-[#18382a]">
              <img
                src="/images/events.webp"
                alt="Motorcycle event organised by Mototrek"
                width="600"
                height="420"
                loading="lazy"
                className="h-56 sm:h-64 lg:h-72 w-full object-cover"
              />
              <div className="p-6 lg:p-7">
                <span className="text-xs uppercase tracking-widest text-[#f0b04d]">
                  EVENTS
                </span>
                <h3 className="serif text-2xl mt-3 mb-4">Learn Together</h3>
                <p className="leading-7 text-white/75">
                  Join workshops, rider meets and product experiences designed to make every journey safer and more enjoyable.
                </p>
              </div>
            </article>
          </div>

          <div className="mt-16 rounded-3xl border border-white/10 bg-[#18382a] p-10 text-center">
            <h3 className="serif text-3xl mb-4">See You on the Road.</h3>
            <p className="max-w-2xl mx-auto leading-8 text-white/75 mb-8">
              Whether you're choosing your first riding gear or planning your next adventure, you'll always find honest guidance, genuine products and a community that's ready to welcome you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/events"
                className="rounded-lg bg-white px-7 py-3 font-semibold text-[#18382a] hover:bg-[#c45d2a] hover:text-white transition"
              >
                Upcoming Rides
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-white/30 px-7 py-3 font-semibold hover:bg-white hover:text-[#18382a] transition"
              >
                Visit Our Store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VISIT OUR STORE */}
      <section id="store" className="grid lg:grid-cols-2 bg-[#f7f3ec]">
        <div className="min-h-[320px] lg:min-h-[650px]">
          <img
            src="/images/store-experience.webp"
            alt="Inside Mototrek motorcycle riding gear store in Pune"
            width="900"
            height="900"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center p-6 sm:p-10 lg:p-20">
          <div className="max-w-xl">
            <p className="uppercase tracking-[0.30em] text-xs font-semibold text-[#6c756b] mb-4">
              VISIT OUR STORE
            </p>

            <h2 className="serif text-4xl lg:text-5xl font-bold leading-tight text-[#18382a] mb-6">
              Experience Before You Decide.
            </h2>

            <p className="text-lg leading-8 text-[#4c554d] mb-6">
              Riding gear isn't one-size-fits-all. The right helmet should fit comfortably, your jacket should suit the way you ride, and every piece of gear should give you confidence before you hit the road.
            </p>

            <p className="text-lg leading-8 text-[#4c554d] mb-8">
              Visit our Pune store to explore genuine riding gear, compare products, try different sizes and get honest recommendations from riders who understand real-world riding.
            </p>

            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#c45d2a] mt-1 shrink-0" />
                <p>Try before you buy.</p>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#c45d2a] mt-1 shrink-0" />
                <p>Get personalised recommendations.</p>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#c45d2a] mt-1 shrink-0" />
                <p>Choose from genuine brands.</p>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#c45d2a] mt-1 shrink-0" />
                <p>Find gear that suits your ride.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg bg-[#18382a] px-7 py-4 font-semibold text-white hover:bg-[#c45d2a] transition"
              >
                Plan Your Visit
              </Link>

              <a
                href="https://maps.app.goo.gl/ZTWPXaEB6hmSL4uy7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-[#18382a] px-7 py-4 font-semibold text-[#18382a] hover:bg-[#18382a] hover:text-white transition"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MOTOTREK IN NUMBERS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="uppercase tracking-[0.30em] text-xs font-semibold text-[#6c756b] mb-4">
              MOTOTREK IN NUMBERS
            </p>

            <h2 className="serif text-4xl lg:text-5xl font-bold text-[#18382a] mb-6">
              Built on Trust.<br />
              Backed by Experience.
            </h2>

            <p className="text-lg leading-8 text-[#59635a]">
              Behind every number is a rider we've helped, a journey we've supported and a community that's grown stronger with every ride.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-[#f7f3ec] p-6 lg:p-8 text-center shadow-sm hover:-translate-y-1 hover:shadow-lg transition">
              <Package className="mx-auto mb-5 h-10 w-10 text-[#c45d2a]" />
              <h3 className="serif text-4xl lg:text-5xl text-[#18382a] mb-3">1,500+</h3>
              <p className="font-semibold text-[#18382a] mb-2">Products</p>
              <p className="text-sm leading-6 text-[#59635a]">
                Everything you need for safer, better rides.
              </p>
            </div>

            <div className="rounded-2xl bg-[#f7f3ec] p-6 lg:p-8 text-center shadow-sm hover:-translate-y-1 hover:shadow-lg transition">
              <ShieldCheck className="mx-auto mb-5 h-10 w-10 text-[#c45d2a]" />
              <h3 className="serif text-4xl lg:text-5xl text-[#18382a] mb-3">14+</h3>
              <p className="font-semibold text-[#18382a] mb-2">Trusted Brands</p>
              <p className="text-sm leading-6 text-[#59635a]">
                Genuine products from leading riding brands.
              </p>
            </div>

            <div className="rounded-2xl bg-[#f7f3ec] p-6 lg:p-8 text-center shadow-sm hover:-translate-y-1 hover:shadow-lg transition">
              <Users className="mx-auto mb-5 h-10 w-10 text-[#c45d2a]" />
              <h3 className="serif text-4xl lg:text-5xl text-[#18382a] mb-3">7,400+</h3>
              <p className="font-semibold text-[#18382a] mb-2">Riders Assisted</p>
              <p className="text-sm leading-6 text-[#59635a]">
                Helping riders choose with confidence.
              </p>
            </div>

            <div className="rounded-2xl bg-[#f7f3ec] p-6 lg:p-8 text-center shadow-sm hover:-translate-y-1 hover:shadow-lg transition">
              <Bike className="mx-auto mb-5 h-10 w-10 text-[#c45d2a]" />
              <h3 className="serif text-4xl lg:text-5xl text-[#18382a] mb-3">120+</h3>
              <p className="font-semibold text-[#18382a] mb-2">Community Rides</p>
              <p className="text-sm leading-6 text-[#59635a]">
                Bringing riders together on and off the road.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-[#59635a] mb-6">
              Thank you to every rider who's been part of our journey. We look forward to being part of yours.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg bg-[#18382a] px-8 py-4 font-semibold text-white hover:bg-[#c45d2a] transition"
            >
              Visit Our Store
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
