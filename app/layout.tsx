import type { Metadata } from "next";
import "./globals.css";
import TennisBallCanvas from "@/components/TennisBallCanvas";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Tennisytics – Tennis Analytics for Coaches",
  description: "Track matches, analyze player performance, and grow your tennis coaching business with Tennisytics.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ position: "relative" }}>
        <TennisBallCanvas />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
