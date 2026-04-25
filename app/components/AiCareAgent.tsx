"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, StarFill, type IconName } from "./Icon";
import { useT } from "./I18nProvider";

type Message = { role: "agent" | "user"; text: string };
type Rec = {
  name: string;
  spec: string;
  rating: number;
  reviews: number;
  exp: number;
  branch: string;
  why: string;
  img: string;
  href?: string;
};

const QUICK_PROMPTS: { icon: IconName; t: string }[] = [
  { icon: "heart", t: "Chest pain when climbing stairs" },
  { icon: "baby", t: "My 4-year-old has a fever" },
  { icon: "brain", t: "Ongoing migraines for 2 weeks" },
  { icon: "bone", t: "Lower back pain after lifting" },
  { icon: "skin", t: "Persistent skin rash" },
  { icon: "stethoscope", t: "Second opinion on blood test" },
];

const DOC_RECS: Record<"heart" | "default", Rec[]> = {
  heart: [
    {
      name: "Dr. Haifa Al-Falah",
      spec: "Interventional Cardiology",
      rating: 4.9,
      reviews: 284,
      exp: 18,
      branch: "Olaya",
      img: "/doctors/haifa-alfalah.webp",
      why:
        "Leads our Structural Heart Program. 4,200+ cardiac procedures and expertise in complex coronary disease — strong match for chest-pain workup.",
    },
    {
      name: "Dr. Turki Al-Ahmadi",
      spec: "Electrophysiology",
      rating: 4.7,
      reviews: 156,
      exp: 14,
      branch: "Olaya",
      img: "/doctors/turki-alahmadi.webp",
      why:
        "Rhythm & arrhythmia specialist. Recommended if your chest discomfort is accompanied by palpitations.",
    },
    {
      name: "Dr. Sarah Dahlan",
      spec: "Preventive Cardiology",
      rating: 4.9,
      reviews: 321,
      exp: 12,
      branch: "Granada",
      img: "/doctors/sarah-dahlan.webp",
      why:
        "Runs the women's-heart & risk-stratification clinic. Good for a preventive assessment and lipid review.",
    },
  ],
  default: [
    {
      name: "Dr. Omar Ashour",
      spec: "Internal Medicine",
      rating: 4.8,
      reviews: 212,
      exp: 16,
      branch: "Olaya",
      img: "/doctors/omar-ashour.webp",
      why:
        "Best starting point — performs a full workup and refers to the right subspecialist if needed.",
    },
    {
      name: "Dr. Fotoun Abu Al-Faraj",
      spec: "Family Medicine",
      rating: 4.8,
      reviews: 142,
      exp: 15,
      branch: "Granada",
      img: "/doctors/fotoun-abualfaraj.webp",
      why: "Comprehensive primary care with same-week availability.",
    },
  ],
};

function pickCategory(text: string): "heart" | "default" {
  return /(chest|heart|cardio|palpit|angina|pressure)/i.test(text) ? "heart" : "default";
}

function agentReply(cat: "heart" | "default") {
  if (cat === "heart") {
    return "Based on what you've described, cardiology is the right starting point. A cardiologist will review your symptoms, order an ECG and basic bloods, and decide whether further imaging is needed. Here are three strong matches — ranked by fit and availability:";
  }
  return "Thanks — based on that, I'd start with internal medicine for a full assessment. They can investigate and refer you to a subspecialist if needed. Here are two good matches:";
}

