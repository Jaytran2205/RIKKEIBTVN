"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Compass, Play, MessageCircle, MapPin, SlidersHorizontal } from "lucide-react";
import { HOMESTAYS_DATA } from "@/data/homestays";
import { Homestay } from "@/types/homestay";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { Navbar } from "@/components/Navbar";
import { HeroSearchBar } from "@/components/HeroSearchBar";
import { HomestayCarousel } from "@/components/HomestayCarousel";
import { DetailModal } from "@/components/DetailModal";
import { FullScreenVideoModal } from "@/components/FullScreenVideoModal";

export default function BookingTravelPage() {
  const [homestaysList, setHomestaysList] = useState<Homestay[]>(HOMESTAYS_DATA);
  const [selectedHomestay, setSelectedHomestay] = useState<Homestay | null>(null);
  const [isCinematicMode, setIsCinematicMode] = useState(false);
  const [fullScreenVideoUrl, setFullScreenVideoUrl] = useState<string | null>(null);
  const [activeAreaFilter, setActiveAreaFilter] = useState("all");
  const [wishlist, setWishlist] = useState<string[]>(["trang-an-riverside"]);

  const areaFilters = [
    { id: "all", label: "Tất cả", count: HOMESTAYS_DATA.length },
    { id: "Tam Cốc", label: "Tam Cốc", count: 2 },
    { id: "Tràng An", label: "Tràng An", count: 1 },
    { id: "Hang Múa", label: "Hang Múa", count: 1 },
    { id: "Vân Long", label: "Vân Long", count: 1 },
  ];

  const handleAreaFilterChange = (area: string) => {
    setActiveAreaFilter(area);
    if (area === "all") {
      setHomestaysList(HOMESTAYS_DATA);
    } else {
      setHomestaysList(HOMESTAYS_DATA.filter((h) => h.district === area));
    }
  };

  const handleSearch = ({
    location,
    budget,
  }: {
    roomType: string;
    location: string;
    budget: string;
  }) => {
    let filtered = HOMESTAYS_DATA;
    if (location.trim()) {
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(location.toLowerCase()) ||
          h.location.toLowerCase().includes(location.toLowerCase()) ||
          h.district.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (budget === "under1") {
      filtered = filtered.filter((h) => h.priceDiscounted < 1000000);
    } else if (budget === "1to3") {
      filtered = filtered.filter(
        (h) => h.priceDiscounted >= 1000000 && h.priceDiscounted <= 3000000
      );
    } else if (budget === "above3") {
      filtered = filtered.filter((h) => h.priceDiscounted > 3000000);
    }
    setHomestaysList(filtered);
  };

  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-between overflow-hidden pb-16">
      {/* 1. Background Video Layer (Autoplay, Loop, Muted with smooth overlay) */}
      <BackgroundVideo isCinematicMode={isCinematicMode} />

      {/* 2. Top Glassmorphic Navigation Bar */}
      <Navbar
        isCinematicMode={isCinematicMode}
        onToggleCinematic={() => setIsCinematicMode(!isCinematicMode)}
      />

      {/* Content Body */}
      <div
        className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCinematicMode ? "opacity-0 translate-y-12 pointer-events-none" : "opacity-100 translate-y-0"
        }`}
      >
        {/* 3. Hero Header & Scenic Title */}
        <section className="px-4 sm:px-8 max-w-6xl mx-auto text-center pt-8 sm:pt-14 select-none">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-700/70 border border-emerald-400/30 backdrop-blur-md text-emerald-200 text-xs font-bold tracking-wide shadow-md mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-coral-400" />
            <span>Ninh Bình Eco-Tourism &amp; Resort Booking 2026</span>
          </motion.div>

          <motion.h1
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-md max-w-4xl mx-auto leading-tight"
          >
            Homestay &amp; Khách Sạn
          </motion.h1>

          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/85 text-xs sm:text-sm md:text-base font-medium max-w-2xl mx-auto mt-3 drop-shadow-sm leading-relaxed"
          >
            Thấu cảm từng ngóc ngách và không vội vã cùng con khát khao, dẫn trường thiết bao đời.
            Hòa mình vào không gian bình dị giữa núi non di sản Cố đô.
          </motion.p>

          {/* 4. Hero Search Bar (Pill rounded-full with Framer Motion hover scale) */}
          <HeroSearchBar onSearch={handleSearch} />

          {/* 5. Sub-filter Area Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-2 flex-wrap mt-6"
          >
            <span className="text-xs font-bold text-emerald-200/90 flex items-center gap-1 mr-1">
              <MapPin className="w-3.5 h-3.5 text-coral-400" />
              Khu vực:
            </span>
            {areaFilters.map((area) => {
              const isActive = activeAreaFilter === area.id;
              return (
                <button
                  key={area.id}
                  onClick={() => handleAreaFilterChange(area.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "glass-pill-active"
                      : "glass-pill text-white/80 hover:text-white hover:bg-white/25"
                  }`}
                >
                  {area.label} ({area.count})
                </button>
              );
            })}
          </motion.div>
        </section>

        {/* 6. Carousel Slider Section (Swiper with Framer Motion) */}
        <section className="px-4 sm:px-8 max-w-7xl mx-auto mt-12 sm:mt-16">
          <div className="flex items-center justify-between mb-4 px-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-sm">
                Không Gian Lưu Trú Nghỉ Dưỡng
              </h2>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                Đang hiển thị {homestaysList.length} cơ sở phòng nghỉ tốt nhất tại Ninh Bình
              </p>
            </div>
            
            <button
              onClick={() =>
                setFullScreenVideoUrl(
                  "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-fog-over-the-mountains-42732-large.mp4"
                )
              }
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-forest-700 text-xs font-bold text-white transition-all hover:scale-105"
            >
              <Play className="w-3.5 h-3.5 text-coral-400 fill-coral-400" />
              <span>Xem Thước Phim 4K</span>
            </button>
          </div>

          <HomestayCarousel
            homestays={homestaysList}
            onSelectHomestay={(item) => setSelectedHomestay(item)}
            onToggleWishlist={handleToggleWishlist}
            wishlistedIds={wishlist}
          />
        </section>
      </div>

      {/* 7. Floating Action Buttons (Support & Quick Cinematic Mode) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Fast Video Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCinematicMode(!isCinematicMode)}
          className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white shadow-xl hover:bg-forest-700 transition-colors"
          title="Chuyển chế độ xem video toàn màn hình"
        >
          <Play className="w-5 h-5 text-coral-400 fill-coral-400" />
        </motion.button>

        {/* Zalo / Fast Support Chat Button */}
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="https://zalo.me/0866520567"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-forest-700 hover:bg-forest-800 text-white flex items-center justify-center shadow-2xl border border-emerald-400/40 cursor-pointer"
          title="Tư vấn & Đặt phòng qua Zalo"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </motion.a>
      </div>

      {/* 8. Interactive Detail Modal (Accordion/Modal expand) */}
      <DetailModal
        homestay={selectedHomestay}
        onClose={() => setSelectedHomestay(null)}
        onOpenVideo={(url) => setFullScreenVideoUrl(url)}
      />

      {/* 9. FullScreen Cinematic 4K Video Modal (Seamless Transition) */}
      <FullScreenVideoModal
        isOpen={!!fullScreenVideoUrl}
        videoUrl={fullScreenVideoUrl || ""}
        title={selectedHomestay ? selectedHomestay.name : "Ninh Bình Heritage Video 4K"}
        onClose={() => setFullScreenVideoUrl(null)}
      />
    </main>
  );
}
