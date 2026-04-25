"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { ClinicBackground } from "./ClinicBackground";
import { Icon, StarFill, type IconName } from "./Icon";
import { Placeholder, SectionHeader } from "./ui";

type TeleService = {
  icon: IconName;
  name: string;
  desc: string;
  bullets: string[];
};

const TELE_SERVICES: TeleService[] = [
  {
    icon: "syringe",
    name: "Home Medication Delivery",
    desc: "Experience hassle-free healthcare with our Home Medication Delivery service, ensuring your prescribed medications are conveniently delivered to your doorstep, enhancing the ease and efficiency of telemedicine consultations.",
    bullets: [
      "Same-day dispatch in major cities",
      "Cold-chain for temperature-sensitive meds",
      "Refill reminders via the app",
    ],
  },
  {
    icon: "search",
    name: "Lab Services",
    desc: "Through our telemedicine platform, access seamless laboratory services, enabling you to conveniently schedule, monitor, and receive your test results from the comfort of your home, ensuring efficient and timely healthcare management.",
    bullets: [
      "At-home phlebotomy appointments",
      "Results in the app in 24–48 hours",
      "Doctor-reviewed result summary",
    ],
  },
  {
    icon: "home",
    name: "Home-Based Services",
    desc: "Embrace the convenience of telemedicine with our comprehensive home-based services, providing expert medical consultations, personalized treatments, and essential healthcare support, all from the comfort and safety of your own home.",
    bullets: [
      "Registered nurse home visits",
      "Physiotherapy & wound care",
      "Post-discharge follow-up care",
    ],
  },
];

const TELE_STEPS: { n: string; icon: IconName; t: string; d: string }[] = [
  { n: "01", icon: "phone", t: "Download & sign in", d: "Get the MyClinic app and verify your identity in under 2 minutes using your National ID or Iqama." },
  { n: "02", icon: "stethoscope", t: "Pick a specialist", d: "Browse 200+ consultants across 28 specialties. See real-time availability and reviews." },
  { n: "03", icon: "video", t: "Start your consultation", d: "Join the encrypted video room. Share photos, symptoms and prior records in the same chat." },
  { n: "04", icon: "check", t: "Get your care plan", d: "Receive digital prescriptions, lab orders, referrals and medication delivery — all in the app." },
];

const TELE_SPECS_COVERED: { name: string; icon: IconName }[] = [
  { name: "General Practice", icon: "stethoscope" },
  { name: "Pediatrics", icon: "baby" },
  { name: "Dermatology", icon: "skin" },
  { name: "Psychiatry", icon: "brain" },
  { name: "Endocrinology", icon: "heart" },
  { name: "Gynecology", icon: "heart" },
  { name: "Nutrition", icon: "shield" },
  { name: "Cardiology", icon: "heart" },
  { name: "Chronic Care", icon: "clock" },
  { name: "Ophthalmology", icon: "eye" },
  { name: "ENT", icon: "stethoscope" },
  { name: "Urology", icon: "kidney" },
];

