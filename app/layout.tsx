import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tennisytics – Tennis Analytics for Coaches",
  description: "Track matches, analyze player performance, and grow your tennis coaching business with Tennisytics.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
