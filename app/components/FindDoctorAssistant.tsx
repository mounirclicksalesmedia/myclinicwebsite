"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Icon, StarFill, type IconName } from "./Icon";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/^dr\.\s*/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type MatchDoctor = {
  name: string;
  title: string;
  rating: number;
  reviews: number;
  exp: number;
  city: string;
  next: string;
  video: boolean;
  img: string;
};

type Route = {
  match: RegExp;
  spec: string;
  icon: IconName;
  reason: string;
  doctors: MatchDoctor[];
};

const ROUTES: Route[] = [
  {
    match: /(chest|heart|cardio|palpit|angina|pressure|blood\s?pressure|bp)/i,
    spec: "Cardiology",
    icon: "heart",
    reason:
      "Chest or heart-related symptoms are best assessed by a cardiologist — ECG, bloods, and further imaging if needed.",
    doctors: [
      {
        name: "Dr. Haifa Al-Falah",
        title: "Senior Consultant · Interventional Cardiology",
        rating: 4.9,
        reviews: 284,
        exp: 18,
        city: "Riyadh",
        next: "Today 14:00",
        video: true,
        img: "/doctors/haifa-alfalah.webp",
      },
      {
        name: "Dr. Turki Al-Ahmadi",
        title: "Consultant · Electrophysiology",
        rating: 4.7,
        reviews: 119,
        exp: 10,
        city: "Riyadh",
        next: "Tomorrow 15:00",
        video: true,
        img: "/doctors/turki-alahmadi.webp",
      },
    ],
  },
  {
    match: /(skin|rash|acne|derma|eczema|pigment)/i,
    spec: "Dermatology",
    icon: "skin",
    reason:
      "Skin concerns benefit from a dermatology review — same-week assessments and medical or cosmetic treatment plans.",
    doctors: [
      {
        name: "Dr. Sarah Dahlan",
        title: "Consultant · Cosmetic Dermatology",
        rating: 4.9,
        reviews: 412,
        exp: 12,
        city: "Riyadh",
        next: "Today 16:15",
        video: true,
        img: "/doctors/sarah-dahlan.webp",
      },
    ],
  },
  {
    match: /(child|kid|baby|infant|fever|pedia|newborn)/i,
    spec: "Pediatrics",
    icon: "baby",
    reason:
      "For children's symptoms our pediatricians run the full workup and coordinate with specialists as needed.",
    doctors: [
      {
        name: "Dr. Faisal Almuhizi",
        title: "Senior Consultant · Neonatology",
        rating: 5.0,
        reviews: 328,
        exp: 22,
        city: "Dammam",
        next: "Today 11:00",
        video: false,
        img: "/doctors/faisal-almuhizi.webp",
      },
    ],
  },
  {
    match: /(back|knee|joint|orth|sport|bone|sprain|fracture|shoulder)/i,
    spec: "Orthopedics",
    icon: "bone",
    reason:
      "Musculoskeletal pain is the orthopedics team's area — imaging, conservative care, or surgical assessment.",
    doctors: [
      {
        name: "Dr. Omar Ashour",
        title: "Consultant · Sports Medicine",
        rating: 4.8,
        reviews: 196,
        exp: 14,
        city: "Jeddah",
        next: "Tomorrow 10:30",
        video: true,
        img: "/doctors/omar-ashour.webp",
      },
    ],
  },
  {
    match: /(eye|vision|sight|ophthal|retina|glaucoma)/i,
    spec: "Ophthalmology",
    icon: "eye",
    reason:
      "Vision symptoms warrant an ophthalmology evaluation — retina, refractive, or general eye care.",
    doctors: [
      {
        name: "Dr. Nora Halawani",
        title: "Consultant · Retina",
        rating: 4.8,
        reviews: 152,
        exp: 11,
        city: "Makkah",
        next: "Thu 09:30",
        video: true,
        img: "/doctors/nora-halawani.webp",
      },
    ],
  },
  {
    match: /(migraine|headache|neuro|brain|seizure|numb|tingl)/i,
    spec: "Neurology",
    icon: "brain",
    reason:
      "Persistent headaches or neurological symptoms should be reviewed by a neurologist for a targeted workup.",
    doctors: [
      {
        name: "Dr. Khaled Al-Bazli",
        title: "Consultant · Movement Disorders",
        rating: 4.8,
        reviews: 88,
        exp: 13,
        city: "Riyadh",
        next: "Thu 11:30",
        video: false,
        img: "/doctors/khaled-albazli.webp",
      },
    ],
  },
  {
    match: /(gyn|women|preg|menstr|ovar|fertility|period)/i,
    spec: "Gynecology",
    icon: "heart",
    reason:
      "Women's health concerns are handled by our gynecology team — from routine care to maternal-fetal medicine.",
    doctors: [
      {
        name: "Dr. Lina Akkad",
        title: "Senior Consultant · Maternal-fetal",
        rating: 4.9,
        reviews: 267,
        exp: 16,
        city: "Jeddah",
        next: "Today 13:30",
        video: true,
        img: "/doctors/lina-akkad.webp",
      },
    ],
  },
  {
    match: /(tooth|dental|gum|cavity|ortho\b|brace)/i,
    spec: "Dental",
    icon: "tooth",
    reason:
      "For dental issues our orthodontics and general dentistry consultants can see you same-day.",
    doctors: [
      {
        name: "Dr. Amira El-Tawdy",
        title: "Consultant · Orthodontics",
        rating: 4.9,
        reviews: 342,
        exp: 15,
        city: "Riyadh",
        next: "Today 17:00",
        video: false,
        img: "/doctors/amira-el-tawdy.webp",
      },
    ],
  },
];

