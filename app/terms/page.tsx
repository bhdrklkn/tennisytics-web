"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const content = {
  en: {
    title: "Terms of Service",
    updated: "Last updated: May 20, 2025",
    intro: `These Terms of Service ("Terms") govern your use of the Tennisytics mobile application ("App"). By downloading or using the App, you agree to be bound by these Terms.`,
    sections: [
      {
        title: "1. Acceptance of Terms",
        text: "By accessing or using Tennisytics, you confirm that you are at least 13 years old and agree to these Terms. If you do not agree, please do not use the App.",
      },
      {
        title: "2. License",
        text: "We grant you a limited, non-exclusive, non-transferable, revocable license to use the App for your personal, non-commercial purposes. You may not copy, modify, distribute, sell, or lease any part of the App.",
      },
      {
        title: "3. Your Account",
        items: [
          "You are responsible for maintaining the confidentiality of your account credentials.",
          "You agree to provide accurate, current, and complete information during registration.",
          "You are responsible for all activities that occur under your account.",
          "Notify us immediately at bhdrklkn09@gmail.com if you suspect unauthorized access.",
        ],
      },
      {
        title: "4. Subscriptions & Payments",
        items: [
          "Tennisytics offers a free tier and a paid Premium subscription.",
          "Subscriptions are billed through Apple App Store or Google Play Store.",
          "Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period.",
          "To cancel, manage your subscription through your device's app store account settings.",
          "We do not offer refunds except as required by applicable law or store policies.",
        ],
      },
      {
        title: "5. Prohibited Uses",
        text: "You agree not to:",
        items: [
          "Use the App for any unlawful purpose.",
          "Reverse-engineer, decompile, or disassemble the App.",
          "Upload or transmit viruses or any malicious code.",
          "Attempt to gain unauthorized access to any part of the App or its related systems.",
          "Use automated tools to scrape or extract data from the App.",
        ],
      },
      {
        title: "6. User Content",
        text: "You retain ownership of the match data, player profiles, and other content you enter into the App. By using the App, you grant us a limited license to store and process this content solely to provide the App's services.",
      },
      {
        title: "7. Disclaimer of Warranties",
        text: `The App is provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that the App will be uninterrupted, error-free, or free of viruses or other harmful components.`,
      },
      {
        title: "8. Limitation of Liability",
        text: "To the fullest extent permitted by law, Tennisytics shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the App.",
      },
      {
        title: "9. Changes to Terms",
        text: "We may update these Terms from time to time. We will notify you of significant changes by updating the date at the top of this page. Continued use of the App after changes constitutes acceptance of the new Terms.",
      },
      {
        title: "10. Governing Law",
        text: "These Terms are governed by the laws of Turkey. Any disputes shall be subject to the exclusive jurisdiction of the courts of Turkey.",
      },
      {
        title: "11. Contact Us",
        text: `If you have questions about these Terms, please contact us at: <a href="mailto:bhdrklkn09@gmail.com" style="color:var(--primary)">bhdrklkn09@gmail.com</a>`,
      },
    ],
  },
  tr: {
    title: "Kullanım Koşulları",
    updated: "Son güncelleme: 20 Mayıs 2025",
    intro: `Bu Kullanım Koşulları ("Koşullar"), Tennisytics mobil uygulamasını ("Uygulama") kullanımınızı düzenler. Uygulamayı indirerek veya kullanarak bu Koşulları kabul etmiş sayılırsınız.`,
    sections: [
      {
        title: "1. Koşulların Kabulü",
        text: "Tennisytics'e erişerek veya uygulamayı kullanarak en az 13 yaşında olduğunuzu ve bu Koşulları kabul ettiğinizi onaylarsınız. Kabul etmiyorsanız lütfen Uygulamayı kullanmayın.",
      },
      {
        title: "2. Lisans",
        text: "Size Uygulamayı kişisel, ticari olmayan amaçlarla kullanmanız için sınırlı, münhasır olmayan, devredilemez ve geri alınabilir bir lisans veriyoruz. Uygulamanın herhangi bir bölümünü kopyalayamaz, değiştiremez, dağıtamaz, satamaz veya kiralayamazsınız.",
      },
      {
        title: "3. Hesabınız",
        items: [
          "Hesap bilgilerinizin gizliliğini korumaktan siz sorumlusunuz.",
          "Kayıt sırasında doğru, güncel ve eksiksiz bilgi sağlamayı kabul edersiniz.",
          "Hesabınız altında gerçekleşen tüm faaliyetlerden siz sorumlusunuz.",
          "Yetkisiz erişim şüphesinde derhal bhdrklkn09@gmail.com adresine bildirim yapın.",
        ],
      },
      {
        title: "4. Abonelik ve Ödemeler",
        items: [
          "Tennisytics ücretsiz plan ve ücretli Premium abonelik sunar.",
          "Abonelikler Apple App Store veya Google Play Store üzerinden faturalandırılır.",
          "Abonelikler, mevcut dönem sona ermeden en az 24 saat önce iptal edilmediği sürece otomatik olarak yenilenir.",
          "İptal için cihazınızın uygulama mağazası hesap ayarlarından aboneliğinizi yönetin.",
          "Yürürlükteki mevzuat veya mağaza politikalarının gerektirdiği durumlar dışında geri ödeme yapılmaz.",
        ],
      },
      {
        title: "5. Yasaklı Kullanımlar",
        text: "Aşağıdakileri yapmamayı kabul edersiniz:",
        items: [
          "Uygulamayı herhangi bir yasadışı amaç için kullanmak.",
          "Uygulamayı tersine mühendislik, derleme veya ayrıştırma işlemlerine tabi tutmak.",
          "Virüs veya kötü amaçlı kod yüklemek ya da iletmek.",
          "Uygulamanın herhangi bir bölümüne veya ilgili sistemlere yetkisiz erişim sağlamaya çalışmak.",
          "Uygulamadan veri toplamak için otomatik araçlar kullanmak.",
        ],
      },
      {
        title: "6. Kullanıcı İçeriği",
        text: "Uygulamaya girdiğiniz maç verileri, oyuncu profilleri ve diğer içeriklerin mülkiyeti size aittir. Uygulamayı kullanarak, bu içerikleri yalnızca Uygulama hizmetlerini sağlamak amacıyla depolamamıza ve işlememize sınırlı bir lisans vermiş olursunuz.",
      },
      {
        title: "7. Garanti Reddi",
        text: `Uygulama, açık veya zımni herhangi bir garanti olmaksızın "olduğu gibi" ve "mevcut olduğu şekilde" sunulmaktadır. Uygulamanın kesintisiz, hatasız veya virüs ve diğer zararlı bileşenlerden arındırılmış olacağını garanti etmiyoruz.`,
      },
      {
        title: "8. Sorumluluk Sınırı",
        text: "Yasaların izin verdiği azami ölçüde, Tennisytics, Uygulamanın kullanımından kaynaklanan dolaylı, tesadüfi, özel, sonuçsal veya cezai zararlardan sorumlu tutulamaz.",
      },
      {
        title: "9. Koşullardaki Değişiklikler",
        text: "Bu Koşulları zaman zaman güncelleyebiliriz. Önemli değişiklikleri bu sayfanın üst kısmındaki tarihi güncelleyerek size bildireceğiz. Değişiklikler sonrasında Uygulamayı kullanmaya devam etmeniz, yeni Koşulları kabul ettiğiniz anlamına gelir.",
      },
      {
        title: "10. Uygulanacak Hukuk",
        text: "Bu Koşullar Türkiye Cumhuriyeti hukukuna tabidir. Doğabilecek uyuşmazlıklarda Türkiye mahkemeleri münhasır yargı yetkisine sahiptir.",
      },
      {
        title: "11. Bize Ulaşın",
        text: `Bu Koşullar hakkında sorularınız için bize ulaşın: <a href="mailto:bhdrklkn09@gmail.com" style="color:var(--primary)">bhdrklkn09@gmail.com</a>`,
      },
    ],
  },
};

export default function TermsPage() {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<"en" | "tr">("en");

  useEffect(() => {
    const param = searchParams.get("lang");
    if (param === "tr" || param === "en") { setLang(param); return; }
    const saved = localStorage.getItem("tny_lang");
    if (saved === "tr" || saved === "en") setLang(saved);
    const handler = (e: Event) => setLang((e as CustomEvent).detail);
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, [searchParams]);

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
