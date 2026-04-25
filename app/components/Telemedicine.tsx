"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "./Icon";
import { useT } from "./I18nProvider";

type Bi = { en: string; ar: string };
type Feature = { icon: IconName; title: Bi; sub: Bi };

const FEATURES: Feature[] = [
  {
    icon: "video",
    title: { en: "HD secure video", ar: "فيديو آمن بدقة عالية" },
    sub: { en: "End-to-end encrypted consultations", ar: "استشارات مشفرة من طرف إلى طرف" },
  },
  {
    icon: "syringe",
    title: { en: "Prescriptions delivered", ar: "وصفات تُسلَّم إلى بابك" },
    sub: { en: "Pharmacy delivery within 90 minutes", ar: "توصيل من الصيدلية خلال ٩٠ دقيقة" },
  },
  {
    icon: "shield",
    title: { en: "Covered by insurance", ar: "مغطى بالتأمين" },
    sub: { en: "Bupa, Tawuniya, Medgulf and 40+ others", ar: "بوبا، التعاونية، ميدغلف وأكثر من ٤٠ شركة أخرى" },
  },
];

export function Telemedicine() {
  const { t, pick } = useT();

  return (
    <section
      className="section"
      style={{
        background: "var(--brand-900)",
        backgroundImage: "radial-gradient(ellipse at top right, rgba(47,181,164,0.15), transparent 60%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="container" style={{ position: "relative" }}>
        <div
          className="mc-split mc-telemedicine"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div>
            <div className="kicker" style={{ marginBottom: 16, color: "var(--accent-400)" }}>
              {t("tele_kicker")}
            </div>
            <h2 className="serif" style={{ color: "white", marginBottom: 20 }}>
              {t("tele_title")}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, marginBottom: 32 }}>
              {t("tele_body")}
            </p>
            <div style={{ display: "grid", gap: 16, marginBottom: 32 }}>
              {FEATURES.map((f) => (
                <div key={f.title.en} className="flex" style={{ gap: 14, alignItems: "start" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "rgba(47,181,164,0.15)",
                      color: "var(--accent-400)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={f.icon} size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>
                      {pick(f.title.en, f.title.ar)}
                    </div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                      {pick(f.sub.en, f.sub.ar)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/telemedicine" className="btn btn-accent" style={{ padding: "14px 24px" }}>
              <Icon name="video" size={15} /> {t("tele_cta")}
            </Link>
          </div>

          <div className="mc-tele-media" style={{ position: "relative", height: 580 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "linear-gradient(135deg, #0a2848, #0f3158)",
              }}
            >
              <Image
                src="/telemedicine.png"
                alt="Doctor on video call"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