const DEFAULT_ROUTE: Route = {
  match: /.*/,
  spec: "Internal Medicine",
  icon: "stethoscope",
  reason:
    "Internal medicine is the best starting point — a full assessment, then referral to the right subspecialty if needed.",
  doctors: [
    {
      name: "Dr. Omar Ashour",
      title: "Consultant · Internal Medicine",
      rating: 4.8,
      reviews: 212,
      exp: 16,
      city: "Riyadh",
      next: "Today 15:30",
      video: true,
      img: "/doctors/omar-ashour.webp",
    },
  ],
};

const QUICK_CHIPS: { icon: IconName; label: string; prompt: string }[] = [
  { icon: "heart", label: "Chest pain", prompt: "I feel chest pain when I walk up stairs" },
  { icon: "baby", label: "Child fever", prompt: "My child has a fever for 2 days" },
  { icon: "bone", label: "Back pain", prompt: "I have lower back pain after lifting" },
  { icon: "skin", label: "Skin rash", prompt: "I have a persistent skin rash" },
  { icon: "brain", label: "Migraine", prompt: "I've had ongoing migraines for 2 weeks" },
  { icon: "tooth", label: "Toothache", prompt: "Toothache for the past few days" },
];

function pickRoute(text: string): Route {
  for (const r of ROUTES) if (r.match.test(text)) return r;
  return DEFAULT_ROUTE;
}

function MiniDoctorCard({ d }: { d: MatchDoctor }) {
  return (
    <div
      className="fd-mini-doctor-card"
      style={{
        display: "grid",
        gridTemplateColumns: "56px 1fr auto",
        gap: 14,
        alignItems: "center",
        padding: 14,
        background: "white",
        border: "1px solid var(--ink-200)",
        borderRadius: 14,
      }}
    >
      <img
        src={d.img}
        alt={d.name}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--brand-900)",
            marginBottom: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {d.name}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "var(--ink-500)",
            marginBottom: 6,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {d.title}
        </div>
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            fontSize: 11,
            color: "var(--ink-700)",
            flexWrap: "wrap",
          }}
        >
          <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
            <StarFill size={11} />
            <strong style={{ color: "var(--brand-900)" }}>{d.rating}</strong>
            <span style={{ color: "var(--ink-400)" }}>({d.reviews})</span>
          </span>
          <span>·</span>
          <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
            <Icon name="pin" size={11} /> {d.city}
          </span>
          {d.video && (
            <span
              style={{
                display: "inline-flex",
                gap: 4,
                alignItems: "center",
                color: "var(--accent-600)",
                fontWeight: 600,
              }}
            >
              · <Icon name="video" size={11} /> Video
            </span>
          )}
          <span>·</span>
          <span style={{ color: "var(--accent-600)", fontWeight: 600 }}>{d.next}</span>
        </div>
      </div>
      <Link
        href={`/doctor/${slugify(d.name)}`}
        className="btn btn-primary"
        style={{ padding: "10px 16px", fontSize: 13 }}
      >
        Book
      </Link>
    </div>
  );
}