function TeleHero() {
  return (
    <section
      className="tm-hero"
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
            "radial-gradient(ellipse at 85% 20%, rgba(47,181,164,0.25), transparent 55%)",
        }}
      />
      <ClinicBackground color={0x2fb5a4} opacity={0.22} containerOpacity={0.7} />
      <div className="container" style={{ position: "relative" }}>
        <div
          className="flex"
          style={{ gap: 8, fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 28 }}
        >
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Home
          </Link>
          <span>/</span>
          <span style={{ color: "white" }}>Telemedicine</span>
        </div>

        <div
          className="tm-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div className="tm-hero-copy">
            <div
              className="kicker"
              style={{
                color: "var(--accent-400)",
                marginBottom: 16,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--accent-400)",
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }}
              />
              Telemedicine · Live now
            </div>
            <h1
              className="serif"
              style={{
                color: "white",
                marginBottom: 22,
                fontSize: "clamp(44px, 5vw, 68px)",
              }}
            >
              See a doctor in minutes.
              <br />
              <span style={{ color: "var(--accent-400)", fontStyle: "italic" }}>
                From anywhere in the Kingdom.
              </span>
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: 17,
                maxWidth: 540,
                marginBottom: 32,
              }}
            >
              Secure video consultations with licensed consultants, digital prescriptions, medication delivery and at-home labs — all in one app. Most insurers accepted.
            </p>
            <div className="flex tm-hero-actions" style={{ gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
              <a href="#consult" className="btn btn-accent" style={{ padding: "16px 28px", fontSize: 15 }}>
                <Icon name="video" size={16} /> Start a consultation
              </a>
              <a
                href="#download"
                className="btn"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "16px 28px",
                  fontSize: 15,
                }}
              >
                <Icon name="phone" size={14} /> Download the app
              </a>
            </div>
            <div
              className="flex tm-hero-trust"
              style={{
                gap: 24,
                flexWrap: "wrap",
                fontSize: 12,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              <span className="flex" style={{ gap: 6, alignItems: "center" }}>
                <Icon name="shield" size={14} /> HIPAA-grade encryption
              </span>
              <span className="flex" style={{ gap: 6, alignItems: "center" }}>
                <Icon name="check" size={14} /> MOH-licensed platform
              </span>
              <span className="flex" style={{ gap: 6, alignItems: "center" }}>
                <Icon name="clock" size={14} /> 24/7 availability
              </span>
            </div>
          </div>

          <div className="tm-hero-visual" style={{ position: "relative", height: 500 }}>
            <div
              className="tm-video-phone"
              style={{
                position: "absolute",
                right: 40,
                top: 0,
                width: 280,
                height: 500,
                background: "linear-gradient(145deg, #111 0%, #222 100%)",
                borderRadius: 40,
                padding: 10,
                boxShadow:
                  "0 50px 100px rgba(0,0,0,0.4), 0 20px 40px rgba(47,181,164,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 32,
                  overflow: "hidden",
                  background: "var(--brand-50)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 90,
                    height: 22,
                    background: "#111",
                    borderRadius: 12,
                    zIndex: 10,
                  }}
                />
                <div
                  style={{
                    padding: "14px 24px 8px",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--brand-900)",
                  }}
                >
                  <span>9:41</span>
                  <span>●●●</span>
                </div>
                <div
                  style={{
                    flex: 1,
                    background: "linear-gradient(180deg, var(--brand-800), var(--brand-900))",
                    margin: "32px 12px 12px",
                    borderRadius: 16,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(ellipse at center, rgba(255,255,255,0.1), transparent)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "35%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Placeholder
                      accent
                      label="Dr"
                      style={{ width: 80, height: 80, borderRadius: "50%" }}
                    >
                      <span className="ph-label" style={{ padding: "3px 8px", fontSize: 10 }}>
                        Dr
                      </span>
                    </Placeholder>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 80,
                      left: 0,
                      right: 0,
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 600 }}>Dr. Hala Al-Rashid</div>
                    <div style={{ fontSize: 11, opacity: 0.7 }}>Cardiologist · 02:14</div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 80,
                      right: 10,
                      width: 56,
                      height: 72,
                      borderRadius: 10,
                      background: "var(--accent-600)",
                      border: "2px solid white",
                      display: "grid",
                      placeItems: "center",
                      color: "white",
                    }}
                  >
                    <Icon name="eye" size={16} stroke={2} />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 16,
                      left: 0,
                      right: 0,
                      display: "flex",
                      gap: 8,
                      justifyContent: "center",
                    }}
                  >
                    {(["mic", "cam", "end"] as const).map((c) => (
                      <div
                        key={c}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: c === "end" ? "#ef4444" : "rgba(255,255,255,0.2)",
                          display: "grid",
                          placeItems: "center",
                          color: "white",
                          fontSize: 14,
                        }}
                      >
                        {c === "end" ? "✕" : c === "mic" ? "🎤" : "📷"}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tm-floating-card tm-floating-prescription"
              style={{
                position: "absolute",
                left: 0,
                top: 180,
                background: "white",
                padding: "14px 18px",
                borderRadius: 14,
                color: "var(--brand-900)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                display: "flex",
                gap: 12,
                alignItems: "center",
                maxWidth: 240,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--accent-50)",
                  color: "var(--accent-600)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Icon name="check" size={18} stroke={2.4} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>Prescription sent</div>
                <div style={{ fontSize: 11, color: "var(--ink-500)" }}>Delivery in 2h</div>
              </div>
            </div>

            <div
              className="tm-floating-card tm-floating-rating"
              style={{
                position: "absolute",
                left: 30,
                bottom: 30,
                background: "white",
                padding: "12px 16px",
                borderRadius: 14,
                color: "var(--brand-900)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <div className="flex" style={{ gap: 2 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarFill key={i} size={12} />
                ))}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600 }}>4.9 rating</div>
                <div style={{ fontSize: 10, color: "var(--ink-500)" }}>from 48k+ patients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeleOverview() {
  const stats = [
    { n: "28", l: "Specialties online" },
    { n: "< 15 min", l: "Avg wait time" },
    { n: "92%", l: "Patient satisfaction" },
    { n: "200+", l: "Consultants on platform" },
  ];
  return (
    <section className="section tm-overview" style={{ background: "white" }}>
      <div className="container">
        <div
          className="tm-overview-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div className="tm-overview-copy">
            <div className="kicker" style={{ marginBottom: 14 }}>
              Why Telemedicine
            </div>
            <h2 className="serif" style={{ fontSize: 44, marginBottom: 20 }}>
              Care without the commute.
            </h2>
            <p style={{ fontSize: 16, marginBottom: 24 }}>
              MyClinic Telemedicine brings the expertise of our hospitals directly to your home or office. Video consultations are delivered by the same licensed consultants you&apos;d see in person — with the full patient record, imaging and lab results visible to them in real time.
            </p>
            <p style={{ fontSize: 15, color: "var(--ink-500)", marginBottom: 32 }}>
              Whether it&apos;s a quick prescription refill, a second opinion, or ongoing chronic-disease management, we make it easy to get the care you need when you need it.
            </p>
            <div className="tm-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              {stats.map((s, i) => (
                <div key={i}>
                  <div
                    className="serif"
                    style={{
                      fontSize: 32,
                      fontWeight: 500,
                      color: "var(--brand-900)",
                      marginBottom: 4,
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--ink-500)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Placeholder
            className="tm-overview-image"
            label="Patient using telemedicine"
            style={{ height: 520, borderRadius: 20 }}
          />
        </div>
      </div>
    </section>
  );
}

function TeleHowItWorks() {
  return (
    <section className="section tm-steps-section" style={{ background: "var(--ink-50)" }}>
      <div className="container">
        <SectionHeader
          kicker="How it works"
          title="From download to diagnosis in 4 steps."
          body="The entire telemedicine flow takes less than 15 minutes — from opening the app to ending your consultation with a care plan in hand."
        />
        <div
          className="tm-steps-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            position: "relative",
          }}
        >
          {TELE_STEPS.map((s, i) => (
            <div
              key={s.n}
              className="tm-step-card"
              style={{
                padding: 28,
                background: "white",
                borderLeft: i === 0 ? "1px solid var(--ink-200)" : "none",
                borderRight: "1px solid var(--ink-200)",
                borderTop: "1px solid var(--ink-200)",
                borderBottom: "1px solid var(--ink-200)",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "var(--accent-600)",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  marginBottom: 16,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "var(--brand-50)",
                  color: "var(--brand-800)",
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

function TeleServices() {
  return (
    <section className="section tm-services-section" style={{ background: "white" }}>
      <div className="container">
        <SectionHeader
          kicker="Services"
          title="Beyond the video call."
          body="Telemedicine at MyClinic includes everything you need to complete your care — delivery, labs and in-home services, all coordinated through the app."
        />
        <div className="tm-services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {TELE_SERVICES.map((s, i) => (
            <div
              key={s.name}
              className="card tm-service-card"
              style={{
                padding: 0,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Placeholder
                className="tm-service-media"
                accent={i === 1}
                label={`${s.name} imagery`}
                style={{
                  height: 180,
                  borderRadius: 0,
                  borderBottom: "1px solid var(--ink-200)",
                }}
              />
              <div
                style={{
                  padding: 28,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: "var(--accent-50)",
                    color: "var(--accent-600)",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: 18,
                  }}
                >
                  <Icon name={s.icon} size={20} />
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    color: "var(--brand-900)",
                    marginBottom: 10,
                  }}
                >
                  {s.name}
                </div>
                <p style={{ fontSize: 14, marginBottom: 18 }}>{s.desc}</p>
                <div
                  style={{
                    paddingTop: 16,
                    borderTop: "1px solid var(--ink-200)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {s.bullets.map((b) => (
                    <div
                      key={b}
                      className="flex"
                      style={{
                        gap: 8,
                        alignItems: "center",
                        fontSize: 13,
                        color: "var(--ink-700)",
                      }}
                    >
                      <span style={{ color: "var(--accent-600)", flexShrink: 0, display: "inline-flex" }}>
                        <Icon name="check" size={14} stroke={2.4} />
                      </span>
                      {b}
                    </div>
                  ))}
                </div>
                <a href="#" className="link" style={{ marginTop: 20, fontSize: 13 }}>
                  Learn more <Icon name="arrow" size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeleSpecialties() {
  return (
    <section className="section tm-specialties-section" style={{ background: "var(--ink-50)" }}>
      <div className="container">
        <SectionHeader
          kicker="Specialties on telemedicine"
          title="28 specialties available online."
          body="Not every visit needs to be in person. These specialties are fully supported via video."
          side={
            <Link href="/specialties" className="link">
              See all specialties <Icon name="arrow" size={14} />
            </Link>
          }
        />
        <div className="tm-specialties-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
          {TELE_SPECS_COVERED.map((s) => (
            <a
              key={s.name}
              href="#"
              className="card tm-specialty-card"
              style={{
                padding: 20,
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 12,
                minHeight: 120,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "var(--accent-50)",
                  color: "var(--accent-600)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Icon name={s.icon} size={18} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--brand-900)" }}>
                {s.name}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeleAppDownload() {
  const quickActions = ["Book appointment", "Medication delivery", "Lab results", "My records"];
  return (
    <section
      id="download"
      className="section tm-app-section"
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
            "radial-gradient(ellipse at 30% 80%, rgba(47,181,164,0.2), transparent 55%), radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1.5px)",
          backgroundSize: "auto, 32px 32px",
        }}
      />
      <div className="container" style={{ position: "relative" }}>
        <div
          className="tm-app-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div className="tm-app-copy">
            <div className="kicker" style={{ color: "var(--accent-400)", marginBottom: 16 }}>
              Download the app
            </div>
            <h2
              className="serif"
              style={{
                color: "white",
                fontSize: "clamp(36px, 3.8vw, 52px)",
                marginBottom: 20,
              }}
            >
              Everything, in your pocket.
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: 17,
                marginBottom: 32,
                maxWidth: 520,
              }}
            >
              Book appointments, join video consultations, order medication delivery, access lab results and manage your family&apos;s health records — all from a single secure app.
            </p>
            <div className="flex tm-store-actions" style={{ gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
              <a
                href="#"
                className="tm-store-badge"
                style={{
                  background: "black",
                  color: "white",
                  padding: "12px 22px",
                  borderRadius: 12,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 10, opacity: 0.7 }}>Download on the</div>
                  <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.1 }}>App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="tm-store-badge"
                style={{
                  background: "black",
                  color: "white",
                  padding: "12px 22px",
                  borderRadius: 12,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <svg width="24" height="26" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
                  <path d="M325.3 234.3L104.6 13l280.8 161-60.1 60.3zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161-60.1-60.3L104.6 499z" />
                </svg>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 10, opacity: 0.7 }}>Get it on</div>
                  <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.1 }}>Google Play</div>
                </div>
              </a>
            </div>

            <div className="flex tm-qr-row" style={{ gap: 14, alignItems: "center" }}>
              <div
                style={{
                  width: 84,
                  height: 84,
                  background: "white",
                  borderRadius: 10,
                  padding: 6,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <QRPattern />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                  Scan to download
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", maxWidth: 220 }}>
                  Point your camera — opens the right store automatically.
                </div>
              </div>
            </div>
          </div>

          <div className="tm-app-visual" style={{ position: "relative", height: 560 }}>
            <div
              className="tm-app-phone"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%) rotate(-4deg)",
                width: 300,
                height: 540,
                background: "linear-gradient(145deg, #0a0a0a 0%, #222 100%)",
                borderRadius: 44,
                padding: 12,
                boxShadow:
                  "0 60px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 34,
                  overflow: "hidden",
                  background: "white",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    padding: 20,
                    background: "var(--brand-800)",
                    color: "white",
                    paddingTop: 36,
                  }}
                >
                  <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>
                    Good morning,
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 600 }}>Ahmed</div>
                </div>
                <div
                  style={{
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      padding: 14,
                      background: "var(--accent-50)",
                      borderRadius: 12,
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: "var(--accent-600)",
                        color: "white",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Icon name="video" size={16} />
                    </div>
                    <div style={{ fontSize: 12, color: "var(--brand-900)" }}>
                      <div style={{ fontWeight: 600 }}>Start video consultation</div>
                      <div style={{ fontSize: 10, color: "var(--ink-500)" }}>
                        Next available in 8 min
                      </div>
                    </div>
                  </div>
                  {quickActions.map((t) => (
                    <div
                      key={t}
                      style={{
                        padding: "12px 14px",
                        background: "var(--ink-50)",
                        borderRadius: 10,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 12,
                        color: "var(--brand-900)",
                        fontWeight: 500,
                      }}
                    >
                      {t}
                      <Icon name="arrow" size={12} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QRPattern() {
  const cells: [number, number][] = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 0], [1, 6], [2, 0], [2, 2], [2, 3], [2, 4], [2, 6],
    [3, 0], [3, 2], [3, 3], [3, 4], [3, 6], [4, 0], [4, 2],
    [4, 3], [4, 4], [4, 6], [5, 0], [5, 6], [6, 0], [6, 1],
    [6, 2], [6, 3], [6, 4], [6, 5], [6, 6],
    [22, 0], [22, 1], [22, 2], [22, 3], [22, 4], [22, 5], [22, 6],
    [23, 0], [23, 6], [24, 0], [24, 2], [24, 3], [24, 4], [24, 6],
    [25, 0], [25, 2], [25, 3], [25, 4], [25, 6], [26, 0], [26, 2],
    [26, 3], [26, 4], [26, 6], [27, 0], [27, 6], [28, 0], [28, 1],
    [28, 2], [28, 3], [28, 4], [28, 5], [28, 6],
    [0, 22], [0, 23], [0, 24], [0, 25], [0, 26], [0, 27], [0, 28],
    [1, 22], [1, 28], [2, 22], [2, 24], [2, 25], [2, 26], [2, 28],
    [3, 22], [3, 24], [3, 25], [3, 26], [3, 28], [4, 22], [4, 24],
    [4, 25], [4, 26], [4, 28], [5, 22], [5, 28], [6, 22], [6, 23],
    [6, 24], [6, 25], [6, 26], [6, 27], [6, 28],
    [8, 8], [10, 8], [12, 8], [14, 8], [9, 9], [11, 9], [13, 9],
    [8, 10], [10, 10], [12, 10], [14, 10],
    [9, 12], [11, 12], [13, 12], [15, 12],
    [8, 14], [10, 14], [12, 14], [14, 14], [16, 14],
    [18, 8], [20, 8], [17, 10], [19, 10], [21, 10],
    [18, 12], [20, 12], [17, 14], [19, 14],
    [8, 16], [10, 16], [12, 16], [14, 16], [16, 16], [18, 16], [20, 16],
    [9, 18], [11, 18], [13, 18], [15, 18], [17, 18], [19, 18], [21, 18],
    [8, 20], [10, 20], [12, 20], [14, 20], [16, 20], [18, 20], [20, 20],
  ];
  return (
    <svg viewBox="0 0 29 29" width="72" height="72" style={{ display: "block" }} aria-hidden="true">
      <rect width="29" height="29" fill="white" />
      {cells.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="1" height="1" fill="black" />
      ))}
    </svg>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  as?: "textarea" | "select";
  options?: string[];
  style?: CSSProperties;
};

function FField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  as,
  options,
  style,
}: FieldProps) {
  const base: CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 8,
    border: "1px solid var(--ink-200)",
    fontSize: 14,
    fontFamily: "inherit",
    background: "white",
    color: "var(--ink-900)",
    outline: "none",
  };
  return (
    <div style={style}>
      <label
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "var(--ink-700)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          display: "block",
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ ...base, minHeight: 100, resize: "vertical" }}
        />
      ) : as === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={base}
        >
          {(options ?? []).map((o, i) => (
            <option key={o} value={i === 0 ? "" : o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={base}
        />
      )}
    </div>
  );
}

function TeleBookingForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    specialty: "",
    concern: "",
    date: "",
    time: "morning",
  });
  const [sent, setSent] = useState(false);
  const upd = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.name.trim().length > 0 && form.phone.trim().length > 0;
  const times = [
    { id: "morning", l: "Morning" },
    { id: "afternoon", l: "Afternoon" },
    { id: "evening", l: "Evening" },
    { id: "any", l: "Anytime" },
  ];
  const infoItems: { icon: IconName; l: string; v: string }[] = [
    { icon: "phone", l: "Hotline 920 022 811", v: "Available 24/7" },
    { icon: "globe", l: "Languages", v: "Arabic · English · Urdu · Tagalog" },
    { icon: "shield", l: "Your data is protected", v: "End-to-end encryption" },
  ];

  return (
    <section id="consult" className="section tm-form-section" style={{ background: "white", scrollMarginTop: 120 }}>
      <div className="container">
        <div
          className="card tm-form-card"
          style={{
            padding: 0,
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
          }}
        >
          <div
            className="tm-form-intro"
            style={{
              background: "var(--brand-900)",
              color: "white",
              padding: 48,
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
                  "radial-gradient(ellipse at 80% 20%, rgba(47,181,164,0.2), transparent 55%)",
              }}
            />
            <div style={{ position: "relative" }}>
              <div className="kicker" style={{ color: "var(--accent-400)", marginBottom: 18 }}>
                Request a consultation
              </div>
              <h2 className="serif" style={{ color: "white", fontSize: 36, marginBottom: 20 }}>
                We&apos;ll call you back within 15 minutes.
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 15,
                  marginBottom: 32,
                }}
              >
                Prefer to talk to someone first? Fill the form and our care navigators will guide you to the right specialist.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {infoItems.map((p) => (
                  <div key={p.l} className="flex" style={{ gap: 14, alignItems: "center" }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: "rgba(47,181,164,0.2)",
                        color: "var(--accent-400)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Icon name={p.icon} size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{p.l}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{p.v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="tm-form-fields" style={{ padding: 48 }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "var(--accent-50)",
                    color: "var(--accent-600)",
                    margin: "0 auto 20px",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Icon name="check" size={30} stroke={2.4} />
                </div>
                <h3
                  className="serif"
                  style={{ fontSize: 28, color: "var(--brand-900)", marginBottom: 10 }}
                >
                  Request received.
                </h3>
                <p style={{ fontSize: 14 }}>
                  A care navigator will call you at <strong>{form.phone}</strong> within 15 minutes.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn btn-primary"
                  style={{ marginTop: 24 }}
                >
                  Submit another
                </button>
              </div>
            ) : (
              <>
                <div className="kicker" style={{ marginBottom: 10 }}>
                  Consultation request form
                </div>
                <h3
                  className="serif"
                  style={{ fontSize: 26, color: "var(--brand-900)", marginBottom: 24 }}
                >
                  Tell us a bit about you.
                </h3>
                <div className="tm-fields-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <FField
                    label="Full name"
                    value={form.name}
                    onChange={(v) => upd("name", v)}
                    placeholder="Ahmed Al-Saud"
                  />
                  <FField
                    label="Phone"
                    value={form.phone}
                    onChange={(v) => upd("phone", v)}
                    placeholder="+966 5X XXX XXXX"
                  />
                  <FField
                    label="Email"
                    value={form.email}
                    onChange={(v) => upd("email", v)}
                    placeholder="you@example.com"
                    style={{ gridColumn: "1 / -1" }}
                  />
                  <FField
                    label="Specialty"
                    as="select"
                    value={form.specialty}
                    onChange={(v) => upd("specialty", v)}
                    options={["Select a specialty", ...TELE_SPECS_COVERED.map((s) => s.name)]}
                  />
                  <FField
                    label="Preferred date"
                    type="date"
                    value={form.date}
                    onChange={(v) => upd("date", v)}
                  />
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "var(--ink-700)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      Preferred time
                    </label>
                    <div
                      className="tm-time-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 6,
                      }}
                    >
                      {times.map((t) => {
                        const active = form.time === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => upd("time", t.id)}
                            style={{
                              padding: "10px",
                              fontSize: 12,
                              fontWeight: 500,
                              borderRadius: 8,
                              fontFamily: "inherit",
                              cursor: "pointer",
                              border: `1px solid ${active ? "var(--brand-800)" : "var(--ink-200)"}`,
                              background: active ? "var(--brand-800)" : "white",
                              color: active ? "white" : "var(--ink-700)",
                            }}
                          >
                            {t.l}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <FField
                    label="Brief description of your concern"
                    as="textarea"
                    value={form.concern}
                    onChange={(v) => upd("concern", v)}
                    placeholder="Tell us what's bothering you so we can match you with the right doctor…"
                    style={{ gridColumn: "1 / -1" }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => valid && setSent(true)}
                  disabled={!valid}
                  className="btn btn-primary"
                  style={{
                    marginTop: 24,
                    padding: "14px 28px",
                    width: "100%",
                    justifyContent: "center",
                    opacity: valid ? 1 : 0.5,
                    cursor: valid ? "pointer" : "not-allowed",
                  }}
                >
                  Request consultation <Icon name="arrow" size={14} />
                </button>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--ink-500)",
                    textAlign: "center",
                    marginTop: 14,
                  }}
                >
                  By submitting, you agree to MyClinic&apos;s privacy policy and terms of service.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TelemedicinePage() {
  return (
    <>
      <TeleHero />
      <TeleOverview />
      <TeleHowItWorks />
      <TeleServices />
      <TeleSpecialties />
      <TeleAppDownload />
      <TeleBookingForm />
    </>
  );
}
