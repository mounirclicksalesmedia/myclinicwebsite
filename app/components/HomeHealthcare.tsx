"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icon";
import { useT } from "./I18nProvider";

type Bi = { en: string; ar: string };
const INCLUDED: Bi[] = [
  { en: "Registered nurses", ar: "ممرضون مسجلون" },
  { en: "GP home visits", ar: "زيارات الطبيب العام للمنزل" },
  { en: "Physiotherapy", ar: "العلاج الطبيعي" },
  { en: "Lab sampling", ar: "سحب عينات المختبر" },
  { en: "IV therapy", ar: "العلاج بالحقن الوريدي" },
];

export function HomeHealthcare() {
  const { t, pick } = useT();
  return (
    <section className="section" style={{ background: "white" }}>
      <div className="container">
        <div
          className="mc-split mc-home-healthcare"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div className="mc-home-media" style={{ position: "relative", height: 560 }}>
            <div
              style={{
                position: "absolute",
                inset: "0 40px 40px 0",
                borderRadius: "var(--card-radius)",
                overflow: "hidden",
              }}
            >
              <Image
                src="/myclinichouse.png"
                alt="Nurse caring for patient at home"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              className="mc-home-included"
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: 280,
                background: "white",
                borderRadius: "var(--card-radius)",
                padding: 20,
                boxShadow: "var(--shadow-lg)",
                border: "1px solid var(--ink-200)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "var(--ink-500)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                {pick("What's included", "ما يشمله")}
              </div>
              {INCLUDED.map((s) => (
                <div
                  key={s.en}
                  className="flex"
                  style={{ gap: 10, alignItems: "center", padding: "8px 0" }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "var(--accent-50)",
                      color: "var(--accent-600)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Icon name="check" size={13} stroke={2.5} />
                  </div>
                  <span style={{ fontSize: 13, color: "var(--ink-900)" }}>{pick(s.en, s.ar)}</span>
                </div>
              ))}
            </div>
            <div
              className="mc-home-arrival"
              style={{
                position: "absolute",
                top: 24,
                left: 0,
                width: 180,
                background: "var(--brand-800)",
                color: "white",
                borderRadius: 14,
                padding: 16,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  opacity: 0.7,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {pick("Average arrival", "متوسط الوصول")}
              </div>
              <div className="serif" style={{ fontSize: 32, fontWeight: 500 }}>
                {pick("42 min", "٤٢ دقيقة")}
              </div>
              <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>
                {pick("within Riyadh", "داخل الرياض")}
              </div>
            </div>
          </div>

          <div>
            <div className="kicker" style={{ marginBottom: 16 }}>
              {t("hh_kicker")}
            </div>
            <h2 className="serif" style={{ marginBottom: 20 }}>
              {t("hh_title")}
            </h2>
            <p style={{ fontSize: 17, marginBottom: 28 }}>{t("hh_body")}</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 20,
                marginBottom: 32,
                paddingTop: 24,
                borderTop: "1px solid var(--ink-200)",
              }}
            >
              <div>
                <div className="serif" style={{ fontSize: 32, color: "var(--brand-900)", marginBottom: 4 }}>
                  {pick("65K+", "+٦٥ ألف")}
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-500)" }}>
                  {pick("home visits in 2025", "زيارة منزلية في ٢٠٢٥")}
                </div>
              </div>
              <div>
                <div className="serif" style={{ fontSize: 32, color: "var(--brand-900)", marginBottom: 4 }}>
                  {pick("4.9★", "★٤٫٩")}
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-500)" }}>
                  {pick("average visit rating", "متوسط تقييم الزيارة")}
                </div>
              </div>
            </div>
            <div className="flex mc-action-row" style={{ gap: 12 }}>
              <Link href="/home-healthcare" className="btn btn-primary" style={{ padding: "14px 24px" }}>
                <Icon name="home" size={15} /> {t("hh_cta")}
              </Link>
              <Link href="/home-healthcare" className="btn btn-ghost" style={{ padding: "14px 24px" }}>
                <Icon name="play" size={13} /> {pick("Watch how it works", "شاهد كيف تعمل")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
