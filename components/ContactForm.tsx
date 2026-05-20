"use client";

import { useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

interface Props { lang: "tr" | "en" }

const copy = {
  tr: {
    title: "Bize Ulaşın",
    sub: "Sorularınız için mesaj bırakabilirsiniz.",
    name: "Adınız",
    email: "E-posta",
    message: "Mesajınız",
    send: "Gönder",
    sending: "Gönderiliyor...",
    success: "Mesajınız iletildi, teşekkürler!",
    error: "Bir hata oluştu, tekrar deneyin.",
  },
  en: {
    title: "Get in Touch",
    sub: "Have a question? Leave us a message.",
    name: "Your Name",
    email: "Email",
    message: "Your Message",
    send: "Send",
    sending: "Sending...",
    success: "Message sent, thank you!",
    error: "Something went wrong, please try again.",
  },
};

export default function ContactForm({ lang }: Props) {
  const c = copy[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus("sending");
    try {
      await addDoc(collection(db, "contactMessages"), {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        createdAt: Date.now(),
      });
      setStatus("success");
      setName(""); setEmail(""); setMessage("");
    } catch {
      setStatus("error");
    }
  };

  const input: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.07)", color: "white", fontSize: 14, outline: "none",
    boxSizing: "border-box",
  };

  return (
    <section id="contact" style={{ background: "var(--primary)", padding: "80px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "white", marginBottom: 8, textAlign: "center" }}>{c.title}</h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginBottom: 36, textAlign: "center" }}>{c.sub}</p>

        {status === "success" ? (
          <div style={{ background: "rgba(200,232,75,0.12)", border: "1.5px solid rgba(200,232,75,0.4)", borderRadius: 14, padding: "20px 24px", color: "#C8E84B", fontWeight: 600, textAlign: "center", fontSize: 15 }}>
            {c.success}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input style={input} placeholder={c.name} value={name} onChange={e => setName(e.target.value)} required />
            <input style={input} type="email" placeholder={c.email} value={email} onChange={e => setEmail(e.target.value)} required />
            <textarea style={{ ...input, minHeight: 120, resize: "vertical" }} placeholder={c.message} value={message} onChange={e => setMessage(e.target.value)} required />
            {status === "error" && (
              <p style={{ color: "#ff6b6b", fontSize: 13, margin: 0 }}>{c.error}</p>
            )}
            <button type="submit" disabled={status === "sending"} style={{
              background: "#C8E84B", color: "#1a1f2e", border: "none", borderRadius: 10, padding: "14px 28px",
              fontSize: 15, fontWeight: 700, cursor: status === "sending" ? "not-allowed" : "pointer",
              opacity: status === "sending" ? 0.7 : 1, transition: "opacity 0.2s",
            }}>
              {status === "sending" ? c.sending : c.send}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
