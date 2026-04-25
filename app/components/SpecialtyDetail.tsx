"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon, StarFill, type IconName } from "./Icon";
import { Placeholder, SectionHeader } from "./ui";

type Condition = { name: string; desc: string };
type Service = { icon: IconName; t: string; d: string };
type Doctor = {
  name: string;
  title: string;
  sub: string;
  rating: number;
  reviews: number;
  exp: number;
  langs: string[];
  href?: string;
};

const SPEC_DATA = {
  name: "Cardiology",
  kicker: "Center of Excellence",
  tagline: "Heart care, end to end.",
  intro:
    "MyClinic's Heart & Vascular Center brings together 42 consultants across interventional cardiology, electrophysiology, imaging, preventive medicine and cardiac surgery — under one roof, with shared records and a single care plan.",
  stats: [
    { n: "42", l: "Consultants" },
    { n: "18k+", l: "Procedures / year" },
    { n: "98.2%", l: "Success rate" },
    { n: "JCI", l: "Accredited" },
  ],
  accredit: [
    "JCI Clinical Care",
    "European Society of Cardiology",
    "Saudi Heart Association",
    "CBAHI Certified",
  ],
  conditions: [
    { name: "Coronary Artery Disease", desc: "Evaluation, angiography and treatment for blocked heart arteries." },
    { name: "Heart Failure", desc: "Comprehensive heart-failure management & device therapy." },
    { name: "Arrhythmias", desc: "Atrial fibrillation, SVT, VT — mapped and ablated." },
    { name: "Valvular Heart Disease", desc: "Valve repair & replacement including TAVR and MitraClip." },
    { name: "Hypertension", desc: "Complex & resistant hypertension workup and management." },
    { name: "Congenital Heart Disease", desc: "Adult congenital heart disease clinic." },
    { name: "Cardiomyopathies", desc: "Genetic, hypertrophic and dilated cardiomyopathy care." },
    { name: "Preventive Cardiology", desc: "Risk stratification, lipid clinic, women's heart program." },
  ] as Condition[],
  services: [
    { icon: "heart", t: "Cardiac Catheterization", d: "Diagnostic and interventional angiography, PCI, CTO." },
    { icon: "syringe", t: "Electrophysiology", d: "EP studies, catheter ablation, device implantation." },
    { icon: "eye", t: "Cardiac Imaging", d: "Echo, cardiac CT, MRI and nuclear stress testing." },
    { icon: "stethoscope", t: "Structural Heart", d: "TAVR, MitraClip, LAA closure and ASD/PFO closure." },
    { icon: "heart", t: "Cardiac Surgery", d: "CABG, valve surgery, minimally invasive approaches." },
    { icon: "shield", t: "Preventive Cardiology", d: "Lipid, lifestyle and women's heart clinics." },
  ] as Service[],
  doctors: [
    { name: "Dr. Hala Al-Rashid", title: "Sr. Consultant — Interventional", sub: "TAVR, complex PCI", rating: 4.9, reviews: 284, exp: 18, langs: ["EN", "AR"], href: "/doctor/hala-al-rashid" },
    { name: "Dr. Tarek Al-Hamdan", title: "Consultant — Electrophysiology", sub: "AFib ablation, CRT", rating: 4.7, reviews: 156, exp: 14, langs: ["EN", "AR"] },
    { name: "Dr. Sarah Khan", title: "Consultant — Preventive", sub: "Women's heart, lipids", rating: 4.9, reviews: 321, exp: 12, langs: ["EN", "AR", "UR"] },
    { name: "Dr. Omar Mansour", title: "Consultant — Imaging", sub: "Cardiac MRI, echo", rating: 4.8, reviews: 98, exp: 16, langs: ["EN", "AR"] },
    { name: "Dr. Fatima Al-Zahrani", title: "Consultant — Heart Failure", sub: "Advanced HF, transplant", rating: 4.8, reviews: 142, exp: 15, langs: ["EN", "AR"] },
    { name: "Dr. Khaled Bin Faris", title: "Consultant — Structural", sub: "TAVR, MitraClip", rating: 4.9, reviews: 176, exp: 17, langs: ["EN", "AR"] },
  ] as Doctor[],
  faqs: [
    { q: "Do I need a referral to see a cardiologist?", a: "No — you can book directly through our app or website. For complex cases, our care navigators can match you with the right subspecialist." },
    { q: "Is insurance accepted?", a: "Yes. We partner with all major insurers including Bupa, Tawuniya, Medgulf, AXA and Allianz. Direct billing is available for most plans." },
    { q: "What is the wait time for an appointment?", a: "Most consultations can be booked within 48 hours. Urgent cases are triaged within the same day — call our care navigator line." },
    { q: "Can I get a second opinion?", a: "Absolutely. We offer in-person and virtual second-opinion consultations with our senior consultants." },
  ],
} as const;

