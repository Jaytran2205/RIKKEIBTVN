"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Homestay } from "@/types/homestay";
import { HomestayCard } from "./HomestayCard";

interface HomestayCarouselProps {
  homestays: Homestay[];
  onSelectHomestay: (homestay: Homestay) => void;
  onToggleWishlist?: (id: string) => void;
  wishlistedIds?: string[];
}

export const HomestayCarousel: React.FC<HomestayCarouselProps> = ({
  homestays,
  onSelectHomestay,
  onToggleWishlist,
  wishlistedIds = [],
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative w-full px-2 sm:px-4 select-none">
      {/* 2 Circular Navigation Arrow Buttons with Bounce on Hover */}
      <div className="flex items-center justify-between pointer-events-none absolute -top-14 right-2 sm:right-6 gap-2.5 z-20">
        {/* Prev Arrow */}
        <motion.button
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={() => swiperRef.current?.slidePrev()}
          className="pointer-events-auto w-10 h-10 rounded-full glass-panel hover:bg-forest-700 hover:border-emerald-400 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
          aria-label="Thẻ trước"
        >
          <ChevronLeft className="w-5 h-5 text-white group-hover:text-emerald-300" />
        </motion.button>

        {/* Next Arrow */}
        <motion.button
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={() => swiperRef.current?.slideNext()}
          className="pointer-events-auto w-10 h-10 rounded-full glass-panel hover:bg-forest-700 hover:border-emerald-400 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
          aria-label="Thẻ tiếp theo"
        >
          <ChevronRight className="w-5 h-5 text-white group-hover:text-emerald-300" />
        </motion.button>
      </div>

      {/* Swiper Slider Component */}
      <Swiper
        modules={[Navigation, Pagination, Keyboard, A11y]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={20}
        slidesPerView={1}
        speed={650}
        grabCursor={true}
        keyboard={{ enabled: true }}
        breakpoints={{
          640: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 28,
          },
          1280: {
            slidesPerView: 3.2,
            spaceBetween: 32,
          },
        }}
        className="w-full pb-10"
      >
        {homestays.map((homestay) => (
          <SwiperSlide key={homestay.id} className="h-auto pb-4">
            <HomestayCard
              homestay={homestay}
              onSelect={onSelectHomestay}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistedIds.includes(homestay.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
