"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BedDouble, MapPin, DollarSign, Search, Sparkles } from "lucide-react";

interface HeroSearchBarProps {
  onSearch?: (criteria: { roomType: string; location: string; budget: string }) => void;
}

export const HeroSearchBar: React.FC<HeroSearchBarProps> = ({ onSearch }) => {
  const [roomType, setRoomType] = useState("homestay");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("1to3");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ roomType, location, budget });
    }
  };

  return (
    <motion.div
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto px-4 mt-6 sm:mt-10"
    >
      <form
        onSubmit={handleSubmit}
        className="glass-panel rounded-full p-2 sm:p-2.5 flex flex-col md:flex-row items-center gap-2 shadow-2xl relative"
      >
        {/* Section 1: Room Type */}
        <motion.div
          onHoverStart={() => setHoveredSection("roomType")}
          onHoverEnd={() => setHoveredSection(null)}
          whileHover={{ scale: 1.012 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`flex-1 w-full px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 flex items-center gap-3 ${
            hoveredSection === "roomType"
              ? "bg-white/25 shadow-inner"
              : "hover:bg-white/10"
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-forest-700/60 flex items-center justify-center text-emerald-300 shrink-0">
            <BedDouble className="w-4 h-4" />
          </div>
          <div className="flex-1 text-left">
            <span className="block text-[11px] font-bold text-emerald-200 uppercase tracking-wider">
              Loại phòng
            </span>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full bg-transparent text-white font-semibold text-sm outline-none cursor-pointer appearance-none"
            >
              <option value="homestay" className="bg-[#12221E] text-white">
                Homestay &amp; Villa
              </option>
              <option value="resort" className="bg-[#12221E] text-white">
                Resort Sinh Thái
              </option>
              <option value="bungalow" className="bg-[#12221E] text-white">
                Bungalow View Núi
              </option>
            </select>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] h-8 bg-white/20" />

        {/* Section 2: Location */}
        <motion.div
          onHoverStart={() => setHoveredSection("location")}
          onHoverEnd={() => setHoveredSection(null)}
          whileHover={{ scale: 1.012 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`flex-[1.2] w-full px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 flex items-center gap-3 ${
            hoveredSection === "location"
              ? "bg-white/25 shadow-inner"
              : "hover:bg-white/10"
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-forest-700/60 flex items-center justify-center text-coral-400 shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="flex-1 text-left">
            <span className="block text-[11px] font-bold text-emerald-200 uppercase tracking-wider">
              Địa điểm
            </span>
            <input
              type="text"
              placeholder="Tam Cốc, Tràng An, Hang Múa..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-white placeholder-white/50 font-semibold text-sm outline-none"
            />
          </div>
        </motion.div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] h-8 bg-white/20" />

        {/* Section 3: Budget */}
        <motion.div
          onHoverStart={() => setHoveredSection("budget")}
          onHoverEnd={() => setHoveredSection(null)}
          whileHover={{ scale: 1.012 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`flex-1 w-full px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 flex items-center gap-3 ${
            hoveredSection === "budget"
              ? "bg-white/25 shadow-inner"
              : "hover:bg-white/10"
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-forest-700/60 flex items-center justify-center text-amber-300 shrink-0">
            <DollarSign className="w-4 h-4" />
          </div>
          <div className="flex-1 text-left">
            <span className="block text-[11px] font-bold text-emerald-200 uppercase tracking-wider">
              Ngân sách
            </span>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-transparent text-white font-semibold text-sm outline-none cursor-pointer appearance-none"
            >
              <option value="all" className="bg-[#12221E] text-white">
                Tất cả mức giá
              </option>
              <option value="under1" className="bg-[#12221E] text-white">
                Dưới 1 triệu ₫
              </option>
              <option value="1to3" className="bg-[#12221E] text-white">
                1tr – 3 triệu ₫
              </option>
              <option value="above3" className="bg-[#12221E] text-white">
                Trên 3 triệu ₫
              </option>
            </select>
          </div>
        </motion.div>

        {/* Action Button: Search */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          type="submit"
          className="w-full md:w-auto px-6 py-3.5 rounded-full bg-forest-700 hover:bg-forest-800 text-white font-bold text-sm flex items-center justify-center gap-2 border border-emerald-400/40 shadow-lg shrink-0 cursor-pointer"
        >
          <Search className="w-4 h-4 text-emerald-300" />
          <span>Tìm Phòng</span>
        </motion.button>
      </form>
    </motion.div>
  );
};
