"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

interface BackgroundVideoProps {
  isCinematicMode?: boolean;
  onExitCinematic?: () => void;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  isCinematicMode = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none select-none">
      {/* Video Background (Autoplay, Muted, Loop) */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="https://images.unsplash.com/photo-1528127269322-539801943592?w=1920&q=80"
        className="absolute top-1/2 left-1/2 w-auto min-w-full min-h-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] scale-105"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-fog-over-the-mountains-42732-large.mp4"
          type="video/mp4"
        />
        {/* Fallback image if video fails to load */}
        Your browser does not support HTML5 video.
      </video>

      {/* Gentle Dynamic Overlay: Fades out smoothly when entering cinematic mode */}
      <motion.div
        animate={{
          opacity: isCinematicMode ? 0.05 : 0.45,
          backdropFilter: isCinematicMode ? "blur(0px)" : "blur(1.5px)",
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-gradient-to-b from-[#0B1D16]/60 via-[#0B1D16]/35 to-[#0E1A17]/85"
      />

      {/* Ambient Forest Green Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_0%,rgba(11,29,22,0.6)_100%)] pointer-events-none" />
    </div>
  );
};