function SpecHero() {
  return (
    <section
      style={{
        background: "var(--brand-900)",
        color: "white",
        position: "relative",
        paddingTop: 56,
        paddingBottom: 80,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 80% 30%, rgba(47,181,164,0.22), transparent 55%), radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1.5px)",
          backgroundSize: "auto, 32px 32px",
        }}
      />
      <div className="container" style={{ position: "relative" }}>
        <div
          className="flex"
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
          <Link href="/specialties" style={{ color: "inherit", textDecoration: "none" }}>
            Our Specialties
          </Link>
          <span>/</span>
          <span style={{ color: "white" }}>{SPEC_DATA.name}</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div>
            <div className="flex" style={{ gap: 10, marginBottom: 20 }}>
              <span
                className="chip"
                style={{
                  background: "rgba(47,181,164,0.15)",
                  color: "var(--accent-400)",
                  border: "none",
                  fontSize: 11,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--accent-400)",
                    display: "inline-block",
                    marginRight: 6,
                  }}
                />
                {SPEC_DATA.kicker}
              </span>
            </div>
            <h1
              className="serif"
              style={{
                color: "white",
                marginBottom: 20,
                fontSize: "clamp(44px, 5vw, 68px)",
              }}
            >
              {SPEC_DATA.name}.{" "}
              <span style={{ color: "var(--accent-400)", fontStyle: "italic" }}>
                {SPEC_DATA.tagline}
              </span>
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: 17,
                maxWidth: 560,
                marginBottom: 32,
              }}
            >
              {SPEC_DATA.intro}
            </p>
            <div className="flex" style={{ gap: 12, flexWrap: "wrap" }}>
              <a href="#doctors" className="btn btn-accent" style={{ padding: "14px 24px" }}>
                <Icon name="stethoscope" size={14} /> See cardiologists
              </a>
              <a
                href="#services"
                className="btn"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "14px 24px",
                }}
              >
                Explore services
              </a>
            </div>
          </div>
          <Placeholder
            accent
            label="Heart center imagery"
            style={{
              height: 380,
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>

        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            padding: "28px 0",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {SPEC_DATA.stats.map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <div className="serif" style={{ fontSize: 40, fontWeight: 500, marginBottom: 4 }}>
                {s.n}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecAccreditation() {
  return (
    <section
      style={{
        background: "white",
        padding: "40px 0",
        borderBottom: "1px solid var(--ink-200)",
      }}
    >
      <div className="container">
        <div
          className="flex"
          style={{
            gap: 40,
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "var(--ink-500)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Accredited by
          </div>
          {SPEC_DATA.accredit.map((a) => (
            <div
              key={a}
              className="serif"
              style={{
                fontSize: 18,
                color: "var(--brand-900)",
                fontWeight: 500,
                opacity: 0.7,
                fontStyle: "italic",
              }}
            >
              {a}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecConditions() {
  const [active, setActive] = useState(0);
  const current = SPEC_DATA.conditions[active];
  return (
    <section className="section" style={{ background: "var(--ink-50)" }}>
      <div className="container">
        <SectionHeader
          kicker="Conditions we treat"
          title="From common to complex."
          body="Our multi-disciplinary team manages the full spectrum of heart and vascular disease."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: 32,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {SPEC_DATA.conditions.map((c, i) => {
              const on = active === i;
              return (
                <button
                  key={c.name}
                  onClick={() => setActive(i)}
                  style={{
                    textAlign: "left",
                    padding: "14px 18px",
                    background: on ? "white" : "transparent",
                    border: `1px solid ${on ? "var(--brand-800)" : "transparent"}`,
                    borderRadius: 10,
                    color: on ? "var(--brand-900)" : "var(--ink-700)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 15,
                    fontWeight: on ? 600 : 500,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {c.name}
                  {on && <Icon name="arrow" size={14} />}
                </button>
              );
            })}
          </div>
          <div
            className="card"
            style={{
              padding: 32,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <Placeholder
              label={`${current.name} — illustration`}
              style={{ height: 220, borderRadius: 12 }}
            />
            <div>
              <div className="kicker" style={{ marginBottom: 10 }}>
                Condition
              </div>
              <h3 className="serif" style={{ fontSize: 28, marginBottom: 10 }}>
                {current.name}
              </h3>
              <p style={{ fontSize: 15, marginBottom: 16 }}>{current.desc}</p>
              <div className="flex" style={{ gap: 12, alignItems: "center" }}>
                <a href="#" className="link" style={{ fontSize: 13 }}>
                  Learn more <Icon name="arrow" size={12} />
                </a>
                <span style={{ color: "var(--ink-300)" }}>·</span>
                <a href="#doctors" className="link" style={{ fontSize: 13 }}>
                  Find a specialist <Icon name="arrow" size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecServices() {
  return (
    <section id="services" className="section" style={{ background: "white" }}>
      <div className="container">
        <SectionHeader
          kicker="Services & procedures"
          title="What we offer."
          body="Every service is delivered by fellowship-trained specialists using the latest technology."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {SPEC_DATA.services.map((s) => (
            <div key={s.t} className="card" style={{ padding: 24 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "var(--accent-50)",
                  color: "var(--accent-600)",
                  display: "grid",
                  placeItems: "center",
                  marginBottom: 16,
                }}
              >
                <Icon name={s.icon} size={20} />
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
                {s.t}
              </div>
              <p style={{ fontSize: 13 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DocMiniCard({ d, featured }: { d: Doctor; featured?: boolean }) {
  const href = d.href ?? "#";
  return (
    <Link
      href={href}
      className="card"
      style={{
        padding: 0,
        textDecoration: "none",
        color: "inherit",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          gap: 16,
          padding: 20,
        }}
      >
        <Placeholder
          accent={featured}
          label="Dr"
          style={{ width: 120, height: 140, borderRadius: 12 }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="flex" style={{ gap: 4, alignItems: "center", marginBottom: 6 }}>
            <StarFill size={12} />
            <strong style={{ fontSize: 12, color: "var(--brand-900)" }}>{d.rating}</strong>
            <span style={{ fontSize: 11, color: "var(--ink-500)" }}>({d.reviews})</span>
          </div>
          <div
            className="serif"
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: "var(--brand-900)",
              marginBottom: 4,
              lineHeight: 1.25,
            }}
          >
            {d.name}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--accent-600)",
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            {d.title}
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-500)", marginBottom: 10 }}>
            {d.sub}
          </div>
          <div style={{ marginTop: "auto", fontSize: 11, color: "var(--ink-500)" }}>
            <strong style={{ color: "var(--brand-900)" }}>{d.exp}y</strong> ·{" "}
            {d.langs.join(" · ")}
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid var(--ink-200)",
          display: "flex",
          gap: 8,
          background: "var(--ink-50)",
        }}
      >
        <span
          className="btn btn-primary"
          style={{ flex: 1, padding: "8px", fontSize: 12, justifyContent: "center" }}
        >
          Book <Icon name="arrow" size={12} />
        </span>
        <span
          className="btn"
          style={{
            padding: "8px 10px",
            fontSize: 12,
            background: "white",
            border: "1px solid var(--ink-200)",
          }}
        >
          <Icon name="video" size={12} />
        </span>
      </div>
    </Link>
  );
}

function SpecDoctors() {
  const [sort, setSort] = useState<"recommended" | "rating" | "exp">("recommended");
  const list =
    sort === "rating"
      ? [...SPEC_DATA.doctors].sort((a, b) => b.rating - a.rating)
      : sort === "exp"
        ? [...SPEC_DATA.doctors].sort((a, b) => b.exp - a.exp)
        : SPEC_DATA.doctors;

  return (
    <section
      id="doctors"
      className="section"
      style={{ background: "var(--ink-50)", scrollMarginTop: 120 }}
    >
      <div className="container">
        <div
          className="between"
          style={{
            marginBottom: 32,
            alignItems: "end",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div className="kicker" style={{ marginBottom: 12 }}>
              Our team
            </div>
            <h2 className="serif" style={{ fontSize: 40, marginBottom: 10 }}>
              Meet our 42+ cardiologists.
            </h2>
            <p style={{ fontSize: 15, color: "var(--ink-500)", maxWidth: 560 }}>
              Board-certified consultants across interventional, electrophysiology, imaging and preventive cardiology.
            </p>
          </div>
          <div className="flex" style={{ gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--ink-500)" }}>Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid var(--ink-200)",
                fontSize: 13,
                fontFamily: "inherit",
                background: "white",
                cursor: "pointer",
              }}
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Highest rated</option>
              <option value="exp">Most experience</option>
            </select>
            <Link
              href="/find-a-doctor"
              className="btn"
              style={{
                background: "white",
                border: "1px solid var(--ink-200)",
                padding: "10px 14px",
                fontSize: 13,
              }}
            >
              View all cardiologists
            </Link>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {list.map((d, i) => (
            <DocMiniCard key={d.name} d={d} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecTechnology() {
  const cells = [
    { n: "4", l: "Cath labs" },
    { n: "3", l: "EP labs" },
    { n: "1", l: "Hybrid OR" },
    { n: "24/7", l: "STEMI activation" },
  ];
  return (
    <section className="section" style={{ background: "white" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <Placeholder
            label="Cath lab — 3D mapping suite"
            style={{ height: 420, borderRadius: 18 }}
          />
          <div>
            <div className="kicker" style={{ marginBottom: 14 }}>
              Technology
            </div>
            <h2 className="serif" style={{ fontSize: 40, marginBottom: 18 }}>
              Four cath labs, 3D mapping, hybrid OR.
            </h2>
            <p style={{ fontSize: 15, marginBottom: 28 }}>
              Our Heart Center is equipped with the Kingdom&apos;s most advanced cardiac infrastructure — including biplane cath labs, 3D electroanatomical mapping, intravascular imaging (IVUS/OCT), and a hybrid operating room for structural heart procedures.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {cells.map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: 16,
                    borderRadius: 10,
                    border: "1px solid var(--ink-200)",
                  }}
                >
                  <div
                    className="serif"
                    style={{
                      fontSize: 26,
                      fontWeight: 500,
                      color: "var(--brand-900)",
                      marginBottom: 4,
                    }}
                  >
                    {s.n}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ink-500)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecFAQ() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section className="section" style={{ background: "var(--ink-50)" }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <SectionHeader
          kicker="FAQ"
          title="Frequently asked questions."
          align="center"
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SPEC_DATA.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: 12,
                  border: "1px solid var(--ink-200)",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    fontFamily: "inherit",
                    textAlign: "left",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--brand-900)",
                  }}
                >
                  {f.q}
                  <span
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "none",
                      transition: "transform 200ms ease",
                      color: "var(--accent-600)",
                      flexShrink: 0,
                      display: "inline-flex",
                    }}
                  >
                    <Icon name="plus" size={18} stroke={2} />
                  </span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: "0 24px 20px",
                      fontSize: 14,
                      color: "var(--ink-500)",
                      lineHeight: 1.6,
                    }}
                  >
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SpecCTA2() {
  return (
    <section
      className="section"
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
            "radial-gradient(ellipse at 20% 50%, rgba(47,181,164,0.2), transparent 55%)",
        }}
      />
      <div
        className="container"
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <h2 className="serif" style={{ color: "white", marginBottom: 20 }}>
          Ready to see a cardiologist?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, marginBottom: 32 }}>
          Book a consultation in under 48 hours — in-person at any of our 14 branches or via secure video.
        </p>
        <div
          className="flex"
          style={{ gap: 12, justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link href="/find-a-doctor" className="btn btn-accent" style={{ padding: "14px 24px" }}>
            Find a cardiologist <Icon name="arrow" size={14} />
          </Link>
          <a
            href="tel:920022811"
            className="btn"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "14px 24px",
            }}
          >
            <Icon name="phone" size={14} /> Call us · 920 022 811
          </a>
        </div>
      </div>
    </section>
  );
}

export function SpecialtyDetail() {
  return (
    <>
      <SpecHero />
      <SpecAccreditation />
      <SpecConditions />
      <SpecServices />
      <SpecDoctors />
      <SpecTechnology />
      <SpecFAQ />
      <SpecCTA2 />
    </>
  );
}
