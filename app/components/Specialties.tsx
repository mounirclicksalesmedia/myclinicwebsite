"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ClinicBackground } from "./ClinicBackground";
import { Icon, type IconName } from "./Icon";
import { Placeholder, SectionHeader } from "./ui";

type Spec = {
  cat: string;
  icon: IconName;
  name: string;
  desc: string;
  doctors: number;
  procs: string;
  color?: "brand" | "accent";
};

const SPEC_CATEGORIES: { id: string; label: string; count: number }[] = [
  { id: "all", label: "All Specialties", count: 42 },
  { id: "heart", label: "Heart & Vascular", count: 5 },
  { id: "neuro", label: "Neurology", count: 4 },
  { id: "ortho", label: "Orthopedics", count: 6 },
  { id: "women", label: "Women's Health", count: 5 },
  { id: "child", label: "Child Health", count: 4 },
  { id: "dental", label: "Dental", count: 6 },
  { id: "surg", label: "Surgery", count: 7 },
  { id: "diag", label: "Diagnostics", count: 5 },
];

const ALL_SPECS: Spec[] = [
  { cat: "heart", icon: "heart", name: "Cardiology", desc: "Interventional, EP, imaging, preventive & women's heart care.", doctors: 42, procs: "18k+", color: "brand" },
  { cat: "heart", icon: "heart", name: "Cardiac Surgery", desc: "CABG, valve repair, and minimally invasive cardiac procedures.", doctors: 8, procs: "1.2k+" },
  { cat: "heart", icon: "heart", name: "Vascular Surgery", desc: "Peripheral arterial disease, varicose veins, endovascular repair.", doctors: 6, procs: "2.4k+" },
  { cat: "neuro", icon: "brain", name: "Neurology", desc: "Stroke, epilepsy, movement disorders and headache care.", doctors: 28, procs: "9k+" },
  { cat: "neuro", icon: "brain", name: "Neurosurgery", desc: "Brain tumors, spine, and functional neurosurgery.", doctors: 9, procs: "800+" },
  { cat: "ortho", icon: "bone", name: "Orthopedics", desc: "Joint replacement, sports medicine, pediatric ortho, trauma.", doctors: 36, procs: "14k+", color: "accent" },
  { cat: "ortho", icon: "bone", name: "Spine Surgery", desc: "Minimally invasive & complex spine reconstruction.", doctors: 8, procs: "1.8k+" },
  { cat: "ortho", icon: "bone", name: "Rheumatology", desc: "Autoimmune & inflammatory joint disease management.", doctors: 7, procs: "6k+" },
  { cat: "dental", icon: "tooth", name: "Dental & Orthodontics", desc: "Cosmetic, implants, pediatric dentistry and clear aligners.", doctors: 24, procs: "32k+" },
  { cat: "diag", icon: "eye", name: "Ophthalmology", desc: "LASIK, cataract, retina, glaucoma and pediatric vision.", doctors: 18, procs: "9.2k+" },
  { cat: "child", icon: "baby", name: "Pediatrics", desc: "Newborn, general, developmental and adolescent pediatrics.", doctors: 32, procs: "48k+", color: "brand" },
  { cat: "child", icon: "baby", name: "Neonatology", desc: "Level-III NICU care for premature and critical newborns.", doctors: 6, procs: "1.4k+" },
  { cat: "diag", icon: "skin", name: "Dermatology", desc: "Medical, cosmetic and laser dermatology.", doctors: 22, procs: "28k+" },
  { cat: "diag", icon: "kidney", name: "Urology", desc: "Robotic surgery, kidney stones, male fertility.", doctors: 16, procs: "5.4k+" },
  { cat: "diag", icon: "lungs", name: "Pulmonology", desc: "Asthma, COPD, sleep medicine and lung oncology screening.", doctors: 14, procs: "7k+" },
  { cat: "women", icon: "heart", name: "Gynecology", desc: "General GYN, laparoscopic and reconstructive surgery.", doctors: 18, procs: "12k+", color: "accent" },
  { cat: "women", icon: "heart", name: "Obstetrics", desc: "Prenatal, maternal-fetal medicine and high-risk pregnancy.", doctors: 14, procs: "9k births" },
  { cat: "women", icon: "heart", name: "IVF & Fertility", desc: "IVF, ICSI, egg freezing and reproductive endocrinology.", doctors: 6, procs: "2.1k cycles" },
  { cat: "surg", icon: "syringe", name: "General Surgery", desc: "Bariatric, hernia, thyroid and abdominal surgery.", doctors: 22, procs: "11k+" },
  { cat: "surg", icon: "syringe", name: "Oncology", desc: "Medical, surgical and radiation oncology with tumor board.", doctors: 20, procs: "3.8k+" },
  { cat: "surg", icon: "syringe", name: "ENT", desc: "Ear, nose, throat, head & neck surgery and audiology.", doctors: 15, procs: "8k+" },
];

