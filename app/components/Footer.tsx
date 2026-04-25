"use client";

import Image from "next/image";
import { Icon } from "./Icon";
import { useT } from "./I18nProvider";

type Bi = { en: string; ar: string };

const COLUMNS: { title: Bi; links: Bi[] }[] = [
  {
    title: { en: "Care", ar: "الرعاية" },
    links: [
      { en: "Specialties", ar: "التخصصات" },
      { en: "Find a Doctor", ar: "ابحث عن طبيب" },
      { en: "Telemedicine", ar: "الطب عن بُعد" },
      { en: "Home Healthcare", ar: "الرعاية المنزلية" },
      { en: "Programs", ar: "البرامج" },
      { en: "Insurance", ar: "التأمين" },
    ],
  },
  {
    title: { en: "Patients", ar: "المرضى" },
    links: [
      { en: "Book an appointment", ar: "احجز موعداً" },
      { en: "Patient portal", ar: "بوابة المرضى" },
      { en: "Mobile app", ar: "تطبيق الجوال" },
      { en: "Lab results", ar: "نتائج المختبر" },
      { en: "Billing", ar: "الفواتير" },
      { en: "FAQ", ar: "الأسئلة الشائعة" },
    ],
  },
  {
    title: { en: "Company", ar: "الشركة" },
    links: [
      { en: "About MyClinic", ar: "عن ماي كلينك" },
      { en: "Our doctors", ar: "أطباؤنا" },
      { en: "Careers", ar: "الوظائف" },
      { en: "News & Media", ar: "الأخبار والإعلام" },
      { en: "CSR", ar: "المسؤولية الاجتماعية" },
      { en: "Contact", ar: "تواصل معنا" },
    ],
  },
  {
    title: { en: "Connect", ar: "تواصل" },
    links: [
      { en: "Hotline 920 022 811", ar: "الخط الساخن ٩٢٠ ٠٢٢ ٨١١" },
      { en: "WhatsApp Support", ar: "دعم واتساب" },
      { en: "Instagram", ar: "إنستغرام" },
      { en: "Twitter / X", ar: "تويتر / X" },
      { en: "LinkedIn", ar: "لينكدإن" },
      { en: "YouTube", ar: "يوتيوب" },
    ],
  },
];

const BADGES: { name: string; label: Bi }[] = [
  { name: "JCI", label: { en: "Joint Commission Intl.", ar: "اللجنة المشتركة الدولية" } },
  { name: "CBAHI", label: { en: "Saudi Accreditation", ar: "الاعتماد السعودي" } },
  { name: "ISO", label: { en: "9001:2015", ar: "9001:2015" } },
];

export function Footer() {
  const { t, pick } = useT();
  return (
    <footer className="mc-footer" style={{ background: "var(--brand-900)", color: "rgba(255,255,255,0.8)" }}>
      <div className="mc-footer-newsletter" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div
          className="container mc-footer-newsletter-inner"
          style={{
            padding: "48px 32px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 32,
            alignItems: "center",
          }}
        >
          <div className="mc-footer-newsletter-copy">
            <h3
              className="serif"
              style={{ color: "white", fontSize: 28, fontWeight: 500, marginBottom: 6 }}
            >
              {t("newsletter_title")}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>{t("newsletter_sub")}</p>
          </div>
          <div className="flex mc-footer-subscribe" style={{ gap: 8, minWidth: 400 }}>
            <input
              placeholder={pick("your@email.com", "بريدك@example.com")}
              style={{
                flex: 1,
                padding: "14px 18px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 10,
                color: "white",
                fontFamily: "inherit",
                fontSize: 14,
                outline: "none",
              }}
            />
            <button className="btn btn-accent" style={{ padding: "14px 24px" }}>
              {t("subscribe")} <Icon name="arrow" size={14} />
            </button>
          </div>
        </div>
      </div>

      <div
        className="container mc-footer-main"
        style={{
          padding: "64px 32px",
          display: "grid",
          gridTemplateColumns: "1.4fr repeat(4, 1fr)",
          gap: 48,
        }}
      >
        <div className="mc-footer-brand">
          <div style={{ marginBottom: 20 }}>
            <Image
              src="/myclinic-logo.webp"
              alt="My Clinic"
              width={180}
              height={64}
              style={{ height: "auto", width: 180, display: "block" }}
              priority
            />
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 13,
              marginBottom: 20,
            }}
          >
            {pick(
              "A leading medical group delivering advanced, compassionate care across the Kingdom of Saudi Arabia since 2008.",
              "مجموعة طبية رائدة تقدم رعاية متقدمة بإنسانية في جميع أنحاء المملكة العربية السعودية منذ ٢٠٠٨.",
            )}
          </p>
          <div className="flex" style={{ gap: 6 }}>
            {BADGES.map((b) => (
              <div
                key={b.name}
                className="mc-footer-badge"
                title={pick(b.label.en, b.label.ar)}
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 6,
                  padding: "6px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {b.name}
              </div>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div className="mc-footer-column" key={col.title.en}>
            <div
              className="mc-footer-column-title"
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "white",
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              {pick(col.title.en, col.title.ar)}
            </div>
            <div className="mc-footer-links" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map((l) => (
                <a
                  key={l.en}
                  href="#"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    fontSize: 13,
                  }}
                >
                  {pick(l.en, l.ar)}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div
          className="container between mc-footer-bottom"
          style={{ padding: "24px 32px", fontSize: 12 }}
        >
          <div className="mc-footer-rights" style={{ color: "rgba(255,255,255,0.5)" }}>{t("footer_rights")}</div>
          <div className="flex mc-footer-legal" style={{ gap: 24 }}>
            <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              {t("privacy")}
            </a>
            <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              {t("terms")}
            </a>
            <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              {t("cookies")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
