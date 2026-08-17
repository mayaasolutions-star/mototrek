"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Bike, Tent, Users, ShieldCheck, MessageCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero flex items-center">
        <img
          src="/images/home-hero.webp"
          alt="Mototrek Premium Motorcycle Riding Gear Store in Pune"
        />

        <div className="hero-content max-w-[1440px] mx-auto w-full px-5 lg:px-10">
          <div className="max-w-3xl text-white fade-up">
            <h1 className="serif leading-tight font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-5 lg:mb-6">
              Ride Better.<br />
              Ride Prepared.
            </h1>

            <p className="text-base sm:text-lg md:text-xl leading-7 md:leading-8 text-white/90 max-w-2xl mb-8">
              Premium motorcycle riding gear, trusted brands and expert advice—all in one place. Visit Mototrek and gear up with confidence.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-[#f7f3ec] text-[#18382a] text-sm font-semibold rounded-md hover:bg-white transition text-center"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY SECTION */}
      <section id="categories" className="max-w-[1440px] mx-auto px-5 lg:px-10 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[0.28em] text-xs font-semibold text-[#6c756b] mb-3">
              SHOP BY CATEGORY
            </p>
            <h2 className="serif text-[#18382a] font-bold text-4xl mb-4">
              Everything You Need.<br />
              Every Ride.
            </h2>
            <p className="text-[#59635a] leading-7">
              Explore premium motorcycle riding gear and accessories from trusted brands. Whether you ride every day or tour across the country, we've got you covered.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[#18382a] font-semibold border-b border-[#18382a] pb-1 hover:text-[#c45d2a] hover:border-[#c45d2a] transition"
          >
            Shop All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Helmets */}
          <Link
            href="/shop?category=helmets"
            className="group relative h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden"
          >
            <img
              src="/images/helmets.webp"
              loading="lazy"
              alt="Motorcycle Helmets"
              className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 via-35% to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-white leading-tight mb-3">
                Helmets
              </h3>
              <p className="text-sm leading-6 text-white/85 max-w-[180px] mb-6">
                Safety starts here.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                Explore
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Jackets */}
          <Link
            href="/shop?category=riding-gear"
            className="group relative h-80 rounded-2xl overflow-hidden"
          >
            <img
              src="/images/jackets.webp"
              loading="lazy"
              alt="Motorcycle Riding Jackets"
              className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Jackets
              </h3>
              <p className="text-sm text-white/80 mb-4">
                Protection without compromise.
              </p>
              <span className="inline-flex items-center text-sm font-medium text-white">
                Explore
                <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            </div>
          </Link>

          {/* Gloves */}
          <Link
            href="/shop?category=gloves"
            className="group relative h-80 rounded-2xl overflow-hidden"
          >
            <img
              src="/images/gloves.webp"
              loading="lazy"
              alt="Motorcycle Riding Gloves"
              className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Gloves
              </h3>
              <p className="text-sm text-white/80 mb-4">
                Grip every mile.
              </p>
              <span className="inline-flex items-center text-sm font-medium text-white">
                Explore
                <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            </div>
          </Link>

          {/* Luggage */}
          <Link
            href="/shop?category=luggage"
            className="group relative h-80 rounded-2xl overflow-hidden"
          >
            <img
              src="/images/luggage.webp"
              loading="lazy"
              alt="Motorcycle Luggage"
              className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Luggage
              </h3>
              <p className="text-sm text-white/80 mb-4">
                Built for every adventure.
              </p>
              <span className="inline-flex items-center text-sm font-medium text-white">
                Explore
                <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* GEAR RECOMMENDATION SECTION */}
      <section className="py-16 lg:py-24 bg-[#f7f3ec]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="overflow-hidden rounded-[32px] bg-white border border-black/5 shadow-xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#18382a] to-[#214736] px-8 py-14 lg:px-16 text-center text-white">
              <span className="inline-flex items-center rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
                Expert Gear Guidance
              </span>

              <h2 className="serif mt-6 text-3xl sm:text-4xl lg:text-5xl leading-[1.15] max-w-3xl mx-auto">
                Choose the Right Gear.<br />
                Ride With Confidence.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-white/85">
                Not sure what to buy? Tell us about your motorcycle, riding style and budget, and we'll help you choose gear that fits your needs—not just your cart.
              </p>
            </div>

            {/* Features */}
            <div className="px-8 py-14 lg:px-16">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-black/5 bg-[#faf8f4] p-8 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#18382a]/10">
                    <ShieldCheck className="h-8 w-8 text-[#18382a]" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-[#18382a]">
                    Honest Recommendations
                  </h3>
                  <p className="leading-7 text-[#59635a]">
                    Practical advice from experienced riders to help you buy what's right for you.
                  </p>
                </div>

                <div className="rounded-2xl border border-black/5 bg-[#faf8f4] p-8 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#18382a]/10">
                    <Bike className="h-8 w-8 text-[#18382a]" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-[#18382a]">
                    Tailored to Your Ride
                  </h3>
                  <p className="leading-7 text-[#59635a]">
                    Recommendations based on your motorcycle, riding habits and touring plans.
                  </p>
                </div>

                <div className="rounded-2xl border border-black/5 bg-[#faf8f4] p-8 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#18382a]/10">
                    <MessageCircle className="h-8 w-8 text-[#18382a]" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-[#18382a]">
                    In-Store & WhatsApp Support
                  </h3>
                  <p className="leading-7 text-[#59635a]">
                    Get personalised guidance online or visit our Pune store to try gear before you buy.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-14 rounded-2xl bg-[#18382a] p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div>
                    <h3 className="serif text-3xl text-white mb-3">
                      Let's Find the Right Gear for You.
                    </h3>
                    <p className="max-w-2xl text-white/80 leading-7">
                      From your first helmet to a complete touring setup, we're here to help you make the right choice.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="https://wa.me/919511901753"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-white px-8 py-4 text-center font-semibold text-[#18382a] transition hover:bg-[#c45d2a] hover:text-white"
                    >
                      Chat on WhatsApp
                    </a>
                    <Link
                      href="/contact"
                      className="rounded-xl border border-white/20 px-8 py-4 text-center font-semibold text-white transition hover:bg-white hover:text-[#18382a]"
                    >
                      Visit Our Store
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BRANDS SECTION */}
      <section id="brands" className="py-16 lg:py-24 border-y border-black/10 bg-white">
        <div className="max-w-[1320px] mx-auto px-5 lg:px-10">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="uppercase tracking-[0.28em] text-xs font-semibold text-[#6c756b] mb-3">
              GENUINE BRANDS
            </p>
            <h2 className="serif text-4xl font-bold text-[#18382a] mb-5">
              Gear You Can Trust.
            </h2>
            <p className="text-[#59635a] leading-7">
              Shop genuine motorcycle riding gear from leading brands trusted by riders across India. From everyday commuting to long-distance touring, find gear built for safety, comfort and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {["AXOR", "SMK", "MT Helmets", "LS2", "Rynox", "Viaterra", "Royal Enfield", "And More"].map((brand) => (
              <div
                key={brand}
                className="rounded-xl border border-black/10 bg-[#faf8f4] py-6 lg:py-8 text-center transition hover:border-[#18382a] hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-[#18382a]">{brand}</h3>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-[#18382a] px-7 py-3 font-semibold text-white transition hover:bg-[#c45d2a]"
            >
              Shop All Brands
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTIONS SECTION */}
      <section id="featured" className="max-w-[1440px] mx-auto px-5 lg:px-10 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[0.28em] text-xs font-semibold text-[#6c756b] mb-3">
              FEATURED COLLECTIONS
            </p>
            <h2 className="serif text-[#18382a] text-4xl font-bold mb-5">
              Ride Ready Starts Here.
            </h2>
            <p className="text-[#59635a] leading-7">
              Explore our most popular riding gear, chosen for safety, comfort and performance. Whether you're commuting, touring or heading off the beaten path, you'll find gear built for every ride.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-semibold text-[#18382a] border-b border-[#18382a] pb-1 hover:text-[#c45d2a] hover:border-[#c45d2a] transition"
          >
            Shop All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 lg:gap-7">
          {/* Helmets */}
          <Link
            href="/shop?category=helmets"
            className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition"
          >
            <img
              src="/images/helmet.webp"
              loading="lazy"
              alt="Premium Motorcycle Helmets"
              className="h-56 sm:h-64 lg:h-72 w-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c45d2a]">
                Rider Favourite
              </span>
              <h3 className="text-xl font-semibold text-[#18382a] mt-2 mb-3">
                Helmets
              </h3>
              <p className="text-[#59635a] leading-6 mb-5">
                Certified protection for every ride.
              </p>
              <span className="font-semibold text-[#18382a]">
                Shop Now →
              </span>
            </div>
          </Link>

          {/* Jackets */}
          <Link
            href="/shop?category=riding-gear"
            className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition"
          >
            <img
              src="/images/jacket.webp"
              loading="lazy"
              alt="Motorcycle Riding Jackets"
              className="h-72 w-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c45d2a]">
                Best Seller
              </span>
              <h3 className="text-xl font-semibold text-[#18382a] mt-2 mb-3">
                Riding Jackets
              </h3>
              <p className="text-[#59635a] leading-6 mb-5">
                Protection that keeps you comfortable.
              </p>
              <span className="font-semibold text-[#18382a]">
                Shop Now →
              </span>
            </div>
          </Link>

          {/* Luggage */}
          <Link
            href="/shop?category=luggage"
            className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition"
          >
            <img
              src="/images/luggage.webp"
              loading="lazy"
              alt="Motorcycle Touring Luggage"
              className="h-72 w-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c45d2a]">
                Touring Essential
              </span>
              <h3 className="text-xl font-semibold text-[#18382a] mt-2 mb-3">
                Luggage
              </h3>
              <p className="text-[#59635a] leading-6 mb-5">
                Carry more. Ride farther.
              </p>
              <span className="font-semibold text-[#18382a]">
                Shop Now →
              </span>
            </div>
          </Link>

          {/* Accessories */}
          <Link
            href="/shop?category=accessories"
            className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition"
          >
            <img
              src="/images/accessories.webp"
              loading="lazy"
              alt="Motorcycle Riding Accessories"
              className="h-72 w-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c45d2a]">
                Everyday Essentials
              </span>
              <h3 className="text-xl font-semibold text-[#18382a] mt-2 mb-3">
                Accessories
              </h3>
              <p className="text-[#59635a] leading-6 mb-5">
                Small upgrades that make every ride better.
              </p>
              <span className="font-semibold text-[#18382a]">
                Shop Now →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section id="community" className="grid lg:grid-cols-2 bg-[#18382a] overflow-hidden">
        <div className="h-[350px] lg:h-[700px]">
          <img
            src="/images/community.webp"
            loading="lazy"
            alt="Mototrek riding community during a weekend motorcycle ride"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center px-6 py-12 sm:px-10 md:px-16 lg:px-20 text-white">
          <div className="max-w-xl">
            <p className="uppercase tracking-[0.28em] text-xs font-semibold text-[#c9d5cc] mb-4">
              RIDING COMMUNITY
            </p>
            <h2 className="serif text-4xl leading-tight mb-6">
              More Than a Store.<br />
              A Community Built for Riders.
            </h2>
            <p className="text-white/85 leading-8 mb-8">
              Great rides are about more than the destination. They're about the people you meet, the experiences you share and the confidence you gain along the way. Join a community that rides together, learns together and helps every rider enjoy the journey.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="flex gap-3">
                <Bike className="w-6 h-6 text-[#f0b04d] mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Weekend Rides</h3>
                  <p className="text-sm text-white/70">Discover new routes with fellow riders.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Tent className="w-6 h-6 text-[#f0b04d] mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Touring & Camping</h3>
                  <p className="text-sm text-white/70">Explore destinations beyond the ordinary.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Users className="w-6 h-6 text-[#f0b04d] mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Like-Minded Riders</h3>
                  <p className="text-sm text-white/70">Share experiences, stories and friendships.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <ShieldCheck className="w-6 h-6 text-[#f0b04d] mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Ride Smarter</h3>
                  <p className="text-sm text-white/70">Learn from experienced riders.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/events"
                className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3 font-semibold text-[#18382a] transition hover:bg-[#c45d2a] hover:text-white"
              >
                Join Upcoming Rides
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white hover:text-[#18382a]"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* START YOUR NEXT RIDE CTA */}
      <section className="bg-[#18382a] py-16">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          <p className="uppercase tracking-[0.3em] text-xs text-white/70 mb-4">
            START YOUR NEXT RIDE
          </p>
          <h2 className="serif text-4xl mb-6">Ride with Confidence.</h2>
          <p className="max-w-2xl mx-auto text-white/75 leading-8 mb-8">
            From premium riding gear to expert guidance, we're here to help you choose the right gear for every ride. Visit our store or connect with our team today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="rounded-lg bg-white px-8 py-4 font-semibold text-[#18382a] hover:bg-[#c45d2a] hover:text-white transition"
            >
              Shop Now
            </Link>
            <a
              href="https://wa.me/919511901753"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white px-8 py-4 font-semibold hover:bg-white hover:text-[#18382a] transition"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
