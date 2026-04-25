"use client";

import Link from "next/link";
import { ClinicBackground } from "./ClinicBackground";
import { Icon, type IconName } from "./Icon";
import { Placeholder, SectionHeader } from "./ui";

type Value = { icon: IconName; title: string; body: string };
type Milestone = { year: string; title: string; body: string };
type Leader = { name: string; role: string; bio: string };

const VALUES: Value[] = [
  {
    icon: "heart",
    title: "Patient first, always.",
    body:
      "Every decision — from appointment flow to treatment plan — is measured by one thing: does it make our patient's day easier, safer, or better.",
  },
  {
    icon: "shield",
    title: "Clinical excellence.",
    body:
      "Board-certified consultants, peer-reviewed protocols, and outcomes we publish. We compete on results, not marketing.",
  },
  {
    icon: "stethoscope",
    title: "Transparent care.",
    body:
      "Clear pricing, explained diagnoses, and access to your records on day one. Informed patients make better decisions.",
  },
  {
    icon: "video",
    title: "Human technology.",
    body:
      "Telemedicine, home-healthcare, digital records — tech should shrink the distance between you and your doctor, never widen it.",
  },
];

const MILESTONES: Milestone[] = [
  { year: "2008", title: "MyClinic founded in Jeddah", body: "Opened our first clinic in Al Safa with 12 consultants and a single promise: better care, closer to home." },
  { year: "2012", title: "JCI Accreditation earned", body: "Became one of the earliest private clinics in the Kingdom to meet Joint Commission International standards." },
  { year: "2016", title: "Expansion to Riyadh", body: "Launched Al Sahafa — our first 24/7 branch — bringing MyClinic to the capital." },
  { year: "2019", title: "Centers of Excellence launched", body: "Dedicated programs in Cardiology, Dermatology, and Executive Health opened across flagship sites." },
  { year: "2020", title: "Telemedicine goes live", body: "Secure video consultations launched overnight — keeping care continuous through the pandemic." },
  { year: "2023", title: "Home healthcare in 10 cities", body: "Licensed nurses, physiotherapists and physicians delivering hospital-grade care at home." },
  { year: "2026", title: "14 branches. One connected record.", body: "Unified medical record across every branch, app and telemedicine channel — your history follows you." },
];

const STATS = [
  { n: "2.4M+", l: "Patient visits each year" },
  { n: "850+", l: "Physicians & consultants" },
  { n: "42", l: "Medical specialties" },
  { n: "14", l: "Branches across Jeddah & Riyadh" },
];

const LEADERS: Leader[] = [
  { name: "Dr. Mohammed Al-Harbi", role: "Chief Executive Officer", bio: "25 years in healthcare leadership. Former COO of a regional hospital group. MBA, INSEAD." },
  { name: "Dr. Nadia Al-Qahtani", role: "Chief Medical Officer", bio: "Consultant Internal Medicine. Oversees clinical governance and outcomes across all 14 branches." },
  { name: "Sara Al-Otaibi", role: "Chief Operating Officer", bio: "Leads operations, patient experience and the digital transformation program." },
  { name: "Khalid Bin Saad", role: "Chief Financial Officer", bio: "Previously led finance at two listed healthcare groups in the GCC. CFA charterholder." },
];

const ACCREDITATIONS = ["JCI", "CBAHI", "ISO 9001", "HIPAA-aligned", "MOH licensed"];
const INSURERS = ["Bupa", "Tawuniya", "Medgulf", "AXA", "AlRajhi Takaful", "Walaa", "MEDGULF", "SAICO"];