const FEATURED = ALL_SPECS.slice(0, 3);

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function SpecialtiesHero() {
  const stats = [
    { n: "42", l: "Medical specialties" },
    { n: "850+", l: "Consultants & specialists" },
    { n: "2.4M", l: "Patient visits / year" },
    { n: "JCI", l: "Internationally accredited" },
  ];
  return (
    <section
      className="spec-hero"
      style={{
        background: "var(--brand-900)",
        color: "white",
        position: "relative",
        paddingTop: 64,
        paddingBottom: 100,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at top right, rgba(47,181,164,0.18), transparent 60%)",
        }}
      />
      <ClinicBackground color={0x2fb5a4} opacity={0.22} containerOpacity={0.7} />
      <div className="container" style={{ position: "relative" }}>
        <div
          className="flex spec-breadcrumb"
          style={{ gap: 8, fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 28 }}
        >
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Home
          </Link>
          <span>/</span>
          <span style={{ color: "white" }}>Our Specialties</span>
        </div>
        <div
          className="spec-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 64,
            alignItems: "end",
          }}
        >
          <div className="spec-hero-copy">
            <div className="kicker" style={{ color: "var(--accent-400)", marginBottom: 16 }}>
              Our Specialties
            </div>
            <h1
              className="serif"
              style={{
                color: "white",
                marginBottom: 20,
                fontSize: "clamp(40px, 4.8vw, 64px)",
              }}
            >
              42 specialties.
              <br />
              <span style={{ color: "var(--accent-400)", fontStyle: "italic" }}>
                One connected medical home.
              </span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, maxWidth: 560 }}>
              From first consultation to complex surgery — every specialty under one roof, with coordinated care teams and shared medical records across all branches.
            </p>
          </div>
          <div className="spec-hero-stats" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: 20,
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div
                  className="serif"
                  style={{ fontSize: 32, fontWeight: 500, marginBottom: 4 }}
                >
                  {s.n}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedSpecialties() {
  return (
    <section className="section spec-featured-section" style={{ background: "white" }}>
      <div className="container">
        <SectionHeader
          kicker="Centers of Excellence"
          title="Our flagship programs."
          body="Internationally-accredited programs recognized for clinical outcomes and research contributions."
        />
        <div className="spec-featured-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {FEATURED.map((s, i) => (
            <Link
              key={s.name}
              href={`/specialties/${slugify(s.name)}`}
              className="card spec-featured-card"
              style={{
                padding: 0,
                overflow: "hidden",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Placeholder
                className="spec-featured-media"
                accent={i === 1}
                label={`${s.name} — imagery`}
                style={{
                  height: 220,
                  borderRadius: 0,
                  borderBottom: "1px solid var(--ink-200)",
                }}
              >
                <span className="ph-label">{s.name} — imagery</span>
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "white",
                    padding: "6px 10px",
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--brand-900)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--accent-600)",
                    }}
                  />
                  Center of Excellence
                </div>
              </Placeholder>
              <div
                className="spec-featured-body"
                style={{
                  padding: 28,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    background: "var(--accent-50)",
                    color: "var(--accent-600)",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: 18,
                  }}
                >
                  <Icon name={s.icon} size={22} />
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: 24,
                    fontWeight: 500,
                    color: "var(--brand-900)",
                    marginBottom: 10,
                  }}
                >
                  {s.name}
                </div>
                <p style={{ fontSize: 14, marginBottom: 20, flex: 1 }}>{s.desc}</p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    paddingTop: 16,
                    borderTop: "1px solid var(--ink-200)",
                  }}
                >
                  <div>
                    <div
                      className="serif"
                      style={{ fontSize: 20, color: "var(--brand-900)", fontWeight: 500 }}
                    >
                      {s.doctors}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--ink-500)" }}>Consultants</div>
                  </div>
                  <div>
                    <div
                      className="serif"
                      style={{ fontSize: 20, color: "var(--brand-900)", fontWeight: 500 }}
                    >
                      {s.procs}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--ink-500)" }}>Annual volume</div>
                  </div>
                </div>
                <span className="link" style={{ marginTop: 18, fontSize: 13 }}>
                  Explore department <Icon name="arrow" size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecCard({ s }: { s: Spec }) {
  return (
    <Link
      href={`/specialties/${slugify(s.name)}`}
      className="card spec-card"
      style={{
        padding: 24,
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        position: "relative",
        minHeight: 220,
      }}
    >
      <div
        className="spec-card-icon"
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: "var(--accent-50)",
          color: "var(--accent-600)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Icon name={s.icon} size={22} stroke={1.5} />
      </div>
      <div className="spec-card-copy" style={{ flex: 1 }}>
        <div
          className="serif"
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: "var(--brand-900)",
            marginBottom: 6,
          }}
        >
          {s.name}
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.5 }}>{s.desc}</p>
      </div>
      <div
        className="between spec-card-meta"
        style={{
          paddingTop: 14,
          borderTop: "1px solid var(--ink-200)",
          fontSize: 12,
          color: "var(--ink-500)",
        }}
      >
        <span>
          <strong style={{ color: "var(--brand-900)" }}>{s.doctors}</strong> consultants
          <span style={{ margin: "0 6px" }}>·</span>
          <strong style={{ color: "var(--brand-900)" }}>{s.procs}</strong>
        </span>
        <Icon name="arrow" size={14} />
      </div>
    </Link>
  );
}

