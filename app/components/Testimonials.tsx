"use client";

import { useState } from "react";
import { GoogleLogo, Icon, StarFill } from "./Icon";
import { useT } from "./I18nProvider";

type Bi = { en: string; ar: string };

const REVIEWS: {
  name: Bi;
  rating: number;
  when: Bi;
  city: Bi;
  title: Bi;
  text: Bi;
  spec: Bi;
}[] = [
  {
    name: { en: "Ahmed K.", ar: "أحمد ك." },
    rating: 5,
    when: { en: "2 weeks ago", ar: "قبل أسبوعين" },
    city: { en: "Riyadh", ar: "الرياض" },
    title: {
      en: "Exceptional care from start to finish",
      ar: "رعاية استثنائية من البداية إلى النهاية",
    },
    text: {
      en: "Dr. Al-Rashid explained everything in detail and the follow-up through the app made recovery so much easier. The facilities are world-class.",
      ar: "شرحت د. الراشد كل شيء بالتفصيل والمتابعة عبر التطبيق جعلت التعافي أسهل بكثير. المرافق على مستوى عالمي.",
    },
    spec: { en: "Cardiology", ar: "أمراض القلب" },
  },
  {
    name: { en: "Fatimah S.", ar: "فاطمة س." },
    rating: 5,
    when: { en: "1 month ago", ar: "قبل شهر" },
    city: { en: "Jeddah", ar: "جدة" },
    title: {
      en: "Home healthcare changed everything",
      ar: "الرعاية المنزلية غيرت كل شيء",
    },
    text: {
      en: "After my mother's surgery, having nurses visit at home saved us countless trips. Professional, kind, and always on time.",
      ar: "بعد عملية والدتي، توفرت زيارة الممرضات في المنزل ووفرت علينا رحلات عديدة. محترفون ولطفاء ودائماً في الموعد.",
    },
    spec: { en: "Home Healthcare", ar: "الرعاية المنزلية" },
  },
  {
    name: { en: "Abdullah M.", ar: "عبدالله م." },
    rating: 5,
    when: { en: "3 weeks ago", ar: "قبل ٣ أسابيع" },
    city: { en: "Dammam", ar: "الدمام" },
    title: {
      en: "Telemedicine that actually works",
      ar: "طب عن بُعد يعمل بكفاءة",
    },
    text: {
      en: "Consulted Dr. Khan from Bahrain during a business trip. Prescription was at my hotel pharmacy within 90 minutes. Remarkable.",
      ar: "استشرت د. خان من البحرين خلال رحلة عمل. وصلت الوصفة إلى صيدلية الفندق خلال ٩٠ دقيقة. تجربة مميزة.",
    },
    spec: { en: "Telemedicine", ar: "الطب عن بُعد" },
  },
  {
    name: { en: "Noura A.", ar: "نورة أ." },
    rating: 5,
    when: { en: "1 week ago", ar: "قبل أسبوع" },
    city: { en: "Riyadh", ar: "الرياض" },
    title: {
      en: "Best pediatric care in the Kingdom",
      ar: "أفضل رعاية للأطفال في المملكة",
    },
    text: {
      en: "Dr. Bin Saleh has been our family's pediatrician for years. Patient, knowledgeable, and wonderful with children.",
      ar: "د. بن صالح طبيب عائلتنا للأطفال منذ سنوات. صبور ومتمكن ورائع مع الأطفال.",
    },
    spec: { en: "Pediatrics", ar: "طب الأطفال" },
  },
];

const RATING_BARS = [
  { s: 5, p: 82 },
  { s: 4, p: 12 },
  { s: 3, p: 3 },
  { s: 2, p: 1 },
  { s: 1, p: 2 },
];

