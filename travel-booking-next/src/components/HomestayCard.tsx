"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, MapPin, Heart, ArrowRight } from "lucide-react";
import { Homestay } from "@/types/homestay";

interface HomestayCardProps {
  homestay: Homestay;
  onSelect: (homestay: Homestay) => void;
  onToggleWishlist?: (id: string) => void;
  isWishlisted?: boolean;
}

export const HomestayCard: React.FC<HomestayCardProps> = ({
  homestay,
  onSelect,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(isWishlisted);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (onToggleWishlist) onToggleWishlist(homestay.id);
  };

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(homestay)}
      className="group relative glass-panel glass-panel-hover rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full select-none"
    >
      {/* Card Media Banner with Smooth Image Zoom */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-forest-900/40">
        <Image
          src={homestay.coverImage}
          alt={homestay.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />

        {/* Top Badges Overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-coral-500 text-white shadow-md">
            {homestay.tag}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/40 backdrop-blur-md text-white/90 border border-white/20">
            {homestay.district}
          </span>
        </div>

        {/* Wishlist Heart Button with Pulse Effect */}
        <motion.button
          onClick={handleHeartClick}
          whileTap={{ scale: 0.85 }}
          animate={
            isHovered
              ? { scale: [1, 1.15, 1], transition: { repeat: Infinity, duration: 1.2 } }
              : { scale: 1 }
          }
          className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-colors z-10 ${
            isLiked
              ? "bg-red-500/90 border-red-400 text-white shadow-lg"
              : "bg-black/35 border-white/30 text-white hover:bg-black/60"
          }`}
          aria-label="Lưu homestay yêu thích"
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
        </motion.button>

        {/* Rating Badge Overlay */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-amber-300 text-xs font-bold flex items-center gap-1 border border-white/20 z-10">
          <Star className="w-3.5 h-3.5 fill-amber-300" />
          <span>{homestay.rating}</span>
          <span className="text-white/60 font-normal">({homestay.reviewCount})</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
            {homestay.roomType}
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-emerald-200 transition-colors">
            {homestay.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-white/70 mt-1.5 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-coral-400 shrink-0" />
            <span>{homestay.location}</span>
          </div>
        </div>

        {/* Description snippet */}
        <p className="text-xs text-white/75 line-clamp-2 leading-relaxed bg-white/5 p-2 rounded-xl border border-white/10">
          {homestay.description}
        </p>

        {/* Card Footer: Price & CTA Action */}
        <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="block text-[10px] text-white/60 uppercase font-semibold">
              Giá ưu đãi
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-emerald-300">
                {homestay.priceDiscounted.toLocaleString("vi-VN")} ₫
              </span>
              {homestay.priceOriginal && (
                <span className="text-[11px] text-white/40 line-through">
                  {homestay.priceOriginal.toLocaleString("vi-VN")} ₫
                </span>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ x: 3 }}
            className="px-3.5 py-2 rounded-full bg-forest-700 hover:bg-forest-800 text-white text-xs font-bold flex items-center gap-1.5 border border-emerald-400/30 shadow-md group-hover:border-emerald-300"
          >
            <span>Chi tiết</span>
            <ArrowRight className="w-3.5 h-3.5 text-coral-400 transition-transform group-hover:translate-x-0.5" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};
