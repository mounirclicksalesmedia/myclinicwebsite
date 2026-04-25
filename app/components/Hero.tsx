"use client";

import Image from "next/image";
import { Icon } from "./Icon";
import { useT } from "./I18nProvider";
import { ClinicBackground } from "./ClinicBackground";

export function Hero() {
  const { t, pick } = useT();
  return (
    <section style={{ background: "var(--brand-50)", overflow: "hidden", position: "relative" }}>
      <ClinicBackground />
      <div
        className="container mc-hero-grid"
        style={{
          position: "relative",
          paddingTop: 80,
          paddingBottom: 100,
          display: "grid",
          gridTemplateColumns: "1.05fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div className="reveal">
          <div className="kicker" style={{ marginBottom: 20 }}>
            {t("hero_kicker")}
          </div>
          <h1 className="serif" style={{ marginBottom: 24 }}>
            {t("hero_title_1")}
            <br />
            <span style={{ color: "var(--accent-600)", fontStyle: "italic" }}>
              {t("hero_title_2")}
            </span>
          </h1>
          <p style={{ fontSize: 18, maxWidth: 520, marginBottom: 36 }}>{t("hero_body")}</p>
          <div className="flex" style={{ gap: 12, flexWrap: "wrap" }}>
            <a href="#" className="btn btn-primary" style={{ padding: "16px 28px", fontSize: 15 }}>
              <Icon name="calendar" size={16} /> {t("hero_primary")}
            </a>
            <a href="#" className="btn btn-ghost" style={{ padding: "16px 28px", fontSize: 15 }}>
              <Icon name="stethoscope" size={16} /> {t("hero_secondary")}
            </a>
          </div>
        </div>

        <div className="mc-hero-media" style={{ position: "relative", height: 600 }}>
          <Image
            src="/hero-medical-team-gulf.png"
            alt="Professional Gulf medical team of three doctors in a modern clinic"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="mc-hero-image"
            style={{
              objectFit: "cover",
              objectPosition: "center top",
              borderRadius: "var(--card-radius)",
            }}
          />

          <div
            className="reveal reveal-delay-2 mc-hero-booking-card"
            style={{
              position: "absolute",
              bottom: 24,
              left: -24,
              width: 300,
              background: "white",
              borderRadius: "var(--card-radius)",
              padding: 20,
              boxShadow: "var(--shadow-lg)",
              border: "1px solid var(--ink-200)",
            }}
          >
            <div
              className="mc-hero-booking-eyebrow"
              style={{
                fontSize: 11,
                color: "var(--ink-500)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              {pick("Today · Next available", "اليوم · الموعد القادم")}
            </div>
            <div className="flex mc-hero-booking-doctor" style={{ gap: 12, alignItems: "center", marginBottom: 14 }}>
              <div className="ph ph-accent mc-hero-booking-avatar" style={{ width: 48, height: 48, borderRadius: "50%" }}>
                <span className="ph-label" style={{ fontSize: 9 }}>
                  DR
                </span>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: "var(--brand-900)" }}>
                  {pick("Dr. Hala Al-Rashid", "د. هالة الراشد")}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-500)" }}>
                  {pick("Cardiology · Consultant", "أمراض القلب · استشاري")}
                </div>
              </div>
            </div>
            <div className="flex mc-hero-booking-slots" style={{ gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
              {["10:30", "11:15", "14:00", "16:45"].map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: 12,
                    padding: "6px 10px",
                    border: "1px solid var(--ink-200)",
                    borderRadius: 6,
                    color: "var(--ink-700)",
                    background: "var(--ink-50)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <button className="btn btn-accent mc-hero-booking-confirm" style={{ width: "100%", padding: "10px" }}>
              {pick("Confirm booking", "تأكيد الحجز")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