function AboutHero() {
  return (
    <section
      style={{
        background: "var(--brand-900)",
        color: "white",
        position: "relative",
        paddingTop: 64,
        paddingBottom: 96,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 85% 20%, rgba(47,181,164,0.22), transparent 55%)",
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
          <span style={{ color: "white" }}>About Us</span>
        </div>
        <div style={{ maxWidth: 820 }}>
          <div className="kicker" style={{ color: "var(--accent-400)", marginBottom: 18 }}>
            About MyClinic
          </div>
          <h1
            className="serif"
            style={{
              color: "white",
              marginBottom: 22,
              fontSize: "clamp(42px, 5vw, 68px)",
              lineHeight: 1.05,
            }}
          >
            Care built around you.
            <br />
            <span style={{ color: "var(--accent-400)", fontStyle: "italic" }}>
              Since 2008.
            </span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 18, maxWidth: 640 }}>
            MyClinic is a medical group rooted in Jeddah and Riyadh — fourteen branches, 850+ consultants, one connected medical record. We exist to make advanced healthcare feel unhurried, transparent, and close to home.
          </p>
        </div>

        <div
          style={{
            marginTop: 72,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            borderTop: "1px solid rgba(255,255,255,0.12)",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
          className="mc-about-stats"
        >
          {STATS.map((s, i) => (
            <div
              key={s.l}
              style={{
                padding: "28px 22px",
                textAlign: "center",
                borderInlineEnd:
                  i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <div
                className="serif"
                style={{ fontSize: 36, fontWeight: 500, color: "white", marginBottom: 4 }}
              >
                {s.n}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutMission() {
  return (
    <section className="section" style={{ background: "white" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.15fr",
            gap: 72,
            alignItems: "center",
          }}
          className="mc-about-mission"
        >
          <div>
            <div className="kicker" style={{ marginBottom: 16 }}>
              Our Mission
            </div>
            <h2 className="serif" style={{ marginBottom: 22 }}>
              Healthcare that respects{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent-600)" }}>
                your time, your story, your choice.
              </span>
            </h2>
            <p style={{ fontSize: 17, marginBottom: 18, lineHeight: 1.7 }}>
              We built MyClinic for the way people actually live — short waits, clear answers, same team across every visit, your record in your pocket. No fluff. No surprise bills.
            </p>
            <p style={{ fontSize: 17, color: "var(--ink-700)", lineHeight: 1.7 }}>
              The result is a medical group that reads more like a modern service than a hospital — coordinated, transparent, and measurably better at the things that matter most: diagnosis quality, continuity of care, and patient-reported outcomes.
            </p>
          </div>

          <div
            style={{
              position: "relative",
              borderRadius: 20,
              padding: "40px 44px",
              background: "var(--brand-50)",
              border: "1px solid var(--ink-200)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 24,
                insetInlineStart: 0,
                width: 4,
                height: 60,
                background: "var(--accent-600)",
                borderRadius: "0 4px 4px 0",
              }}
            />
            <div
              style={{
                fontSize: 11,
                color: "var(--accent-600)",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Our Vision
            </div>
            <p
              className="serif"
              style={{
                fontSize: 26,
                color: "var(--brand-900)",
                lineHeight: 1.35,
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              &ldquo;To be the Kingdom&apos;s most trusted medical group — the place families choose for the decisions that matter most.&rdquo;
            </p>
            <div style={{ fontSize: 13, color: "var(--ink-500)" }}>
              — The founding team, 2008
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutValues() {
  return (
    <section className="section" style={{ background: "var(--ink-50)" }}>
      <div className="container">
        <SectionHeader
          kicker="What we stand for"
          title="Four principles, every visit."
          body="They sound simple. Living them, across 14 branches and hundreds of daily patient journeys, is the hard part — and the work we're proudest of."
          align="center"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
          className="mc-about-values"
        >
          {VALUES.map((v) => (
            <div
              key={v.title}
              style={{
                background: "white",
                borderRadius: 18,
                padding: 28,
                border: "1px solid var(--ink-200)",
                transition: "transform .2s ease, box-shadow .2s ease, border-color .2s ease",
              }}
              className="mc-value-card"
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "var(--accent-50)",
                  color: "var(--accent-600)",
                  display: "grid",
                  placeItems: "center",
                  marginBottom: 20,
                }}
              >
                <Icon name={v.icon} size={22} />
              </div>
              <div
                className="serif"
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  color: "var(--brand-900)",
                  marginBottom: 10,
                  lineHeight: 1.3,
                }}
              >
                {v.title}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6 }}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutStory() {
  return (
    <section className="section" style={{ background: "white" }}>
      <div className="container">
        <SectionHeader
          kicker="Our Journey"
          title="Eighteen years, one direction."
          body="From a single clinic in Al Safa to 14 branches, telemedicine, and home-healthcare — here's how we got here."
        />
        <div className="mc-about-timeline">
          <div
            aria-hidden="true"
            className="mc-about-timeline-rail"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 36px 1fr",
                  gap: 24,
                  alignItems: "start",
                  position: "relative",
                }}
                className="mc-about-timeline-row"
              >
                <div
                  className="serif"
                  style={{
                    fontSize: 34,
                    fontWeight: 500,
                    color: "var(--brand-900)",
                    textAlign: "end",
                    paddingTop: 2,
                  }}
                >
                  {m.year}
                </div>
                <div style={{ position: "relative", display: "flex", justifyContent: "center", paddingTop: 8 }}>
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "white",
                      border: `3px solid ${i === MILESTONES.length - 1 ? "var(--accent-600)" : "var(--brand-800)"}`,
                      boxShadow: "0 2px 8px rgba(0,56,104,0.18)",
                      zIndex: 2,
                    }}
                  />
                </div>
                <div style={{ paddingBottom: 8 }}>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: "var(--brand-900)",
                      marginBottom: 6,
                    }}
                  >
                    {m.title}
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 560 }}>{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutLeadership() {
  return (
    <section className="section" style={{ background: "var(--ink-50)" }}>
      <div className="container">
        <SectionHeader
          kicker="Leadership"
          title="The team behind MyClinic."
          body="Clinicians and operators with deep Kingdom experience — accountable for the work, not the press release."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
          className="mc-about-leaders"
        >
          {LEADERS.map((l) => (
            <div
              key={l.name}
              style={{
                background: "white",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid var(--ink-200)",
              }}
            >
              <Placeholder
                accent
                label={l.name}
                style={{ height: 260, borderRadius: 0 }}
              />
              <div style={{ padding: 22 }}>
                <div
                  className="serif"
                  style={{
                    fontSize: 19,
                    fontWeight: 500,
                    color: "var(--brand-900)",
                    marginBottom: 4,
                  }}
                >
                  {l.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--accent-600)",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  {l.role}
                </div>
                <p style={{ fontSize: 13, color: "var(--ink-700)", lineHeight: 1.55 }}>{l.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutAccreditations() {
  return (
    <section className="section" style={{ background: "white" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 72,
            alignItems: "center",
          }}
          className="mc-about-accred"
        >
          <div>
            <div className="kicker" style={{ marginBottom: 16 }}>
              Standards & Partnerships
            </div>
            <h2 className="serif" style={{ marginBottom: 18 }}>
              Accredited where it matters.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.65 }}>
              Independently audited against the highest international and Saudi clinical standards. Accepted by every major insurer in the Kingdom.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--ink-500)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                Accreditations
              </div>
              <div className="flex" style={{ gap: 10, flexWrap: "wrap" }}>
                {ACCREDITATIONS.map((a) => (
                  <span
                    key={a}
                    className="chip"
                    style={{
                      background: "var(--brand-50)",
                      color: "var(--brand-900)",
                      borderColor: "rgba(0,56,104,0.16)",
                      padding: "10px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    <Icon name="shield" size={13} stroke={2} style={{ color: "var(--accent-600)" }} />
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--ink-500)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                Covered by 40+ insurers, including
              </div>
              <div className="flex" style={{ gap: 10, flexWrap: "wrap" }}>
                {INSURERS.map((p) => (
                  <span
                    key={p}
                    className="chip chip-accent"
                    style={{ padding: "10px 16px", fontSize: 13, fontWeight: 600 }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutCTA() {
  return (
    <section className="section" style={{ background: "var(--brand-900)", position: "relative", overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(ellipse at 15% 30%, rgba(47,181,164,0.18), transparent 55%)",
        }}
      />
      <ClinicBackground color={0x2fb5a4} opacity={0.18} containerOpacity={0.6} />
      <div className="container" style={{ position: "relative", textAlign: "center", maxWidth: 760, marginInline: "auto" }}>
        <div className="kicker" style={{ color: "var(--accent-400)", marginBottom: 16, justifyContent: "center" }}>
          Start your care
        </div>
        <h2 className="serif" style={{ color: "white", marginBottom: 18, fontSize: "clamp(32px, 3.6vw, 48px)" }}>
          Meet your next doctor{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent-400)" }}>this week.</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, marginBottom: 28 }}>
          Book an appointment, start a video consultation, or request a home visit — whichever fits your day.
        </p>
        <div className="flex" style={{ gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/find-a-doctor" className="btn btn-accent" style={{ padding: "16px 28px", fontSize: 15 }}>
            <Icon name="calendar" size={16} /> Book an appointment
          </Link>
          <Link
            href="/telemedicine"
            className="btn"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.22)",
              padding: "16px 28px",
              fontSize: 15,
            }}
          >
            <Icon name="video" size={16} /> Try telemedicine
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutStory />
      <AboutLeadership />
      <AboutAccreditations />
      <AboutCTA />
    </>
  );
}