export function SpecialtiesGrid() {
  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState<string>("");
  const list = useMemo(() => {
    const query = q.toLowerCase();
    return ALL_SPECS.filter(
      (s) =>
        (cat === "all" || s.cat === cat) &&
        (query === "" ||
          s.name.toLowerCase().includes(query) ||
          s.desc.toLowerCase().includes(query)),
    );
  }, [cat, q]);

  return (
    <section className="section spec-grid-section" style={{ background: "var(--ink-50)" }}>
      <div className="container">
        <SectionHeader
          kicker="Browse all"
          title="All specialties & departments."
          body="Search by name or browse by category. Every specialty links to its consultants, services and locations."
        />
        <div
          className="spec-search-box"
          style={{
            background: "white",
            borderRadius: 14,
            border: "1px solid var(--ink-200)",
            padding: "12px 18px",
            marginBottom: 24,
            display: "flex",
            gap: 12,
            alignItems: "center",
            maxWidth: 520,
          }}
        >
          <Icon name="search" size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search specialties — e.g. cardiology, dental…"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: 14,
              fontFamily: "inherit",
              background: "transparent",
              color: "var(--ink-900)",
            }}
          />
          {q && (
            <button
              onClick={() => setQ("")}
              aria-label="Clear search"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--ink-500)",
              }}
            >
              <Icon name="close" size={14} />
            </button>
          )}
        </div>

        <div className="flex spec-category-rail" style={{ gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          {SPEC_CATEGORIES.map((c) => {
            const active = cat === c.id;
            return (
              <button
                className="spec-category-pill"
                key={c.id}
                onClick={() => setCat(c.id)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 500,
                  border: `1px solid ${active ? "var(--brand-800)" : "var(--ink-200)"}`,
                  background: active ? "var(--brand-800)" : "white",
                  color: active ? "white" : "var(--ink-700)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all .15s",
                }}
              >
                {c.label}
                <span
                  style={{
                    fontSize: 11,
                    padding: "1px 7px",
                    borderRadius: 999,
                    background: active ? "rgba(255,255,255,0.2)" : "var(--ink-100)",
                    color: active ? "white" : "var(--ink-500)",
                  }}
                >
                  {c.count}
                </span>
              </button>
            );
          })}
        </div>

        {list.length === 0 ? (
          <div
            style={{
              background: "white",
              borderRadius: "var(--card-radius)",
              border: "1px solid var(--ink-200)",
              padding: 60,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 40, opacity: 0.3, marginBottom: 12 }}>◌</div>
            <h3 style={{ color: "var(--brand-900)" }}>No specialties match &ldquo;{q}&rdquo;</h3>
          </div>
        ) : (
          <div className="spec-card-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {list.map((s) => (
              <SpecCard key={s.name} s={s} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function CareJourney() {
  const steps: { icon: IconName; t: string; d: string }[] = [
    { icon: "search", t: "1. Diagnosis", d: "Initial consultation with a specialist or via our care navigator." },
    { icon: "stethoscope", t: "2. Care plan", d: "Multi-disciplinary team designs a tailored plan across specialties." },
    { icon: "syringe", t: "3. Treatment", d: "Coordinated treatment delivered in clinic, at home, or virtually." },
    { icon: "heart", t: "4. Follow-up", d: "Long-term follow-up with shared records across all your providers." },
  ];
  return (
    <section className="section spec-journey-section" style={{ background: "white" }}>
      <div className="container">
        <SectionHeader
          kicker="Your care journey"
          title="How care flows across specialties."
          body="At MyClinic, your care isn't siloed. Records, imaging and care plans follow you — so every specialist you see has the full picture."
        />
        <div
          className="spec-journey-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            position: "relative",
          }}
        >
          {steps.map((p, i) => (
            <div
              className="spec-journey-card"
              key={i}
              style={{
                padding: 28,
                borderLeft: i === 0 ? "1px solid var(--ink-200)" : "none",
                borderRight: "1px solid var(--ink-200)",
                borderTop: "1px solid var(--ink-200)",
                borderBottom: "1px solid var(--ink-200)",
                background: i % 2 === 0 ? "white" : "var(--ink-50)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "var(--brand-50)",
                  color: "var(--brand-800)",
                  display: "grid",
                  placeItems: "center",
                  marginBottom: 18,
                }}
              >
                <Icon name={p.icon} size={20} />
              </div>
              <div
                className="serif"
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  color: "var(--brand-900)",
                  marginBottom: 8,
                }}
              >
                {p.t}
              </div>
              <p style={{ fontSize: 13 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SpecCTA() {
  return (
    <section
      className="section spec-cta-section"
      style={{
        background: "var(--brand-900)",
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
            "radial-gradient(ellipse at 80% 50%, rgba(47,181,164,0.18), transparent 60%)",
        }}
      />
      <div
        className="container spec-cta-container"
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <div
          className="kicker"
          style={{
            color: "var(--accent-400)",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          Not sure which specialty?
        </div>
        <h2 className="serif" style={{ color: "white", marginBottom: 20 }}>
          Our care navigators will guide you to the right doctor — for free.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, marginBottom: 32 }}>
          Describe your symptoms or concern. A medically-trained navigator calls you back within 2 hours with personalized recommendations.
        </p>
        <div
          className="flex spec-cta-actions"
          style={{ gap: 12, justifyContent: "center", flexWrap: "wrap" }}
        >
          <a href="tel:920022811" className="btn btn-accent" style={{ padding: "14px 24px" }}>
            <Icon name="phone" size={14} /> Call care navigator · 920 022 811
          </a>
          <Link
            href="/find-a-doctor"
            className="btn"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "14px 24px",
            }}
          >
            <Icon name="search" size={14} /> Browse doctors
          </Link>
        </div>
      </div>
    </section>
  );
}
