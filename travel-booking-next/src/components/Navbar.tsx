"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Moon, Video, Search, User } from "lucide-react";

interface NavbarProps {
  onToggleCinematic: () => void;
  isCinematicMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleCinematic,
  isCinematicMode,
}) => {
  const [activeTab, setActiveTab] = useState("dulich");

  const navItems = [
    { id: "dulich", label: "Du lịch" },
    { id: "tour", label: "Tour phố bình" },
    { id: "tutuc", label: "Tự túc" },
    { id: "khachsan", label: "Khách sạn" },
    { id: "trainghiem", label: "Trải nghiệm" },
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: isCinematicMode ? 0.2 : 1 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-4 z-40 px-4 sm:px-8 max-w-7xl mx-auto w-full"
    >
      <div className="glass-panel rounded-full px-5 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer select-none">
          <div className="w-9 h-9 rounded-full bg-forest-700 flex items-center justify-center text-white shadow-md">
            <Compass className="w-5 h-5 text-emerald-300 animate-spin-slow" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white drop-shadow-sm">
              Du lịch Ninh Bình
            </span>
            <span className="block text-[10px] text-emerald-200/80 -mt-0.5 font-medium tracking-wide">
              Eco Travel &amp; Heritage
            </span>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/10 p-1 rounded-full border border-white/15">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-forest-700 rounded-full shadow-sm border border-emerald-500/30 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Cinematic Video Mode Toggle */}
          <button
            onClick={onToggleCinematic}
            title="Bật/Tắt chế độ xem video toàn cảnh 4K"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-forest-700/80 hover:bg-forest-700 text-white text-xs font-bold border border-emerald-400/30 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Video className="w-3.5 h-3.5 text-coral-400" />
            <span className="hidden sm:inline">
              {isCinematicMode ? "Hiện Giao Diện" : "Xem Video 4K"}
            </span>
          </button>

          {/* Quick Search Button */}
          <button
            aria-label="Tìm kiếm"
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 flex items-center justify-center text-white transition-transform hover:scale-105 active:scale-95"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* User Profile Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-forest-700 to-emerald-500 border border-white/40 flex items-center justify-center font-bold text-xs text-white shadow-inner cursor-pointer">
            J
          </div>
        </div>
      </div>
    </motion.header>
  );
};
