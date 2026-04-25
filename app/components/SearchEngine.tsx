"use client";

import { useState } from "react";
import { Icon, type IconName } from "./Icon";
import { useT } from "./I18nProvider";
import { SectionHeader } from "./ui";

type TabId = "specialty" | "doctor" | "city";

function SearchField({
  icon,
  label,
  placeholder,
}: {
  icon: IconName;
  label: string;
  placeholder: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "12px 16px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          fontSize: 11,
          opacity: 0.6,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div className="flex" style={{ gap: 10, alignItems: "center" }}>
        <Icon name={icon} size={16} />
        <input
          placeholder={placeholder}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "white",
            fontSize: 14,
            fontFamily: "inherit",
          }}
        />
      </div>
    </div>
  );
}

export function SearchEngine() {
  const { t, pick } = useT();
  const [tab, setTab] = useState<TabId>("specialty");
  const tabs: { id: TabId; icon: IconName; label: string }[] = [
    { id: "specialty", icon: "stethoscope", label: t("tab_specialty") },
    { id: "doctor", icon: "user", label: t("tab_doctor") },
    { id: "city", icon: "pin", label: t("tab_city") },
  ];
  const popular: Record<TabId, { en: string; ar: string }[]> = {
    specialty: [
      { en: "Cardiology", ar: "أمراض القلب" },
      { en: "Dermatology", ar: "الأمراض الجلدية" },
      { en: "Dental", ar: "طب الأسنان" },
      { en: "Pediatrics", ar: "طب الأطفال" },
      { en: "Orthopedics", ar: "جراحة العظام" },
      { en: "Ophthalmology", ar: "طب العيون" },
    ],
    doctor: [
      { en: "Dr. Al-Rashid", ar: "د. الراشد" },
      { en: "Dr. Mansour", ar: "د. منصور" },
      { en: "Dr. Khan", ar: "د. خان" },
      { en: "Dr. Bin Saleh", ar: "د. بن صالح" },
    ],
    city: [
      { en: "Riyadh", ar: "الرياض" },
      { en: "Jeddah", ar: "جدة" },
      { en: "Dammam", ar: "الدمام" },
      { en: "Makkah", ar: "مكة" },
      { en: "Madinah", ar: "المدينة" },
      { en: "Al-Khobar", ar: "الخبر" },
      { en: "Abha", ar: "أبها" },
    ],
  };

  const primaryIcon: IconName = tab === "doctor" ? "user" : tab === "city" ? "pin" : "stethoscope";
  const primaryLabel = tab === "doctor" ? t("doctor_name") : tab === "city" ? t("city") : t("specialty");
  const primaryPlaceholder =
    tab === "doctor"
      ? pick("e.g. Dr. Al-Rashid", "مثال: د. الراشد")
      : tab === "city"
        ? pick("Riyadh", "الرياض")
        : pick("e.g. Cardiology", "مثال: أمراض القلب");

  return (
    <section style={{ background: "white", padding: "80px 0" }}>
      <div className="container">
        <SectionHeader align="center" kicker={t("search_kicker")} title={t("search_title")} body={t("search_sub")} />
        <div
          className="mc-search-panel"
          style={{
            background: "var(--brand-900)",
            borderRadius: 20,
            padding: 32,
            color: "white",
            position: "relative",
            overflow: "hidden",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div
            className="mc-search-bg"
            aria-hidden="true"
            style={{
              position: "absolute",
              right: -80,
              top: -80,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(47,181,164,0.35), transparent 70%)",
            }}
          />
          <div
            className="mc-search-tabs"
            style={{
              display: "flex",
              gap: 4,
              marginBottom: 24,
              padding: 4,
              background: "rgba(255,255,255,0.08)",
              borderRadius: 10,
              width: "fit-content",
            }}
          >
            {tabs.map((tb) => (
              <button
                key={tb.id}
                onClick={() => setTab(tb.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 18px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  background: tab === tb.id ? "white" : "transparent",
                  color: tab === tb.id ? "var(--brand-900)" : "rgba(255,255,255,0.75)",
                  transition: "background .2s, color .2s",
                }}
              >
                <Icon name={tb.icon} size={15} /> {tb.label}
              </button>
            ))}
          </div>

          <div
            className="mc-search-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr 1fr auto",
              gap: 12,
              position: "relative",
            }}
          >
            <SearchField icon={primaryIcon} label={primaryLabel} placeholder={primaryPlaceholder} />
            <SearchField icon="pin" label={t("city")} placeholder={pick("Any city", "أي مدينة")} />
            <SearchField icon="calendar" label={t("date")} placeholder={pick("Any time", "أي وقت")} />
            <button
              className="btn btn-accent"
              style={{ padding: "0 28px", fontSize: 14, height: "100%", alignSelf: "end" }}
            >
              <Icon name="search" size={16} /> {t("cta_search")}
            </button>
          </div>

          <div className="flex" style={{ marginTop: 24, gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, opacity: 0.7, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              {t("popular")}:
            </span>
            {popular[tab].map((p) => (
              <button
                key={p.en}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "white",
                  borderRadius: 999,
                  padding: "5px 12px",
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {pick(p.en, p.ar)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
