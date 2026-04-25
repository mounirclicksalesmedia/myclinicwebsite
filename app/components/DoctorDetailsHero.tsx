"use client";

import Link from "next/link";
import { Icon, StarFill } from "./Icon";

export const DOCTOR = {
  name: "Dr. Haifa Al-Falah",
  spec: "Cardiology",
  sub: "Interventional Cardiology",
  title: "Senior Consultant & Head of Department",
  rating: 4.9,
  reviews: 284,
  exp: 18,
  langs: ["English", "Arabic"],
  city: "Riyadh",
  branch: "MyClinic Olaya — Flagship",
  fee: 450,
  video: true,
  img: "/doctors/haifa-alfalah.webp",
  insurance: ["Bupa", "Tawuniya", "Medgulf", "AXA", "Allianz", "Walaa"],
  bio: "Dr. Haifa Al-Falah is a Senior Consultant in Interventional Cardiology with over 18 years of experience treating complex coronary artery disease. She leads MyClinic's Structural Heart Program and was among the first cardiologists in the Kingdom to perform transcatheter aortic valve replacement (TAVR). Her clinical interests include complex PCI, chronic total occlusions, and women's cardiovascular health.",
  education: [
    { year: "2005", school: "Johns Hopkins University", degree: "MD, Cardiology Residency" },
    { year: "2008", school: "Cleveland Clinic", degree: "Interventional Cardiology Fellowship" },
    { year: "2015", school: "European Society of Cardiology", degree: "Board Certification — FESC" },
  ],
  services: [
    "Coronary angiography & angioplasty",
    "Transcatheter aortic valve replacement (TAVR)",
    "Complex percutaneous coronary intervention",
    "Structural heart disease evaluation",
    "Women's cardiovascular risk assessment",
    "Preventive cardiology consultation",
  ],
  awards: [
    { year: "2024", title: "Saudi Heart Association — Excellence in Cardiology Award" },
    { year: "2022", title: "MyClinic — Consultant of the Year" },
    { year: "2019", title: "Top Doctors KSA — Cardiology" },
  ],
  publications: 38,
  procedures: 4200,
} as const;

export function DoctorDetailsHero() {
  return (
    <section
      className="dd-hero"
      style={{
        background: "var(--brand-900)",
        color: "white",
        position: "relative",
        paddingTop: 48,
        paddingBottom: 56,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 80% 0%, rgba(47,181,164,0.18), transparent 60%), radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1.5px)",
          backgroundSize: "auto, 32px 32px",
        }}
      />
      <div className="container" style={{ position: "relative" }}>
        <div
          className="flex dd-breadcrumb"
          style={{
            gap: 8,
            fontSize: 12,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 28,
          }}
        >
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Home
          </Link>
          <span>/</span>
          <Link href="/find-a-doctor" style={{ color: "inherit", textDecoration: "none" }}>
            Find a Doctor
          </Link>
          <span>/</span>
          <span style={{ color: "white" }}>{DOCTOR.name}</span>
        </div>

        <div
          className="dd-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: 40,
            alignItems: "center",
          }}
        >
          <img
            className="dd-hero-img"
            src={DOCTOR.img}
            alt={DOCTOR.name}
            style={{
              width: 180,
              height: 180,
              borderRadius: 20,
              border: "3px solid rgba(255,255,255,0.1)",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div className="dd-hero-copy">
            <div className="flex dd-hero-chips" style={{ gap: 8, marginBottom: 14 }}>
              <span
                className="chip"
                style={{
                  background: "rgba(47,181,164,0.15)",
                  color: "var(--accent-400)",
                  border: "none",
                }}
              >
                {DOCTOR.spec}
              </span>
              <span
                className="chip"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.8)",
                  borderColor: "rgba(255,255,255,0.15)",
                }}
              >
                {DOCTOR.sub}
              </span>
            </div>
            <h1
              className="serif"
              style={{
                color: "white",
                fontSize: "clamp(32px, 3.8vw, 48px)",
                marginBottom: 10,
              }}
            >
              {DOCTOR.name}
            </h1>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", marginBottom: 18 }}>
              {DOCTOR.title}
            </div>
            <div
              className="flex dd-hero-meta"
              style={{
                gap: 16,
                rowGap: 8,
                flexWrap: "wrap",
                color: "rgba(255,255,255,0.85)",
                fontSize: 13,
                alignItems: "center",
              }}
            >
              <span className="flex" style={{ gap: 6, alignItems: "center" }}>
                <StarFill size={14} />
                <strong>{DOCTOR.rating}</strong>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>
                  ({DOCTOR.reviews} reviews)
                </span>
              </span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span className="flex" style={{ gap: 6, alignItems: "center" }}>
                <Icon name="stethoscope" size={14} /> {DOCTOR.exp} years experience
              </span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span className="flex" style={{ gap: 6, alignItems: "center" }}>
                <Icon name="globe" size={14} /> {DOCTOR.langs.join(" · ")}
              </span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span className="flex" style={{ gap: 6, alignItems: "center" }}>
                <Icon name="pin" size={14} /> {DOCTOR.branch}
              </span>
            </div>
          </div>
          <div className="dd-hero-actions" style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "stretch" }}>
            <a href="#booking" className="btn btn-accent" style={{ padding: "14px 24px" }}>
              <Icon name="calendar" size={15} /> Book appointment
            </a>
            <a
              href="#booking"
              className="btn"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "14px 24px",
              }}
            >
              <Icon name="video" size={15} /> Video consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
