"use client";

import { useState } from "react";
import { Icon, type IconName } from "./Icon";
import { useT } from "./I18nProvider";
import { SectionHeader } from "./ui";

type Bi = { en: string; ar: string };

const SECTORS: { icon: IconName; name: Bi; desc: Bi; count: number }[] = [
  {
    icon: "heart",
    name: { en: "Cardiology", ar: "أمراض القلب" },
    desc: { en: "Heart, vascular & interventional", ar: "القلب والأوعية الدموية والقسطرة" },
    count: 42,
  },
  {
    icon: "brain",
    name: { en: "Neurology", ar: "طب الأعصاب" },
    desc: { en: "Brain, spine & nerve disorders", ar: "اضطرابات الدماغ والعمود الفقري والأعصاب" },
    count: 28,
  },
  {
    icon: "bone",
    name: { en: "Orthopedics", ar: "جراحة العظام" },
    desc: { en: "Bones, joints & sports medicine", ar: "العظام والمفاصل والطب الرياضي" },
    count: 36,
  },
  {
    icon: "tooth",
    name: { en: "Dental", ar: "طب الأسنان" },
    desc: { en: "Cosmetic, ortho & implantology", ar: "تجميل وتقويم وزراعة الأسنان" },
    count: 24,
  },
  {
    icon: "eye",
    name: { en: "Ophthalmology", ar: "طب العيون" },
    desc: { en: "Vision, refractive & retina", ar: "النظر والتصحيح والشبكية" },
    count: 18,
  },
  {
    icon: "baby",
    name: { en: "Pediatrics", ar: "طب الأطفال" },
    desc: { en: "Newborn to adolescent care", ar: "رعاية الأطفال من الولادة إلى المراهقة" },
    count: 32,
  },
  {
    icon: "skin",
    name: { en: "Dermatology", ar: "الأمراض الجلدية" },
    desc: { en: "Medical & cosmetic skin care", ar: "العناية الطبية والتجميلية للبشرة" },
    count: 22,
  },
  {
    icon: "kidney",
    name: { en: "Urology", ar: "المسالك البولية" },
    desc: { en: "Kidney, bladder & men's health", ar: "الكلى والمثانة وصحة الرجل" },
    count: 16,
  },
  {
    icon: "lungs",
    name: { en: "Pulmonology", ar: "أمراض الصدرية" },
    desc: { en: "Respiratory & sleep medicine", ar: "أمراض الجهاز التنفسي والنوم" },
    count: 14,
  },
  {
    icon: "syringe",
    name: { en: "Oncology", ar: "علم الأورام" },
    desc: { en: "Cancer screening & treatment", ar: "الكشف والعلاج عن السرطان" },
    count: 20,
  },
];

export function Sectors() {
  const { t, pick, lang } = useT();
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section className="section" style={{ background: "white" }}>
      <div className="container">
        <SectionHeader
          kicker={t("sectors_kicker")}
          title={t("sectors_title")}
          body={t("sectors_body")}
          side={
            <a href="#" className="link">
              {pick("View all 40+ departments", "عرض أكثر من ٤٠ قسماً")} <Icon name="arrow" size={14} />
            </a>
          }
        />
        <div
          className="mc-sectors-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 1,
            background: "var(--ink-200)",
            border: "1px solid var(--ink-200)",
            borderRadius: "var(--card-radius)",
            overflow: "hidden",
          }}
        >
          {SECTORS.map((s, i) => {
            const active = hover === i;
            return (
              <a
                className="mc-sector-card"
                key={s.name.en}
                href="#"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{
                  background: active ? "var(--brand-800)" : "white",
                  color: active ? "white" : "var(--ink-900)",
                  padding: "32px 24px",
                  textDecoration: "none",
                  transition: "background .25s, color .25s",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  minHeight: 200,
                  position: "relative",
                }}
              >
                <div
                  className="mc-sector-icon"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    background: active ? "rgba(255,255,255,0.15)" : "var(--accent-50)",
                    color: active ? "var(--accent-400)" : "var(--accent-600)",
                    display: "grid",
                    placeItems: "center",
                    transition: "background .25s, color .25s",
                  }}
                >
                  <Icon name={s.icon} size={24} stroke={1.5} />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    className="mc-sector-title"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 20,
                      fontWeight: 500,
                      marginBottom: 6,
                      color: "inherit",
                    }}
                  >
                    {pick(s.name.en, s.name.ar)}
                  </div>
                  <div
                    className="mc-sector-desc"
                    style={{
                      fontSize: 13,
                      color: active ? "rgba(255,255,255,0.7)" : "var(--ink-500)",
                      lineHeight: 1.5,
                    }}
                  >
                    {pick(s.desc.en, s.desc.ar)}
                  </div>
                </div>
                <div
                  className="between mc-sector-meta"
                  style={{
                    fontSize: 12,
                    color: active ? "rgba(255,255,255,0.7)" : "var(--ink-500)",
                  }}
                >
                  <span>
                    {lang === "ar" ? `${s.count} استشاري` : `${s.count} consultants`}
                  </span>
                  <Icon name="arrow" size={14} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
