"use client";

import React from "react";
import Link from "next/link";
import { Users, MessageCircle } from "lucide-react";

export default function EventsPage() {
  return (
    <main id="top">
      {/* HERO */}
      <section className="relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden">
        <img
          src="/images/events-hero.webp"
          data-template-id="hero-image"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          alt="Mototrek Motorcycle Rides and Adventure Tours"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#10281e]/95 via-[#10281e]/75 to-[#10281e]/35"></div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-32">
          <div className="max-w-4xl">
            <h1
              data-template-id="hero-title"
              className="serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
            >
              Every Ride<br />
              Starts with a Story.
            </h1>

            <p
              data-template-id="hero-copy"
              className="text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 lg:leading-9 text-white/85 max-w-3xl mb-8"
            >
              From weekend rides and adventure tours to unforgettable road trips, Mototrek brings riders together to explore new places, build lasting friendships and experience the joy of riding.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#community"
                className="inline-flex items-center gap-2 px-7 py-4 bg-[#C45D2A] text-white font-medium rounded-md hover:bg-[#A84F23] transition"
              >
                Join the Community
                <Users className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY RIDE WITH MOTOTREK */}
      <section id="why" className="max-w-[1440px] mx-auto px-5 lg:px-10 py-16 lg:py-28">
        <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-20">
          <span className="inline-block px-4 py-2 mb-5 text-xs font-semibold tracking-[0.25em] uppercase bg-[#e8dece] text-[#18382A] rounded-full">
            Why Ride With Mototrek
          </span>

          <h2 className="serif text-[#18382A] text-4xl lg:text-6xl font-bold mb-8">
            More Than a Ride.<br />
            An Experience You'll Remember.
          </h2>

          <p className="text-lg lg:text-xl leading-9 text-[#4d574f]">
            Every Mototrek ride is designed to bring riders together through unforgettable routes, meaningful experiences and a shared passion for motorcycling. Whether it's your first group ride or your next big adventure, you'll always ride with a community that has your back.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <article className="border-t border-[#18382A]/20 pt-6">
            <p className="text-[#C45D2A] text-lg font-semibold mb-3">01</p>
            <h3 className="serif text-[#18382A] text-xl mb-3">
              Ride Incredible Routes
            </h3>
            <p className="leading-7 text-[#5d685f]">
              Discover scenic highways, twisty mountain roads and destinations that make every ride worth the journey.
            </p>
          </article>

          <article className="border-t border-[#18382A]/20 pt-6">
            <p className="text-[#C45D2A] text-lg font-semibold mb-3">02</p>
            <h3 className="serif text-[#18382A] text-xl mb-3">
              Ride With a Community
            </h3>
            <p className="leading-7 text-[#5d685f]">
              Meet passionate riders, share experiences and build friendships that continue long after the ride ends.
            </p>
          </article>

          <article className="border-t border-[#18382A]/20 pt-6">
            <p className="text-[#C45D2A] text-lg font-semibold mb-3">03</p>
            <h3 className="serif text-[#18382A] text-xl mb-3">
              Ride With Confidence
            </h3>
            <p className="leading-7 text-[#5d685f]">
              Enjoy well-organised rides, experienced ride leaders and guidance that lets you focus on the journey ahead.
            </p>
          </article>

          <article className="border-t border-[#18382A]/20 pt-6">
            <p className="text-[#C45D2A] text-lg font-semibold mb-3">04</p>
            <h3 className="serif text-[#18382A] text-xl mb-3">
              Create Lasting Memories
            </h3>
            <p className="leading-7 text-[#5d685f]">
              From sunrise starts to unforgettable viewpoints, every ride leaves you with stories you'll want to relive.
            </p>
          </article>
        </div>
      </section>

      {/* COMMUNITY SPLIT */}
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-16 lg:py-28 grid lg:grid-cols-[0.9fr_1.1fr] gap-20 items-center">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-2 mb-5 text-xs font-semibold tracking-[0.25em] uppercase bg-[#e8dece] text-[#18382A] rounded-full">
            The Mototrek Community
          </span>

          <h2 className="serif text-[#18382A] font-bold text-4xl lg:text-5xl mb-6">
            Every Ride Brings Riders Closer.
          </h2>

          <p className="leading-8 text-[#4c554d] mb-5">
            Great rides are about more than the roads you travel. They're about the people you ride with, the experiences you share and the memories you create along the way.
          </p>

          <p className="leading-8 text-[#4c554d]">
            At Mototrek, you'll find a welcoming community of riders brought together by a shared passion for motorcycles and adventure. Whether you're joining your first ride or returning for the next one, you'll always have a place to belong.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-xl">
          <img
            src="/images/events-community.webp"
            alt="Mototrek riding community"
            className="w-full h-[320px] sm:h-[450px] lg:h-[600px] object-cover"
          />
        </div>
      </div>

      {/* MOMENTS FROM THE ROAD */}
      <section className="bg-[#e8dece] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 mb-5 text-xs font-semibold tracking-[0.25em] uppercase bg-white text-[#18382A] rounded-full">
              Moments from the Road
            </span>

            <h2 className="serif text-[#18382A] text-4xl lg:text-5xl font-bold mb-6">
              Adventures That Bring Riders Together.
            </h2>

            <p className="text-lg leading-8 text-[#566257]">
              Every ride is a collection of unforgettable moments, scenic routes and shared experiences. Take a look at some of the adventures, destinations and memories created by the Mototrek community.
            </p>
          </div>
        </div>
      </section>

      {/* THE MOTOTREK EXPERIENCE */}
      <section className="max-w-[1440px] mx-auto px-5 lg:px-10 py-16 lg:py-28">
        <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-16 lg:gap-24 items-start">
          <div>
            <span className="inline-block px-4 py-2 mb-5 text-xs font-semibold tracking-[0.25em] uppercase bg-[#e8dece] text-[#18382A] rounded-full">
              The Mototrek Experience
            </span>

            <h2 className="serif text-[#18382A] text-4xl lg:text-5xl font-bold mb-8">
              More Than Just Another Group Ride.
            </h2>

            <p className="text-lg leading-8 text-[#4d574f]">
              Every Mototrek ride is thoughtfully planned to bring together passionate riders, unforgettable routes and meaningful experiences. Whether you're joining your first ride or your fiftieth, you'll always ride with a community that values safety, respect and the joy of exploring together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-8 lg:gap-y-10">
            <article className="border-t border-[#18382A]/20 pt-6">
              <h3 className="serif text-[#18382A] text-xl mb-3">
                Well-Planned Rides
              </h3>
              <p className="leading-7 text-[#5d685f]">
                Carefully selected routes, organised ride plans and experiences designed for every rider.
              </p>
            </article>

            <article className="border-t border-[#18382A]/20 pt-6">
              <h3 className="serif text-[#18382A] text-xl mb-3">
                A Welcoming Community
              </h3>
              <p className="leading-7 text-[#5d685f]">
                Meet riders who share your passion for motorcycles, touring and exploring new places.
              </p>
            </article>

            <article className="border-t border-[#18382A]/20 pt-6">
              <h3 className="serif text-[#18382A] text-xl mb-3">
                Ride With Confidence
              </h3>
              <p className="leading-7 text-[#5d685f]">
                Benefit from experienced ride leaders, group support and a rider-first approach throughout the journey.
              </p>
            </article>

            <article className="border-t border-[#18382A]/20 pt-6">
              <h3 className="serif text-[#18382A] text-xl mb-3">
                Incredible Destinations
              </h3>
              <p className="leading-7 text-[#5d685f]">
                Explore scenic roads, mountain routes and destinations that make every ride memorable.
              </p>
            </article>

            <article className="border-t border-[#18382A]/20 pt-6">
              <h3 className="serif text-[#18382A] text-xl mb-3">
                Ride. Learn. Grow.
              </h3>
              <p className="leading-7 text-[#5d685f]">
                Gain experience, improve your riding confidence and enjoy every journey with like-minded people.
              </p>
            </article>

            <article className="border-t border-[#18382A]/20 pt-6">
              <h3 className="serif text-[#18382A] text-xl mb-3">
                Memories That Stay
              </h3>
              <p className="leading-7 text-[#5d685f]">
                Every ride leaves you with unforgettable experiences, new friendships and stories worth sharing.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* JOIN COMMUNITY CTA BANNER */}
      <section id="community" className="relative min-h-screen flex items-center overflow-hidden">
        <img
          src="/images/event-community-banner.webp"
          data-template-id="community-image"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          alt="Mototrek Riding Community"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#10281E]/95 via-[#10281E]/80 to-[#10281E]/50"></div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-10 w-full text-white">
          <div className="max-w-4xl">
            <span className="inline-flex items-center px-4 py-2 mb-6 text-xs font-semibold uppercase tracking-[0.25em] bg-white/10 backdrop-blur border border-white/20 rounded-full">
              Join the Mototrek Community
            </span>

            <h2 className="serif text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
              Your Next Ride<br />
              Starts Here.
            </h2>

            <p className="text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 lg:leading-9 text-white/85 max-w-3xl mb-8">
              Join a growing community of riders who love exploring new roads, sharing experiences and creating unforgettable journeys together. Follow our latest rides, connect with fellow riders and never miss the next adventure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.instagram.com/mototrek.adv/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 bg-[#C45D2A] text-white font-medium rounded-md hover:bg-[#A84F23] transition"
              >
                Follow on Instagram
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="2" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>

              <a
                href="https://chat.whatsapp.com/Ku45PcnTvrs8lDqnK1DCK8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 border border-white/30 rounded-md hover:bg-white hover:text-[#18382A] transition"
              >
                Join WhatsApp Community
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
