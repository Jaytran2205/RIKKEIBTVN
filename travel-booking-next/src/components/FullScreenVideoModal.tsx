"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Play, Pause, Compass } from "lucide-react";

interface FullScreenVideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  title?: string;
  onClose: () => void;
}

export const FullScreenVideoModal: React.FC<FullScreenVideoModalProps> = ({
  isOpen,
  videoUrl,
  title = "Khám Phá Cảnh Quan Ninh Bình 4K",
  onClose,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isOpen) return null;

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center select-none"
      >
        {/* Fullscreen Video Element */}
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          playsInline
          loop
          muted={isMuted}
          className="w-full h-full object-cover"
        />

        {/* Top Control Bar with Glassmorphism */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 pointer-events-auto">
          <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2.5">
            <Compass className="w-4 h-4 text-emerald-300 animate-spin-slow" />
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow-sm">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleMute}
              className="glass-panel w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-transform hover:scale-105 active:scale-95"
              aria-label="Bật/Tắt âm thanh"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
            </button>

            {/* Play / Pause Toggle */}
            <button
              onClick={togglePlay}
              className="glass-panel w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-transform hover:scale-105 active:scale-95"
              aria-label="Tạm dừng / Phát tiếp"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-300" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/40 flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95 shadow-xl"
              aria-label="Thoát chế độ toàn màn hình"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Ambient Caption Overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none px-4 z-20">
          <p className="text-white/80 text-xs sm:text-sm font-medium tracking-wide drop-shadow-md bg-black/40 px-5 py-2 rounded-full border border-white/15 backdrop-blur-md">
            Nhấn ESC hoặc phím đóng để quay lại giao diện đặt phòng
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
