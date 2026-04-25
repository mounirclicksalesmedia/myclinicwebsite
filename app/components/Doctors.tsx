"use client";

import { useState } from "react";
import { Icon, StarFill } from "./Icon";
import { useT } from "./I18nProvider";
import { SectionHeader } from "./ui";

type Bi = { en: string; ar: string };

type Doctor = {
  name: Bi;
  spec: Bi;
  title: Bi;
  edu: Bi;
  langs: string;
  rating: number;
  next: Bi;
  city: Bi;
  img: string;
};

const DOCTORS: Doctor[] = [
  {
    name: { en: "Dr. Haifa Al-Falah", ar: "د. هيفاء الفلاح" },
    spec: { en: "Cardiology", ar: "أمراض القلب" },
    title: { en: "Senior Consultant", ar: "استشاري أول" },
    edu: { en: "Johns Hopkins", ar: "جونز هوبكنز" },
    langs: "EN · AR",
    rating: 4.9,
    next: { en: "Today 14:00", ar: "اليوم ١٤:٠٠" },
    city: { en: "Riyadh", ar: "الرياض" },
    img: "/doctors/haifa-alfalah.webp",
  },
  {
    name: { en: "Dr. Omar Ashour", ar: "د. عمر عاشور" },
    spec: { en: "Orthopedics", ar: "جراحة العظام" },
    title: { en: "Consultant", ar: "استشاري" },
    edu: { en: "Mayo Clinic", ar: "مايو كلينك" },
    langs: "EN · AR · FR",
    rating: 4.8,
    next: { en: "Tomorrow 10:30", ar: "غداً ١٠:٣٠" },
    city: { en: "Jeddah", ar: "جدة" },
    img: "/doctors/omar-ashour.webp",
  },
  {
    name: { en: "Dr. Sarah Dahlan", ar: "د. سارة دحلان" },
    spec: { en: "Dermatology", ar: "الأمراض الجلدية" },
    title: { en: "Consultant", ar: "استشاري" },
    edu: { en: "King's College London", ar: "كينجز كوليدج لندن" },
    langs: "EN · AR · UR",
    rating: 4.9,
    next: { en: "Today 16:15", ar: "اليوم ١٦:١٥" },
    city: { en: "Riyadh", ar: "الرياض" },
    img: "/doctors/sarah-dahlan.webp",
  },
  {
    name: { en: "Dr. Faisal Almuhizi", ar: "د. فيصل المهيزع" },
    spec: { en: "Pediatrics", ar: "طب الأطفال" },
    title: { en: "Senior Consultant", ar: "استشاري أول" },
    edu: { en: "McGill University", ar: "جامعة ماكغيل" },
    langs: "EN · AR",
    rating: 5.0,
    next: { en: "Today 11:00", ar: "اليوم ١١:٠٠" },
    city: { en: "Dammam", ar: "الدمام" },
    img: "/doctors/faisal-almuhizi.webp",
  },
  {
    name: { en: "Dr. Nora Halawani", ar: "د. نورا حلواني" },
    spec: { en: "Ophthalmology", ar: "طب العيون" },
    title: { en: "Consultant", ar: "استشاري" },
    edu: { en: "Moorfields Eye", ar: "مورفيلدز آي" },
    langs: "EN · AR",
    rating: 4.8,
    next: { en: "Thu 09:30", ar: "الخميس ٠٩:٣٠" },
    city: { en: "Makkah", ar: "مكة" },
    img: "/doctors/nora-halawani.webp",
  },
];

