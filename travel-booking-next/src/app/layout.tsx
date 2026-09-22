import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ninh Bình Eco Travel & Homestay Booking",
  description: "Trải nghiệm đặt phòng homestay, villa nghỉ dưỡng giữa núi non Tràng An, Tam Cốc với giao diện Glassmorphism & video phong cảnh 4K.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-[#0E1A17] text-milk antialiased min-h-screen overflow-x-hidden selection:bg-coral-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
