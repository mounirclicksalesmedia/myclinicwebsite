"use client";

import { Icon } from "./Icon";
import { useT } from "./I18nProvider";
import { SectionHeader } from "./ui";

type Bi = { en: string; ar: string };

const PROGRAMS: {
  name: Bi;
  tag: Bi;
  duration: Bi;
  desc: Bi;
  stat: Bi;
  statL: Bi;
}[] = [
  {
    name: { en: "Weight Management", ar: "إدارة الوزن" },
    tag: { en: "Metabolic", ar: "أيضي" },
    duration: { en: "12 weeks", ar: "١٢ أسبوعاً" },
    desc: {
      en: "Medical weight loss with endocrinologists, dietitians, and GLP-1 therapies where indicated.",
      ar: "برنامج طبي لإنقاص الوزن مع استشاريي الغدد الصماء وأخصائيي التغذية وعلاجات GLP-1 عند الحاجة.",
    },
    stat: { en: "87%", ar: "٨٧٪" },
    statL: { en: "sustained weight loss at 12 months", ar: "نسبة استدامة فقدان الوزن بعد ١٢ شهراً" },
  },
  {
    name: { en: "Executive Health", ar: "الصحة التنفيذية" },
    tag: { en: "Preventive", ar: "وقائي" },
    duration: { en: "1 day", ar: "يوم واحد" },
    desc: {
      en: "Comprehensive same-day assessment covering cardiac, metabolic, cancer screening and mental health.",
      ar: "تقييم شامل في يوم واحد يغطي القلب والأيض والكشف عن السرطان والصحة النفسية.",
    },
    stat: { en: "< 24 hrs", ar: "< ٢٤ ساعة" },
    statL: { en: "full results delivered", ar: "تسليم النتائج الكاملة" },
  },
  {
    name: { en: "IVF & Fertility", ar: "أطفال الأنابيب والخصوبة" },
    tag: { en: "Reproductive", ar: "إنجابي" },
    duration: { en: "Custom cycles", ar: "دورات مخصصة" },
    desc: {
      en: "Fertility assessments, IVF, ICSI, and egg freezing with Saudi Arabia's leading embryologists.",
      ar: "تقييم الخصوبة وأطفال الأنابيب والحقن المجهري وتجميد البويضات مع نخبة من أخصائيي الأجنة في المملكة.",
    },
    stat: { en: "68%", ar: "٦٨٪" },
    statL: { en: "success rate per cycle (under 35)", ar: "نسبة النجاح لكل دورة (تحت ٣٥ عاماً)" },
  },
  {
    name: { en: "Cardiac Rehab", ar: "إعادة تأهيل القلب" },
    tag: { en: "Recovery", ar: "تعافي" },
    duration: { en: "6–12 weeks", ar: "٦–١٢ أسبوعاً" },
    desc: {
      en: "Post-cardiac-event supervised recovery combining physiotherapy, nutrition and mental health.",
      ar: "تعافٍ خاضع للإشراف بعد الحوادث القلبية يجمع بين العلاج الطبيعي والتغذية والصحة النفسية.",
    },
    stat: { en: "3× lower", ar: "أقل ٣ أضعاف" },
    statL: { en: "readmission rate vs. standard care", ar: "معدل إعادة الدخول مقارنة بالرعاية المعتادة" },
  },
];

export function Programs() {
  const { t, pick } = useT();
  return (
    <section className="section" style={{ background: "white" }}>
      <div className="container">
        <SectionHeader
          kicker={t("prog_kicker")}
          title={t("prog_title")}
          side={
            <a href="#" className="link">
              {pick("All programs", "كل البرامج")} <Icon name="arrow" size={14} />
            </a>
          }
        />
        <div className="mc-programs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {PROGRAMS.map((p) => (
            <a
              key={p.name.en}
              href="#"
              className="card mc-program-card"
              style={{
                padding: 32,
                textDecoration: "none",
                color: "inherit",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 24,
                alignItems: "start",
              }}
            >
              <div>
                <div className="flex" style={{ gap: 8, marginBottom: 14 }}>
                  <span className="chip chip-accent">{pick(p.tag.en, p.tag.ar)}</span>
                  <span className="chip">
                    <Icon name="clock" size={11} /> {pick(p.duration.en, p.duration.ar)}
                  </span>
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: 26,
                    fontWeight: 500,
                    color: "var(--brand-900)",
                    marginBottom: 12,
                  }}
                >
                  {pick(p.name.en, p.name.ar)}
                </div>
                <p style={{ fontSize: 14, marginBottom: 20 }}>{pick(p.desc.en, p.desc.ar)}</p>
                <div
                  style={{
                    paddingTop: 16,
                    borderTop: "1px solid var(--ink-200)",
                    display: "flex",
                    alignItems: "baseline",
                    gap: 12,
                  }}
                >
                  <span
                    className="serif"
                    style={{ fontSize: 28, fontWeight: 500, color: "var(--accent-600)" }}
                  >
                    {pick(p.stat.en, p.stat.ar)}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--ink-500)" }}>{pick(p.statL.en, p.statL.ar)}</span>
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: "var(--brand-50)",
                  color: "var(--brand-800)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Icon name="arrow" size={18} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
