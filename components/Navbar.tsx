"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [lang, setLangState] = useState<"en" | "tr">("en");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tny_lang");
    if (saved === "tr" || saved === "en") {
      setLangState(saved);
    } else {
      const browser = navigator.language || "en";
      setLangState(browser.toLowerCase().startsWith("tr") ? "tr" : "en");
    }
  }, []);

  const setLang = (l: "en" | "tr") => {
    setLangState(l);
    localStorage.setItem("tny_lang", l);
    window.dispatchEvent(new CustomEvent("langchange", { detail: l }));
  };

  const links = [
    { href: "/#features", label: lang === "tr" ? "Özellikler" : "Features" },
    { href: "/#pricing",  label: lang === "tr" ? "Fiyatlar"   : "Pricing"  },
    { href: "/privacy",   label: lang === "tr" ? "Gizlilik"   : "Privacy"  },
  ];

  return (
    <>
      <nav style={{ background: "var(--primary)", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 100 }}>
        {/* Logo */}
        <Link href="/" style={{ color: "white", fontSize: 20, fontWeight: 800, letterSpacing: -0.5, display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
          <Image src="/logo.png" alt="Tennisytics" width={32} height={32} style={{ borderRadius: 6 }} />
          Tennisytics
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              {l.label}
            </Link>
          ))}
          <div style={{ display: "flex", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 8, overflow: "hidden" }}>
            <button onClick={() => setLang("en")} style={{ background: lang === "en" ? "rgba(255,255,255,0.2)" : "transparent", border: "none", color: lang === "en" ? "white" : "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 700, padding: "5px 10px", cursor: "pointer" }}>EN</button>
            <button onClick={() => setLang("tr")} style={{ background: lang === "tr" ? "rgba(255,255,255,0.2)" : "transparent", border: "none", color: lang === "tr" ? "white" : "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 700, padding: "5px 10px", cursor: "pointer" }}>TR</button>
          </div>
        </div>

        {/* Mobile right: lang + hamburger */}
        <div className="nav-mobile" style={{ display: "none", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 8, overflow: "hidden" }}>
            <button onClick={() => setLang("en")} style={{ background: lang === "en" ? "rgba(255,255,255,0.2)" : "transparent", border: "none", color: lang === "en" ? "white" : "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 700, padding: "5px 10px", cursor: "pointer" }}>EN</button>
            <button onClick={() => setLang("tr")} style={{ background: lang === "tr" ? "rgba(255,255,255,0.2)" : "transparent", border: "none", color: lang === "tr" ? "white" : "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 700, padding: "5px 10px", cursor: "pointer" }}>TR</button>
          </div>
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ display: "block", width: 22, height: 2, background: "white", borderRadius: 2, transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 2, background: "white", borderRadius: 2, transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 2, background: "white", borderRadius: 2, transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="nav-mobile" style={{ display: "flex", flexDirection: "column", background: "var(--primary)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "8px 0 16px", zIndex: 99 }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 15, fontWeight: 500, padding: "12px 20px" }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
