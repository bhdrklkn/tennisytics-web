"use client";

import { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs, orderBy, query } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

const ALLOWED_EMAIL = "bhdrklkn09@gmail.com";

interface Message {
  id: string;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  createdAt?: number;
}

function esc(str: string) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user && user.email === ALLOWED_EMAIL) {
        setLoggedIn(true);
        await loadMessages();
      } else {
        setLoggedIn(false);
      }
    });
    return () => unsub();
  }, []);

  const doLogin = async () => {
    setError("");
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      if (cred.user.email !== ALLOWED_EMAIL) {
        await signOut(auth);
        setError("Bu hesabın admin yetkisi yok.");
      }
    } catch {
      setError("Giriş başarısız. E-posta veya şifre hatalı.");
    }
  };

  const loadMessages = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, "contactMessages"), orderBy("createdAt", "desc")));
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Message)));
    } catch (e: unknown) {
      console.error(e);
    }
    setLoading(false);
  };

  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "white", borderRadius: 12, padding: "2.5rem", maxWidth: 400, width: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          <h1 style={{ color: "var(--primary)", marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: 800 }}>🎾 Tennisytics Admin</h1>
          {error && <p style={{ color: "#c0392b", fontSize: "0.9rem", marginBottom: "1rem" }}>{error}</p>}
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="E-posta"
            style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid var(--mid)", borderRadius: 8, fontSize: "1rem", marginBottom: "1rem", boxSizing: "border-box", background: "#f9f9f9" }} />
          <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="Şifre"
            onKeyDown={e => e.key === "Enter" && doLogin()}
            style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid var(--mid)", borderRadius: 8, fontSize: "1rem", marginBottom: "1rem", boxSizing: "border-box", background: "#f9f9f9" }} />
          <button onClick={doLogin}
            style={{ width: "100%", padding: "0.85rem", background: "var(--primary)", color: "white", border: "none", borderRadius: 8, fontSize: "1rem", fontWeight: 700, cursor: "pointer" }}>
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>
      <div style={{ background: "var(--primary)", color: "white", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "1.2rem", margin: 0 }}>🎾 Tennisytics Admin</h2>
        <button onClick={() => signOut(auth)} style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.4)", padding: "0.4rem 1rem", borderRadius: 6, cursor: "pointer", fontSize: "0.9rem" }}>
          Çıkış
        </button>
      </div>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ background: "white", borderRadius: 10, padding: "1.25rem 1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)" }}>{messages.length}</div>
            <div style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.25rem" }}>Toplam Mesaj</div>
          </div>
        </div>
        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--primary)", margin: "2rem 0 1rem", borderBottom: "2px solid var(--mid)", paddingBottom: "0.5rem" }}>
          İletişim Mesajları
        </div>
        {loading && <div style={{ textAlign: "center", color: "#888", padding: "1rem" }}>Yükleniyor…</div>}
        {!loading && messages.length === 0 && <div style={{ textAlign: "center", color: "#888", padding: "2rem" }}>Henüz mesaj yok.</div>}
        {messages.map(m => {
          const date = m.createdAt ? new Date(m.createdAt).toLocaleString("tr-TR") : "";
          const subject = encodeURIComponent(`Re: ${m.subject || "Tennisytics"}`);
          const body = encodeURIComponent(`\n\n---\nMesajınız:\n${m.message}`);
          return (
            <div key={m.id} style={{ background: "white", borderRadius: 10, padding: "1.25rem", marginBottom: "0.75rem", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span style={{ fontWeight: 700, color: "var(--primary)" }}>{esc(m.name || "")} &lt;{esc(m.email || "")}&gt;</span>
                <span style={{ fontSize: "0.8rem", color: "#888" }}>{date}</span>
              </div>
              {m.subject && <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#444", marginBottom: "0.4rem" }}>{esc(m.subject)}</div>}
              <div style={{ fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{esc(m.message || "")}</div>
              <a href={`mailto:${esc(m.email || "")}?subject=${subject}&body=${body}`}
                style={{ marginTop: "0.75rem", display: "inline-block", background: "var(--primary)", color: "white", padding: "0.4rem 1rem", borderRadius: 6, textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}>
                Yanıtla
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
