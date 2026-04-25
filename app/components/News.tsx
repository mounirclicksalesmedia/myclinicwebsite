"use client";

import { Icon } from "./Icon";
import { useT } from "./I18nProvider";
import { Placeholder, SectionHeader } from "./ui";

type Bi = { en: string; ar: string };

const NEWS_ITEMS: { cat: Bi; date: Bi; read: Bi; title: Bi; desc: Bi }[] = [
  {
    cat: { en: "Research", ar: "بحوث" },
    date: { en: "Apr 18, 2026", ar: "١٨ أبريل ٢٠٢٦" },
    read: { en: "4 min", ar: "٤ دقائق" },
    title: {
      en: "MyClinic launches AI-assisted cardiac screening program",
      ar: "ماي كلينك تطلق برنامج فحص القلب بمساعدة الذكاء الاصطناعي",
    },
    desc: {
      en: "A new deep-learning model flags early signs of atrial fibrillation from standard ECGs with 94% sensitivity.",
      ar: "نموذج تعلم عميق جديد يكشف العلامات المبكرة للرجفان الأذيني من تخطيط القلب الكهربائي بحساسية ٩٤٪.",
    },
  },
  {
    cat: { en: "Announcement", ar: "إعلان" },
    date: { en: "Apr 12, 2026", ar: "١٢ أبريل ٢٠٢٦" },
    read: { en: "3 min", ar: "٣ دقائق" },
    title: {
      en: "New flagship campus opens in Riyadh's Diriyah district",
      ar: "افتتاح فرع رئيسي جديد في حي الدرعية بالرياض",
    },
    desc: {
      en: "340-bed facility adds oncology, advanced imaging and a Level-1 trauma center to serve North Riyadh.",
      ar: "منشأة بسعة ٣٤٠ سريراً تضيف قسم الأورام والتصوير المتقدم ومركز إصابات من المستوى الأول لخدمة شمال الرياض.",
    },
  },
  {
    cat: { en: "Health Tips", ar: "نصائح صحية" },
    date: { en: "Apr 5, 2026", ar: "٥ أبريل ٢٠٢٦" },
    read: { en: "6 min", ar: "٦ دقائق" },
    title: {
      en: "Ramadan 2026: a cardiologist's guide to fasting safely",
      ar: "رمضان ٢٠٢٦: دليل استشاري القلب للصيام بأمان",
    },
    desc: {
      en: "Dr. Hala Al-Rashid outlines how patients with chronic conditions can approach fasting this year.",
      ar: "د. هالة الراشد توضح كيف يمكن لمرضى الأمراض المزمنة التعامل مع الصيام هذا العام.",
    },
  },
];

export function News() {
  const { t, pick } = useT();
  return (
    <section className="section" style={{ background: "white" }}>
      <div className="container">
        <SectionHeader
          kicker={t("news_kicker")}
          title={t("news_title")}
          side={
            <a href="#" className="link">
              {pick("All articles", "كل المقالات")} <Icon name="arrow" size={14} />
            </a>
          }
        />
        <div className="mc-news-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {NEWS_ITEMS.map((n, i) => (
            <a
              key={i}
              href="#"
              className="card"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <Placeholder
                label={pick(`${n.cat.en} feature image`, `صورة ${n.cat.ar}`)}
                style={{
                  height: 220,
                  borderRadius: 0,
                  borderBottom: "1px solid var(--ink-200)",
                }}
              />
              <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
                <div
                  className="flex"
                  style={{
                    gap: 8,
                    marginBottom: 14,
                    fontSize: 12,
                    color: "var(--ink-500)",
                    alignItems: "center",
                  }}
                >
                  <span className="chip chip-accent">{pick(n.cat.en, n.cat.ar)}</span>
                  <span>·</span>
                  <span>{pick(n.date.en, n.date.ar)}</span>
                  <span>·</span>
                  <span>{pick(n.read.en, n.read.ar)}</span>
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    color: "var(--brand-900)",
                    marginBottom: 12,
                    lineHeight: 1.25,
                  }}
                >
                  {pick(n.title.en, n.title.ar)}
                </div>
                <p style={{ fontSize: 14, marginBottom: 20, flex: 1 }}>{pick(n.desc.en, n.desc.ar)}</p>
                <span className="link" style={{ fontSize: 13 }}>
                  {t("read_more")} <Icon name="arrow" size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
