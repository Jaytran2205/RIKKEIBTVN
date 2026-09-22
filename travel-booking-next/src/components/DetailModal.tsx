"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  MapPin,
  CheckCircle2,
  PhoneCall,
  CalendarCheck,
  Maximize2,
  Sparkles,
} from "lucide-react";
import { Homestay } from "@/types/homestay";

interface DetailModalProps {
  homestay: Homestay | null;
  onClose: () => void;
  onOpenVideo: (videoUrl: string) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  homestay,
  onClose,
  onOpenVideo,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState("standard");
  const [isBooked, setIsBooked] = useState(false);

  if (!homestay) return null;

  const currentPhoto = homestay.gallery[activePhotoIndex] || {
    url: homestay.coverImage,
    caption: homestay.name,
  };

  const handleBooking = () => {
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/65 backdrop-blur-md"
        />

        {/* Modal Window with Smooth Expand */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/35 z-10 my-auto bg-[#10231C]/90 text-white"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 border border-white/30 flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left Column: Interactive Photo Gallery */}
            <div className="md:col-span-6 p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/15">
              {/* Main Active Photo */}
              <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden shadow-lg group">
                <Image
                  src={currentPhoto.url}
                  alt={currentPhoto.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                
                {/* Photo Caption */}
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white/90 font-medium">
                  {currentPhoto.caption}
                </div>

                {/* Video Preview Button */}
                <button
                  onClick={() => onOpenVideo(homestay.videoUrl)}
                  className="absolute top-3 left-3 px-3 py-1 rounded-full bg-forest-700/90 hover:bg-forest-700 text-white text-xs font-bold flex items-center gap-1.5 border border-white/30 backdrop-blur-md shadow-md hover:scale-105 transition-transform"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-coral-400" />
                  <span>Xem Video 4K</span>
                </button>
              </div>

              {/* 4 Thumbnails Selector */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {homestay.gallery.map((photo, index) => {
                  const isActive = activePhotoIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setActivePhotoIndex(index)}
                      className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        isActive
                          ? "border-coral-400 scale-105 shadow-md"
                          : "border-white/20 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={photo.url}
                        alt={photo.caption}
                        fill
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Details & Booking Actions */}
            <div className="md:col-span-6 p-5 sm:p-6 flex flex-col justify-between gap-4">
              <div>
                {/* Badges & Rating */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-coral-500 text-white shadow-sm">
                    {homestay.tag}
                  </span>
                  <div className="flex items-center gap-1 text-amber-300 text-sm font-bold bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                    <Star className="w-4 h-4 fill-amber-300" />
                    <span>{homestay.rating}</span>
                    <span className="text-white/60 text-xs font-normal">
                      ({homestay.reviewCount} đánh giá)
                    </span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {homestay.name}
                </h2>

                <div className="flex items-start gap-1.5 text-xs text-white/70 mt-2">
                  <MapPin className="w-4 h-4 text-coral-400 shrink-0 mt-0.5" />
                  <span>{homestay.location}</span>
                </div>

                <p className="text-xs text-white/80 leading-relaxed mt-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  {homestay.description}
                </p>

                {/* Amenities Grid */}
                <div className="mt-4">
                  <span className="block text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-2">
                    Tiện ích nổi bật
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {homestay.amenities.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-white/90 bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/10"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-coral-400 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Room Selector Dropdown */}
                <div className="mt-4">
                  <label className="block text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
                    Chọn hạng phòng
                  </label>
                  <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="w-full bg-forest-900/80 border border-white/20 rounded-xl px-3 py-2 text-xs font-medium text-white outline-none cursor-pointer"
                  >
                    <option value="standard">{homestay.roomType} (Tiêu chuẩn)</option>
                    <option value="deluxe">Phòng Deluxe View Hồ Bơi (+250.000 ₫)</option>
                    <option value="suite">Phòng Suite Hoàng Gia Panorama (+600.000 ₫)</option>
                  </select>
                </div>
              </div>

              {/* Price & CTA Action */}
              <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-3">
                <div>
                  <span className="block text-[10px] text-white/60 uppercase font-semibold">
                    Tổng giá đêm nay
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-extrabold text-emerald-300">
                      {homestay.priceDiscounted.toLocaleString("vi-VN")} ₫
                    </span>
                    {homestay.priceOriginal && (
                      <span className="text-xs text-white/40 line-through">
                        {homestay.priceOriginal.toLocaleString("vi-VN")} ₫
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:0866520567"
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
                    title="Gọi tư vấn đặt phòng nhanh"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-300" />
                  </a>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleBooking}
                    className="px-5 py-3 rounded-full bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-emerald-400/40 shadow-lg cursor-pointer"
                  >
                    {isBooked ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        <span>Đã Giữ Phòng!</span>
                      </>
                    ) : (
                      <>
                        <CalendarCheck className="w-4 h-4 text-coral-400" />
                        <span>Đặt Phòng Ngay</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