export function Testimonials() {
  const { t, pick } = useT();
  const [idx, setIdx] = useState(0);

  return (
    <section className="section" style={{ background: "var(--ink-50)" }}>
      <div className="container">
        <div
          className="mc-testimonials-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: 64,
            alignItems: "start",
          }}
        >
          <div style={{ position: "sticky", top: 120 }}>
            <div className="kicker" style={{ marginBottom: 16 }}>
              {t("test_kicker")}
            </div>
            <h2 className="serif" style={{ marginBottom: 16 }}>
              {t("test_title")}
            </h2>
            <p style={{ fontSize: 16, marginBottom: 32 }}>{t("test_sub")}</p>

            <div
              style={{
                background: "white",
                borderRadius: "var(--card-radius)",
                padding: 24,
                border: "1px solid var(--ink-200)",
              }}
            >
              <div className="flex" style={{ gap: 12, alignItems: "center", marginBottom: 16 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "white",
                    border: "1px solid var(--ink-200)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <GoogleLogo />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-900)" }}>
                    {pick("Google Reviews", "تقييمات جوجل")}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ink-500)" }}>
                    {pick("Verified by Google My Business", "موثقة من جوجل ماي بزنس")}
                  </div>
                </div>
              </div>
              <div className="flex" style={{ gap: 12, alignItems: "baseline", marginBottom: 8 }}>
                <span
                  className="serif"
                  style={{ fontSize: 44, color: "var(--brand-900)", fontWeight: 500 }}
                >
                  {pick("4.8", "٤٫٨")}
                </span>
                <div>
                  <div className="flex" style={{ gap: 2 }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarFill key={i} />
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ink-500)", marginTop: 2 }}>
                    {pick("Based on 12,847 reviews", "بناءً على ١٢٬٨٤٧ تقييماً")}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                {RATING_BARS.map((r) => (
                  <div
                    key={r.s}
                    className="flex"
                    style={{ gap: 10, alignItems: "center", marginTop: 6, fontSize: 12 }}
                  >
                    <span style={{ width: 10, color: "var(--ink-500)" }}>{r.s}</span>
                    <div
                      style={{
                        flex: 1,
                        height: 4,
                        background: "var(--ink-100)",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${r.p}%`,
                          height: "100%",
                          background: "#fbbc05",
                        }}
                      />
                    </div>
                    <span style={{ width: 30, color: "var(--ink-500)", textAlign: "right" }}>
                      {r.p}%
                    </span>
                  </div>
                ))}
              </div>
              <a href="#" className="link" style={{ marginTop: 16, fontSize: 13 }}>
                {pick("See all reviews on Google", "عرض كل التقييمات على جوجل")}{" "}
                <Icon name="arrow" size={12} />
              </a>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {REVIEWS.map((r, i) => (
                <div
                  key={i}
                  className="card"
                  onMouseEnter={() => setIdx(i)}
                  style={{
                    padding: 28,
                    borderColor: idx === i ? "var(--accent-600)" : "var(--ink-200)",
                  }}
                >
                  <div className="between" style={{ marginBottom: 14 }}>
                    <div className="flex" style={{ gap: 12, alignItems: "center" }}>
                      <div
                        className="ph ph-accent"
                        style={{ width: 40, height: 40, borderRadius: "50%" }}
                      >
                        <span className="ph-label" style={{ fontSize: 10, padding: "2px 6px" }}>
                          {r.name.en[0]}
                        </span>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-900)" }}>
                          {pick(r.name.en, r.name.ar)}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--ink-500)" }}>
                          {pick(r.city.en, r.city.ar)} · {pick(r.when.en, r.when.ar)}
                        </div>
                      </div>
                    </div>
                    <div className="flex" style={{ gap: 2 }}>
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <StarFill key={j} size={13} />
                      ))}
                    </div>
                  </div>
                  <div
                    className="serif"
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      color: "var(--brand-900)",
                      marginBottom: 8,
                    }}
                  >
                    {pick(r.title.en, r.title.ar)}
                  </div>
                  <p style={{ fontSize: 14 }}>&ldquo;{pick(r.text.en, r.text.ar)}&rdquo;</p>
                  <div className="flex" style={{ marginTop: 14, gap: 8, alignItems: "center" }}>
                    <span className="chip chip-accent">{pick(r.spec.en, r.spec.ar)}</span>
                    <GoogleLogo size={14} />
                    <span style={{ fontSize: 11, color: "var(--ink-500)" }}>
                      {pick("Posted on Google", "نُشر على جوجل")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