export function AiCareAgent() {
  const { lang } = useT();
  const name = lang === "ar" ? "لينا" : "Lina";
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      text:
        "Hi — I'm Lina, your MyClinic care navigator. Tell me what's bothering you, or ask a health question, and I'll match you with the right specialist.",
    },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [recs, setRecs] = useState<Rec[] | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking, recs]);

  const send = (textArg?: string) => {
    const text = (textArg ?? input).trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setThinking(true);
    setRecs(null);
    setTimeout(() => {
      const cat = pickCategory(text);
      setThinking(false);
      setMessages((m) => [...m, { role: "agent", text: agentReply(cat) }]);
      setRecs(DOC_RECS[cat]);
    }, 1100);
  };

  const showInlinePrompts = messages.length <= 1 && !thinking && !recs;

  return (
    <section className="mc-ai-section" style={{ background: "white", paddingTop: 0, paddingBottom: 80 }}>
      <div className="container">
        <div className="mc-ai-intro" style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            className="flex"
            style={{ gap: 8, justifyContent: "center", alignItems: "center", marginBottom: 14 }}
          >
            <span className="kicker" style={{ color: "var(--accent-600)" }}>
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
            </span>
          </div>
          <h3 className="serif mc-ai-heading" style={{ fontSize: 34, color: "var(--brand-900)", marginBottom: 8 }}>
            Not sure which doctor?{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent-600)" }}>Ask {name}.</span>
          </h3>
          <p className="mc-ai-sub" style={{ color: "var(--ink-500)", fontSize: 15, maxWidth: 580, margin: "0 auto" }}>
            Describe your symptoms in your own words — or press the mic and speak. {name} recommends specialists and explains why.
          </p>
        </div>

        <div
          className="card mc-ai-card"
          style={{
            padding: 0,
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            minHeight: 480,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", background: "var(--ink-50)" }}>
            <div
              className="mc-ai-header"
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--ink-200)",
                background: "white",
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--brand-800), var(--accent-600))",
                  display: "grid",
                  placeItems: "center",
                  color: "white",
                  fontWeight: 600,
                  fontSize: 15,
                  position: "relative",
                }}
              >
                L
                <span
                  className="mc-ai-status-dot"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    background: "#10b981",
                    border: "2px solid white",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className="mc-ai-header-copy" style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-900)" }}>
                  {name} · AI Care Navigator
                </div>
                <div style={{ fontSize: 11, color: "var(--ink-500)" }}>
                  Powered by MyClinic · Typical reply in seconds
                </div>
              </div>
              <button
                className="mc-ai-human-btn"
                aria-label="Talk to a human"
                style={{
                  padding: "8px 12px",
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 8,
                  border: "1px solid var(--ink-200)",
                  background: "white",
                  color: "var(--brand-900)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Icon name="phone" size={12} />
                <span className="mc-ai-human-label">Talk to a human</span>
              </button>
            </div>

            <div
              ref={scrollRef}
              className="mc-ai-messages"
              style={{
                flex: 1,
                padding: 20,
                overflowY: "auto",
                maxHeight: 380,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {m.role === "agent" && (
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
                        flexShrink: 0,
                      }}
                    >
                      L
                    </div>
                  )}
                  <div
                    className="mc-ai-message"
                    style={{
                      maxWidth: "76%",
                      padding: "10px 14px",
                      borderRadius: 14,
                      background: m.role === "user" ? "var(--brand-800)" : "white",
                      color: m.role === "user" ? "white" : "var(--ink-900)",
                      border: m.role === "user" ? "none" : "1px solid var(--ink-200)",
                      fontSize: 14,
                      lineHeight: 1.5,
                      borderBottomRightRadius: m.role === "user" ? 4 : 14,
                      borderBottomLeftRadius: m.role === "agent" ? 4 : 14,
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {thinking && (
                <div style={{ display: "flex", gap: 10 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--brand-800), var(--accent-600))",
                      color: "white",
                      fontSize: 12,
                      fontWeight: 600,
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    L
                  </div>
                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: 14,
                      background: "white",
                      border: "1px solid var(--ink-200)",
                      display: "flex",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--ink-300)",
                          animation: `pulse 1.4s ${i * 0.2}s infinite`,
                          display: "inline-block",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {recs && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {recs.map((d, i) => (
                    <a
                      className="mc-ai-rec-card"
                      key={d.name}
                      href={d.href || "#"}
                      style={{
                        background: "white",
                        borderRadius: 14,
                        padding: 14,
                        border: "1px solid var(--ink-200)",
                        textDecoration: "none",
                        color: "inherit",
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        gap: 12,
                        alignItems: "start",
                        position: "relative",
                      }}
                    >
                      {i === 0 && (
                        <span
                          style={{
                            position: "absolute",
                            top: -8,
                            right: 12,
                            background: "var(--accent-600)",
                            color: "white",
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            padding: "2px 8px",
                            borderRadius: 4,
                          }}
                        >
                          Best match
                        </span>
                      )}
                      <img
                        src={d.img}
                        alt={d.name}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-900)" }}>
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
                          {d.spec}
                        </div>
                        <div
                          className="flex"
                          style={{
                            gap: 10,
                            fontSize: 11,
                            color: "var(--ink-500)",
                            marginBottom: 6,
                            alignItems: "center",
                          }}
                        >
                          <span className="flex" style={{ gap: 3, alignItems: "center" }}>
                            <StarFill size={10} />
                            <strong style={{ color: "var(--brand-900)" }}>{d.rating}</strong> ({d.reviews})
                          </span>
                          <span>·</span>
                          <span>{d.exp}y exp</span>
                          <span>·</span>
                          <span>{d.branch}</span>
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--ink-700)",
                            lineHeight: 1.5,
                            padding: "8px 10px",
                            background: "var(--brand-50)",
                            borderRadius: 8,
                            borderLeft: "3px solid var(--accent-600)",
                          }}
                        >
                          <strong style={{ color: "var(--brand-900)" }}>Why:</strong> {d.why}
                        </div>
                      </div>
                      <span
                        style={{
                          padding: "8px 10px",
                          borderRadius: 8,
                          background: "var(--brand-800)",
                          color: "white",
                          fontSize: 11,
                          fontWeight: 600,
                          alignSelf: "center",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Book <Icon name="arrow" size={10} />
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {showInlinePrompts && (
              <div className="mc-ai-prompts-mobile" aria-label="Quick prompts">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p.t}
                    onClick={() => send(p.t)}
                    className="mc-ai-prompt-pill"
                    type="button"
                  >
                    <Icon name={p.icon} size={12} />
                    {p.t}
                  </button>
                ))}
              </div>
            )}

            <div
              className="mc-ai-composer"
              style={{
                padding: "12px 16px",
                background: "white",
                borderTop: "1px solid var(--ink-200)",
              }}
            >
              <div
                className="mc-ai-input-shell"
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  background: "var(--ink-50)",
                  border: "1px solid var(--ink-200)",
                  borderRadius: 12,
                  padding: "8px 10px",
                }}
              >
                <button
                  onClick={() => setListening((l) => !l)}
                  title="Voice input"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    background: listening ? "#ef4444" : "var(--accent-600)",
                    color: "white",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    animation: listening ? "pulse 1.2s infinite" : "none",
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
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder={
                    listening ? "Listening…" : "Describe symptoms or ask a question…"
                  }
                  style={{
                    flex: 1,
                    border: "none",
                    background: "transparent",
                    outline: "none",
                    fontSize: 14,
                    fontFamily: "inherit",
                    color: "var(--ink-900)",
                    padding: "4px 0",
                  }}
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim()}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: "none",
                    cursor: input.trim() ? "pointer" : "not-allowed",
                    background: input.trim() ? "var(--brand-800)" : "var(--ink-200)",
                    color: "white",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
              <div
                className="mc-ai-disclaimer"
                style={{
                  fontSize: 10,
                  color: "var(--ink-500)",
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                {name} isn&apos;t a substitute for emergency care. Call{" "}
                <strong>920 022 811</strong> or <strong>997</strong> for emergencies.
              </div>
            </div>
          </div>

          <div
            className="mc-ai-side"
            style={{
              padding: 28,
              background: "white",
              display: "flex",
              flexDirection: "column",
              gap: 22,
              borderLeft: "1px solid var(--ink-200)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--ink-700)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                Try asking
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p.t}
                    onClick={() => send(p.t)}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      width: "100%",
                      padding: "11px 12px",
                      borderRadius: 10,
                      border: "1px solid var(--ink-200)",
                      background: "white",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                      fontSize: 13,
                      color: "var(--ink-900)",
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: "var(--accent-50)",
                        color: "var(--accent-600)",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon name={p.icon} size={14} />
                    </span>
                    {p.t}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: 18,
                background: "var(--brand-900)",
                borderRadius: 14,
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
                  background:
                    "radial-gradient(ellipse at 80% 20%, rgba(47,181,164,0.22), transparent 55%)",
                }}
              />
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--accent-400)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: 10,
                  }}
                >
                  Prefer to talk?
                </div>
                <div
                  className="serif"
                  style={{ fontSize: 18, fontWeight: 500, marginBottom: 8, lineHeight: 1.3 }}
                >
                  Speak to a human care navigator.
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.7)",
                    marginBottom: 14,
                  }}
                >
                  Free. Medically trained. Callback within 2 hours.
                </div>
                <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
                  <a
                    href="tel:920022811"
                    className="btn btn-accent"
                    style={{ padding: "10px", fontSize: 13, justifyContent: "center" }}
                  >
                    <Icon name="phone" size={13} /> Call 920 022 811
                  </a>
                  <a
                    href="#"
                    style={{
                      padding: "10px",
                      fontSize: 13,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.1)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.18)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    Request a callback
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
