"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [lang, setLang] = useState<"en" | "tr">("en");

  useEffect(() => {
    const saved = localStorage.getItem("tny_lang");
    if (saved === "tr" || saved === "en") setLang(saved);
    const handler = (e: Event) => setLang((e as CustomEvent).detail);
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  return (
    <footer style={{ background: "var(--primary)", color: "rgba(255,255,255,0.65)", textAlign: "center", padding: "32px 24px", fontSize: 13 }}>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "center", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
        <Link href="/privacy" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontWeight: 500 }}>
          {lang === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
        </Link>
        <Link href="/terms" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontWeight: 500 }}>
          {lang === "tr" ? "Kullanım Koşulları" : "Terms of Service"}
        </Link>
        <a href="mailto:bhdrklkn09@gmail.com" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontWeight: 500 }}>
          {lang === "tr" ? "İletişim" : "Contact"}
        </a>
        <a href="https://www.instagram.com/tennisytics" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ display: "flex", alignItems: "center", opacity: 0.85 }}>
          <Image src="/instagram.svg" alt="Instagram" width={20} height={20} />
        </a>
      </div>
      <div>© 2026 Tennisytics. {lang === "tr" ? "Tüm hakları saklıdır." : "All rights reserved."}</div>
    </footer>
  );
}