export function FindDoctorAssistant({
  onSpecialtyClick,
  resultsHref = "#doctor-results",
}: {
  onSpecialtyClick?: (spec: string) => void;
  resultsHref?: string;
}) {
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [route, setRoute] = useState<Route | null>(null);

  const submit = (textArg?: string) => {
    const text = (textArg ?? input).trim();
    if (!text) return;
    setInput(text);
    setThinking(true);
    setRoute(null);
    setTimeout(() => {
      setThinking(false);
      setRoute(pickRoute(text));
    }, 850);
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  const goToResults = () => {
    if (route && onSpecialtyClick) onSpecialtyClick(route.spec);
    const el = document.querySelector(resultsHref);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="fd-assistant-section"
      style={{
        background: "var(--ink-50)",
        padding: "88px 0 64px",
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
            "radial-gradient(ellipse at 20% 30%, rgba(47,181,164,0.10), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(0,56,104,0.08), transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <div className="container" style={{ position: "relative" }}>
        <div
          className="fd-assistant-head"
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 20,
            alignItems: "center",
            marginBottom: 28,
            maxWidth: 900,
          }}
        >
          <div
            className="fd-assistant-avatar"
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "var(--accent-50)",
              border: "1px solid var(--accent-100)",
              overflow: "hidden",
              flexShrink: 0,
              boxShadow: "0 12px 32px rgba(47, 181, 164, 0.25)",
              position: "relative",
            }}
          >
            <Image
              src="/avatarailina.png"
              alt="Lina AI care navigator avatar"
              fill
              sizes="56px"
              style={{ objectFit: "cover" }}
            />
            <span
              style={{
                position: "absolute",
                bottom: -2,
                right: -2,
                width: 14,
                height: 14,
                background: "#10b981",
                border: "3px solid var(--ink-50)",
                borderRadius: "50%",
              }}
            />
          </div>
          <div>
            <div
              className="kicker"
              style={{
                color: "var(--accent-600)",
                marginBottom: 6,
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
                  background: "var(--accent-600)",
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }}
              />
              AI Care Navigator
            </div>
            <h3
              className="serif"
              style={{
                fontSize: "clamp(22px, 2.2vw, 28px)",
                color: "var(--brand-900)",
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              Not sure which specialty you need?{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent-600)" }}>
                Describe it to Lina.
              </span>
            </h3>
          </div>
        </div>

        <form
          className="fd-assistant-card"
          onSubmit={onFormSubmit}
          style={{
            background: "white",
            border: "1px solid var(--ink-200)",
            borderRadius: 20,
            padding: 20,
            boxShadow: "0 20px 60px rgba(10, 30, 60, 0.06)",
          }}
        >
          <div
            className="fd-ai-input-shell"
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto auto",
              gap: 10,
              alignItems: "center",
              background: "var(--ink-50)",
              border: "1px solid var(--ink-200)",
              borderRadius: 14,
              padding: "10px 14px",
            }}
          >
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "var(--accent-50)",
                color: "var(--accent-600)",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="stethoscope" size={18} />
            </span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. I've had chest pain when walking up stairs"
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: 15,
                fontFamily: "inherit",
                color: "var(--ink-900)",
                padding: "6px 0",
                minWidth: 0,
              }}
            />
            <button
              type="button"
              aria-label="Voice input"
              title="Voice input"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: "1px solid var(--ink-200)",
                background: "white",
                color: "var(--brand-800)",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>
            <button
              type="submit"
              disabled={!input.trim()}
              className="btn btn-primary"
              style={{
                padding: "12px 20px",
                fontSize: 13,
                opacity: input.trim() ? 1 : 0.5,
                cursor: input.trim() ? "pointer" : "not-allowed",
              }}
            >
              <Icon name="arrow" size={14} /> Find match
            </button>
          </div>

          <div
            className="fd-quick-chips"
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginTop: 14,
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: "var(--ink-500)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginRight: 4,
              }}
            >
              Try
            </span>
            {QUICK_CHIPS.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => submit(c.prompt)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 12px",
                  fontSize: 12,
                  fontWeight: 500,
                  border: "1px solid var(--ink-200)",
                  background: "white",
                  color: "var(--ink-700)",
                  borderRadius: 999,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "border-color .15s, color .15s, background .15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-600)";
                  e.currentTarget.style.color = "var(--accent-600)";
                  e.currentTarget.style.background = "var(--accent-50)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--ink-200)";
                  e.currentTarget.style.color = "var(--ink-700)";
                  e.currentTarget.style.background = "white";
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 6,
                    background: "var(--accent-50)",
                    color: "var(--accent-600)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Icon name={c.icon} size={11} />
                </span>
                {c.label}
              </button>
            ))}
          </div>

          {(thinking || route) && (
            <div
              style={{
                marginTop: 20,
                paddingTop: 20,
                borderTop: "1px solid var(--ink-200)",
              }}
            >
              {thinking && (
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    color: "var(--ink-500)",
                    fontSize: 13,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, var(--brand-800), var(--accent-600))",
                      color: "white",
                      fontSize: 12,
                      fontWeight: 600,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    C
                  </div>
                  <span>Lina is matching you to the right specialist…</span>
                  <span style={{ display: "inline-flex", gap: 3 }}>
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "var(--ink-300)",
                          animation: `pulse 1.4s ${i * 0.2}s infinite`,
                          display: "inline-block",
                        }}
                      />
                    ))}
                  </span>
                </div>
              )}

              {route && !thinking && (
                <div
                  style={{
                    display: "grid",
                    gap: 14,
                  }}
                >
                  <div
                    className="fd-route-head"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr auto",
                      gap: 14,
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: "var(--brand-50)",
                        color: "var(--brand-800)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Icon name={route.icon} size={20} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--ink-500)",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          fontWeight: 600,
                          marginBottom: 2,
                        }}
                      >
                        Recommended specialty
                      </div>
                      <div
                        className="serif"
                        style={{
                          fontSize: 22,
                          fontWeight: 500,
                          color: "var(--brand-900)",
                        }}
                      >
                        {route.spec}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={goToResults}
                      className="btn btn-accent"
                      style={{ padding: "12px 20px", fontSize: 13 }}
                    >
                      See all {route.spec} doctors <Icon name="arrow" size={14} />
                    </button>
                  </div>

                  <div
                    style={{
                      padding: "12px 14px",
                      background: "var(--accent-50)",
                      borderRadius: 10,
                      borderLeft: "3px solid var(--accent-600)",
                      fontSize: 13,
                      color: "var(--ink-700)",
                      lineHeight: 1.55,
                    }}
                  >
                    <strong style={{ color: "var(--brand-900)" }}>Why: </strong>
                    {route.reason}
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    {route.doctors.map((d) => (
                      <MiniDoctorCard key={d.name} d={d} />
                    ))}
                  </div>

                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--ink-500)",
                      textAlign: "center",
                      marginTop: 4,
                    }}
                  >
                    Lina isn&apos;t a substitute for emergency care. For emergencies call{" "}
                    <strong>920 022 811</strong> or <strong>997</strong>.
                  </div>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
