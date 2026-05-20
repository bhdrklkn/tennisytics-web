"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const content = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: May 20, 2025",
    intro: `Tennisytics ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use the Tennisytics mobile application.`,
    sections: [
      {
        title: "1. Information We Collect",
        text: "We collect the following types of information:",
        items: [
          "<strong>Account information:</strong> Email address and name when you register or sign in with Google.",
          "<strong>Profile data:</strong> Your name, surname, role (coach / player / parent), and optional phone number.",
          "<strong>Match and player data:</strong> Match scores, player statistics, and related coaching data you enter into the app.",
          "<strong>Purchase information:</strong> Subscription status managed through RevenueCat. We do not store payment card details.",
        ],
      },
      {
        title: "2. How We Use Your Information",
        items: [
          "To provide and maintain the app's core features (match tracking, statistics, player management).",
          "To authenticate your account and keep your data secure.",
          "To process in-app subscriptions.",
          "To sync your data across devices.",
        ],
      },
      {
        title: "3. Third-Party Services",
        text: "We use the following third-party services which may collect data as described in their own privacy policies:",
        items: [
          `<strong>Firebase (Google):</strong> Authentication, database storage, and crash reporting. <a href="https://firebase.google.com/support/privacy" target="_blank" style="color:var(--primary)">Firebase Privacy Policy</a>`,
          `<strong>RevenueCat:</strong> In-app subscription management. <a href="https://www.revenuecat.com/privacy" target="_blank" style="color:var(--primary)">RevenueCat Privacy Policy</a>`,
          "<strong>Google Sign-In:</strong> Optional sign-in method via your Google account.",
          "<strong>Sentry:</strong> Crash and error reporting to improve app stability.",
        ],
      },
      {
        title: "4. Data Retention",
        text: "Your data is retained as long as your account is active. You can delete your account at any time from the Profile screen within the app. Upon deletion, your personal data and match records are permanently removed.",
      },
      {
        title: "5. Data Security",
        text: "We use industry-standard security measures including encrypted connections (HTTPS/TLS) and Firebase security rules to protect your data from unauthorized access.",
      },
      {
        title: "6. Children's Privacy",
        text: "Tennisytics is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us.",
      },
      {
        title: "7. Your Rights",
        text: "You have the right to:",
        items: [
          "Access the personal data we hold about you.",
          "Request correction of inaccurate data.",
          `Request deletion of your data (via the "Delete Account" option in the app).`,
        ],
      },
      {
        title: "8. Changes to This Policy",
        text: "We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the date at the top of this page.",
      },
      {
        title: "9. GDPR / KVKK Rights",
        text: "If you are located in Turkey or the European Economic Area, you have the following additional rights:",
        items: [
          "Right to access — request a copy of the personal data we hold about you.",
          "Right to rectification — request correction of inaccurate or incomplete data.",
          "Right to erasure — request deletion of your data (available via 'Delete Account' in the app).",
          "Right to data portability — receive your data in a structured, machine-readable format.",
          "Right to object — object to processing of your data in certain circumstances.",
          "Right to lodge a complaint — with a supervisory authority (in Turkey: KVKK, <a href='https://kvkk.gov.tr' target='_blank' style='color:var(--primary)'>kvkk.gov.tr</a>).",
        ],
      },
      {
        title: "10. Contact Us",
        text: `If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:bhdrklkn09@gmail.com" style="color:var(--primary)">bhdrklkn09@gmail.com</a>`,
      },
    ],
  },
  tr: {
    title: "Gizlilik Politikası",
    updated: "Son güncelleme: 20 Mayıs 2025",
    intro: `Tennisytics ("biz" veya "uygulama") gizliliğinizi korumayı taahhüt eder. Bu Gizlilik Politikası, Tennisytics mobil uygulamasını kullandığınızda bilgilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar.`,
    sections: [
      {
        title: "1. Topladığımız Bilgiler",
        text: "Aşağıdaki türde bilgileri topluyoruz:",
        items: [
          "<strong>Hesap bilgileri:</strong> Kayıt olurken veya Google ile giriş yaparken e-posta adresiniz ve adınız.",
          "<strong>Profil verileri:</strong> Adınız, soyadınız, rolünüz (koç / oyuncu / veli) ve isteğe bağlı telefon numaranız.",
          "<strong>Maç ve oyuncu verileri:</strong> Uygulamaya girdiğiniz maç skorları, oyuncu istatistikleri ve ilgili koçluk verileri.",
          "<strong>Satın alma bilgileri:</strong> RevenueCat aracılığıyla yönetilen abonelik durumu. Ödeme kartı bilgilerini saklamıyoruz.",
        ],
      },
      {
        title: "2. Bilgilerinizi Nasıl Kullanıyoruz",
        items: [
          "Uygulamanın temel özelliklerini sağlamak ve sürdürmek (maç takibi, istatistikler, oyuncu yönetimi).",
          "Hesabınızı doğrulamak ve verilerinizi güvende tutmak.",
          "Uygulama içi abonelikleri işlemek.",
          "Verilerinizi cihazlar arasında senkronize etmek.",
        ],
      },
      {
        title: "3. Üçüncü Taraf Hizmetler",
        text: "Kendi gizlilik politikalarında açıklandığı şekilde veri toplayabilecek aşağıdaki üçüncü taraf hizmetleri kullanıyoruz:",
        items: [
          `<strong>Firebase (Google):</strong> Kimlik doğrulama, veritabanı depolama ve çökme raporlama. <a href="https://firebase.google.com/support/privacy" target="_blank" style="color:var(--primary)">Firebase Gizlilik Politikası</a>`,
          `<strong>RevenueCat:</strong> Uygulama içi abonelik yönetimi. <a href="https://www.revenuecat.com/privacy" target="_blank" style="color:var(--primary)">RevenueCat Gizlilik Politikası</a>`,
          "<strong>Google ile Giriş:</strong> Google hesabınız aracılığıyla isteğe bağlı giriş yöntemi.",
          "<strong>Sentry:</strong> Uygulama kararlılığını artırmak için çökme ve hata raporlama.",
        ],
      },
      {
        title: "4. Veri Saklama",
        text: "Verileriniz hesabınız aktif olduğu sürece saklanır. Uygulama içindeki Profil ekranından hesabınızı istediğiniz zaman silebilirsiniz. Silme işlemi sonrasında kişisel verileriniz ve maç kayıtlarınız kalıcı olarak kaldırılır.",
      },
      {
        title: "5. Veri Güvenliği",
        text: "Verilerinizi yetkisiz erişime karşı korumak için şifreli bağlantılar (HTTPS/TLS) ve Firebase güvenlik kuralları dahil endüstri standardı güvenlik önlemleri kullanıyoruz.",
      },
      {
        title: "6. Çocukların Gizliliği",
        text: "Tennisytics, 13 yaşın altındaki çocuklara yönelik değildir. 13 yaşın altındaki çocuklardan bilerek kişisel bilgi toplamıyoruz. Bir çocuğun bize kişisel bilgi verdiğini düşünüyorsanız lütfen bizimle iletişime geçin.",
      },
      {
        title: "7. Haklarınız",
        text: "Aşağıdaki haklara sahipsiniz:",
        items: [
          "Hakkınızda tuttuğumuz kişisel verilere erişim.",
          "Yanlış verilerin düzeltilmesini talep etme.",
          `Verilerinizin silinmesini talep etme (uygulamadaki "Hesabı Sil" seçeneği aracılığıyla).`,
        ],
      },
      {
        title: "8. Bu Politikadaki Değişiklikler",
        text: "Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikleri bu sayfanın üst kısmındaki tarihi güncelleyerek size bildireceğiz.",
      },
      {
        title: "9. KVKK Kapsamında Haklarınız",
        text: "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) madde 11 kapsamında aşağıdaki haklara sahipsiniz:",
        items: [
          "Kişisel verilerinizin işlenip işlenmediğini öğrenme.",
          "Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme.",
          "Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme.",
          "Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme.",
          "Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme.",
          "Kişisel verilerin silinmesini veya yok edilmesini isteme (uygulamadaki 'Hesabı Sil' seçeneği aracılığıyla).",
          "İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonuç ortaya çıkmasına itiraz etme.",
          "Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.",
        ],
      },
      {
        title: "10. Veri Sorumlusu",
        text: `Bu uygulama kapsamında veri sorumlusu sıfatıyla hareket eden kişiye şu adresten ulaşabilirsiniz: <a href="mailto:bhdrklkn09@gmail.com" style="color:var(--primary)">bhdrklkn09@gmail.com</a>. KVKK kapsamındaki başvurularınızı da aynı adres üzerinden iletebilirsiniz. Kişisel Verileri Koruma Kurumu'na (KVKK) şikâyet için: <a href="https://kvkk.gov.tr" target="_blank" style="color:var(--primary)">kvkk.gov.tr</a>`,
      },
      {
        title: "11. Bize Ulaşın",
        text: `Bu Gizlilik Politikası hakkında sorularınız için bize ulaşın: <a href="mailto:bhdrklkn09@gmail.com" style="color:var(--primary)">bhdrklkn09@gmail.com</a>`,
      },
    ],
  },
};

export default function PrivacyPage() {
  const [lang, setLang] = useState<"en" | "tr">("en");

  useEffect(() => {
    const saved = localStorage.getItem("tny_lang");
    if (saved === "tr" || saved === "en") setLang(saved);
    const handler = (e: Event) => setLang((e as CustomEvent).detail);
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const c = content[lang];

  return (
    <>
      <Navbar />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ maxWidth: 760, margin: "60px auto", padding: "0 24px 80px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: "var(--primary)", marginBottom: 8 }}>{c.title}</h1>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 40 }}>{c.updated}</p>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7, marginBottom: 24 }}>{c.intro}</p>
        {c.sections.map((s, i) => (
          <div key={i}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--primary)", margin: "32px 0 12px" }}>{s.title}</h2>
            {s.text && <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7, marginBottom: s.items ? 8 : 0 }} dangerouslySetInnerHTML={{ __html: s.text }} />}
            {s.items && (
              <ul style={{ paddingLeft: 20, margin: "8px 0" }}>
                {s.items.map((item, j) => (
                  <li key={j} style={{ fontSize: 15, color: "#374151", lineHeight: 1.7, marginBottom: 6 }} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            )}
          </div>
        ))}
      </motion.div>
      <Footer />
    </>
  );
}