function DoctorCard({
  d,
  bookLabel,
  pick,
  availableLabel,
  myClinicCity,
}: {
  d: Doctor;
  bookLabel: string;
  pick: (en: string, ar: string) => string;
  availableLabel: string;
  myClinicCity: (city: string) => string;
}) {
  return (
    <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          position: "relative",
          height: 260,
          borderBottom: "1px solid var(--ink-200)",
          background: "var(--ink-100)",
        }}
      >
        <img
          src={d.img}
          alt={pick(d.name.en, d.name.ar)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
          <span className="chip chip-accent" style={{ fontSize: 11 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent-600)",
              }}
            />
            {availableLabel}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "white",
            padding: "5px 9px",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            color: "var(--brand-900)",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <StarFill size={12} color="var(--accent-600)" />
          {d.rating}
        </div>
      </div>
      <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--accent-600)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 6,
          }}
        >
          {pick(d.spec.en, d.spec.ar)}
        </div>
        <div
          className="serif"
          style={{ fontSize: 20, fontWeight: 500, color: "var(--brand-900)", marginBottom: 4 }}
        >
          {pick(d.name.en, d.name.ar)}
        </div>
        <div style={{ fontSize: 13, color: "var(--ink-500)", marginBottom: 16 }}>
          {pick(d.title.en, d.title.ar)} · {pick(d.edu.en, d.edu.ar)}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginBottom: 16,
            fontSize: 12,
            color: "var(--ink-700)",
          }}
        >
          <div className="flex" style={{ gap: 8, alignItems: "center" }}>
            <Icon name="pin" size={13} />
            <span>{myClinicCity(pick(d.city.en, d.city.ar))}</span>
          </div>
          <div className="flex" style={{ gap: 8, alignItems: "center" }}>
            <Icon name="globe" size={13} />
            <span>{d.langs}</span>
          </div>
          <div className="flex" style={{ gap: 8, alignItems: "center" }}>
            <Icon name="clock" size={13} />
            <span style={{ color: "var(--accent-600)", fontWeight: 600 }}>
              {pick(d.next.en, d.next.ar)}
            </span>
          </div>
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 8,
          }}
        >
          <button className="btn btn-primary" style={{ padding: "10px" }}>
            {bookLabel}
          </button>
          <button className="btn btn-ghost" style={{ padding: "10px 14px" }}>
            <Icon name="arrow" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Doctors() {
  const { t, pick, lang } = useT();
  const [filter, setFilter] = useState<string>("all");
  const specs: { id: string; label: Bi }[] = [
    { id: "all", label: { en: "All specialties", ar: "كل التخصصات" } },
    { id: "Cardiology", label: { en: "Cardiology", ar: "أمراض القلب" } },
    { id: "Orthopedics", label: { en: "Orthopedics", ar: "جراحة العظام" } },
    { id: "Dermatology", label: { en: "Dermatology", ar: "الأمراض الجلدية" } },
    { id: "Pediatrics", label: { en: "Pediatrics", ar: "طب الأطفال" } },
    { id: "Ophthalmology", label: { en: "Ophthalmology", ar: "طب العيون" } },
  ];
  const list = filter === "all" ? DOCTORS : DOCTORS.filter((d) => d.spec.en === filter);
  const availableLabel = pick("Available", "متاح");
  const myClinicCity = (city: string) =>
    lang === "ar" ? `ماي كلينك ${city}` : `MyClinic ${city}`;

  return (
    <section className="section" style={{ background: "var(--ink-50)" }}>
      <div className="container">
        <SectionHeader
          kicker={t("doc_kicker")}
          title={t("doc_title")}
          body={t("doc_body")}
          side={
            <a href="#" className="link">
              {t("view_all")} <Icon name="arrow" size={14} />
            </a>
          }
        />
        <div className="flex mc-doctor-filters" style={{ gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {specs.map((s) => {
            const active = filter === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setFilter(s.id)}
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 500,
                  border: `1px solid ${active ? "var(--brand-800)" : "var(--ink-200)"}`,
                  background: active ? "var(--brand-800)" : "white",
                  color: active ? "white" : "var(--ink-700)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all .15s",
                }}
              >
                {pick(s.label.en, s.label.ar)}
              </button>
            );
          })}
        </div>
        <div className="mc-doctors-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {list.slice(0, 4).map((d) => (
            <DoctorCard
              key={d.name.en}
              d={d}
              bookLabel={t("book")}
              pick={pick}
              availableLabel={availableLabel}
              myClinicCity={myClinicCity}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
