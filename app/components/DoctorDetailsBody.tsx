"use client";

import { useMemo, useState } from "react";
import { Icon, StarFill, type IconName } from "./Icon";
import { DOCTOR } from "./DoctorDetailsHero";

const REVIEWS: {
  name: string;
  rating: number;
  when: string;
  procedure: string;
  text: string;
}[] = [
  {
    name: "Ahmed K.",
    rating: 5,
    when: "2 weeks ago",
    procedure: "Angiography",
    text:
      "Dr. Al-Falah took the time to explain every step of the procedure. Her team coordinated everything through the app — medication reminders, follow-up labs, even dietary guidance. Truly exceptional.",
  },
  {
    name: "Mariam F.",
    rating: 5,
    when: "1 month ago",
    procedure: "Consultation",
    text:
      "I came in nervous about chest pain that three other doctors had dismissed. Dr. Haifa listened carefully, ordered the right tests, and caught an early issue. I trust her completely.",
  },
  {
    name: "Yousef B.",
    rating: 4,
    when: "2 months ago",
    procedure: "TAVR",
    text:
      "Complex procedure done smoothly. Recovery was faster than expected. One star off only because scheduling the pre-op appointments was a bit tricky — but the clinical care was top tier.",
  },
];

const TIME_SLOTS: Record<number, string[]> = {
  0: ["09:00", "10:30", "11:15", "14:00", "16:45", "17:30"],
  1: ["09:30", "11:00", "13:15", "15:00", "16:30"],
  2: ["10:00", "11:45", "14:30", "17:00"],
  3: ["09:00", "10:15", "14:00", "15:30", "16:45"],
  4: ["11:00", "13:00", "14:45"],
  5: [],
  6: ["10:30", "14:00", "16:00"],
};

type TabId = "about" | "services" | "education" | "reviews" | "location";

function AboutTab() {
  const stats = [
    { n: String(DOCTOR.exp), l: "Years of practice" },
    { n: DOCTOR.procedures.toLocaleString() + "+", l: "Procedures performed" },
    { n: String(DOCTOR.publications), l: "Peer-reviewed publications" },
    { n: String(DOCTOR.rating), l: `Avg rating · ${DOCTOR.reviews} reviews` },
  ];
  return (
    <>
      <div className="kicker" style={{ marginBottom: 12 }}>
        About the doctor
      </div>
      <h2 className="serif" style={{ fontSize: 28, marginBottom: 20 }}>
        Leading complex cardiac care for 18 years.
      </h2>
      <p style={{ fontSize: 15, marginBottom: 28 }}>{DOCTOR.bio}</p>
      <div
        className="dd-about-stats"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          padding: 24,
          background: "var(--brand-50)",
          borderRadius: 12,
        }}
      >
        {stats.map((s, i) => (
          <div key={i}>
            <div
              className="serif"
              style={{
                fontSize: 32,
                color: "var(--brand-900)",
                fontWeight: 500,
                marginBottom: 4,
              }}
            >
              {s.n}
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-500)", lineHeight: 1.4 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function ServicesTab() {
  return (
    <>
      <div className="kicker" style={{ marginBottom: 12 }}>
        Clinical services
      </div>
      <h2 className="serif" style={{ fontSize: 28, marginBottom: 20 }}>
        Procedures &amp; consultations offered.
      </h2>
      <div className="dd-services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {DOCTOR.services.map((s) => (
          <div
            className="dd-service-card"
            key={s}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              padding: "16px 18px",
              border: "1px solid var(--ink-200)",
              borderRadius: 10,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "var(--accent-50)",
                color: "var(--accent-600)",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="check" size={16} stroke={2.4} />
            </div>
            <span style={{ fontSize: 14, color: "var(--ink-900)", fontWeight: 500 }}>{s}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationTab() {
  return (
    <>
      <div className="kicker" style={{ marginBottom: 12 }}>
        Credentials
      </div>
      <h2 className="serif" style={{ fontSize: 28, marginBottom: 24 }}>
        Training &amp; recognition.
      </h2>
      <div className="dd-education-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div>
          <h4
            style={{
              fontSize: 13,
              color: "var(--ink-700)",
              marginBottom: 16,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Education
          </h4>
          <div style={{ position: "relative", paddingLeft: 20 }}>
            <div
              style={{
                position: "absolute",
                left: 5,
                top: 8,
                bottom: 8,
                width: 1,
                background: "var(--ink-200)",
              }}
            />
            {DOCTOR.education.map((e, i) => (
              <div key={i} style={{ position: "relative", paddingBottom: 20 }}>
                <div
                  style={{
                    position: "absolute",
                    left: -20,
                    top: 6,
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    background: "var(--brand-800)",
                    border: "2px solid white",
                    boxShadow: "0 0 0 1px var(--ink-200)",
                  }}
                />
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--accent-600)",
                    fontWeight: 600,
                    marginBottom: 2,
                  }}
                >
                  {e.year}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--brand-900)",
                    marginBottom: 2,
                  }}
                >
                  {e.school}
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-500)" }}>{e.degree}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4
            style={{
              fontSize: 13,
              color: "var(--ink-700)",
              marginBottom: 16,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Awards &amp; Recognition
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {DOCTOR.awards.map((a, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 14,
                  alignItems: "start",
                  padding: 14,
                  border: "1px solid var(--ink-200)",
                  borderRadius: 10,
                  background: "var(--ink-50)",
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
                  <Icon name="star" size={16} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--ink-500)", fontWeight: 600, marginBottom: 2 }}>
                    {a.year}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--brand-900)",
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    {a.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function ReviewsTab() {
  return (
    <>
      <div className="between dd-reviews-head" style={{ marginBottom: 24 }}>
        <div>
          <div className="kicker" style={{ marginBottom: 12 }}>
            Patient reviews
          </div>
          <h2 className="serif" style={{ fontSize: 28 }}>
            Verified by Google.
          </h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            className="flex"
            style={{ gap: 8, justifyContent: "flex-end", alignItems: "baseline" }}
          >
            <span
              className="serif"
              style={{ fontSize: 44, color: "var(--brand-900)", fontWeight: 500 }}
            >
              {DOCTOR.rating}
            </span>
            <div style={{ textAlign: "left" }}>
              <div className="flex" style={{ gap: 2 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarFill key={i} />
                ))}
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-500)", marginTop: 2 }}>
                {DOCTOR.reviews} reviews
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dd-review-list" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {REVIEWS.map((r, i) => (
          <div
            className="dd-review-card"
            key={i}
            style={{
              padding: 20,
              border: "1px solid var(--ink-200)",
              borderRadius: 12,
            }}
          >
            <div className="between" style={{ marginBottom: 12 }}>
              <div className="flex" style={{ gap: 12, alignItems: "center" }}>
                <div
                  className="ph ph-accent"
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                >
                  <span className="ph-label" style={{ fontSize: 10, padding: "2px 6px" }}>
                    {r.name[0]}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-900)" }}>
                    {r.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ink-500)" }}>
                    {r.procedure} · {r.when}
                  </div>
                </div>
              </div>
              <div className="flex" style={{ gap: 2 }}>
                {Array.from({ length: r.rating }).map((_, j) => (
                  <StarFill key={j} size={13} />
                ))}
              </div>
            </div>
            <p style={{ fontSize: 14 }}>&ldquo;{r.text}&rdquo;</p>
          </div>
        ))}
      </div>
    </>
  );
}

function LocationTab() {
  const cells: { icon: IconName; l: string; v: string }[] = [
    { icon: "pin", l: "Address", v: "King Fahd Road, Olaya District, Riyadh 12333" },
    { icon: "phone", l: "Clinic", v: "+966 11 XXX XXXX" },
    { icon: "clock", l: "Hours", v: "Sun–Thu · 8:00 – 22:00" },
  ];
  return (
    <>
      <div className="kicker" style={{ marginBottom: 12 }}>
        Practice location
      </div>
      <h2 className="serif" style={{ fontSize: 28, marginBottom: 24 }}>
        {DOCTOR.branch}
      </h2>
      <div
        className="dd-location-map"
        style={{
          position: "relative",
          height: 360,
          borderRadius: 14,
          overflow: "hidden",
          background: "var(--brand-50)",
          marginBottom: 20,
        }}
      >
        <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%", opacity: 0.5 }}>
          <defs>
            <pattern id="dd-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,56,104,0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#dd-grid)" />
          <path
            d="M 40 150 Q 120 100 200 180 T 380 250"
            stroke="rgba(0,56,104,0.2)"
            strokeWidth="3"
            fill="none"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            left: "45%",
            top: "45%",
            transform: "translate(-50%, -100%)",
          }}
        >
          <div
            style={{
              background: "var(--brand-800)",
              color: "white",
              padding: "8px 14px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              boxShadow: "0 8px 24px rgba(0,31,61,0.3)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Icon name="plus" size={12} stroke={3} /> {DOCTOR.branch}
          </div>
        </div>
      </div>
      <div className="dd-location-cells" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {cells.map((c) => (
          <div
            className="dd-location-cell"
            key={c.l}
            style={{
              padding: 16,
              border: "1px solid var(--ink-200)",
              borderRadius: 10,
            }}
          >
            <div
              className="flex"
              style={{
                gap: 8,
                alignItems: "center",
                marginBottom: 6,
                color: "var(--brand-800)",
              }}
            >
              <Icon name={c.icon} size={14} />
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {c.l}
              </span>
            </div>
            <div
              style={{
                fontSize: 14,
                color: "var(--brand-900)",
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              {c.v}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function DoctorDetailsTabs() {
  const [tab, setTab] = useState<TabId>("about");
  const tabs: { id: TabId; label: string }[] = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "education", label: "Education & Credentials" },
    { id: "reviews", label: `Reviews (${REVIEWS.length})` },
    { id: "location", label: "Location" },
  ];
  return (
    <div className="dd-tabs">
      <div
        className="dd-tab-list"
        style={{
          background: "white",
          borderRadius: "var(--card-radius)",
          border: "1px solid var(--ink-200)",
          display: "flex",
          gap: 4,
          padding: 6,
          marginBottom: 20,
          overflow: "auto",
        }}
      >
        {tabs.map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            style={{
              padding: "10px 18px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
              background: tab === tb.id ? "var(--brand-800)" : "transparent",
              color: tab === tb.id ? "white" : "var(--ink-700)",
            }}
          >
            {tb.label}
          </button>
        ))}
      </div>
      <div className="card dd-tab-card" style={{ padding: 32 }}>
        {tab === "about" && <AboutTab />}
        {tab === "services" && <ServicesTab />}
        {tab === "education" && <EducationTab />}
        {tab === "reviews" && <ReviewsTab />}
        {tab === "location" && <LocationTab />}
      </div>
    </div>
  );
}

type Day = { label: string; date: number; month: string; key: number };

function BookingPanel() {
  const days = useMemo<Day[]>(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      return {
        label:
          i === 0
            ? "Today"
            : i === 1
              ? "Tomorrow"
              : d.toLocaleDateString("en", { weekday: "short" }),
        date: d.getDate(),
        month: d.toLocaleDateString("en", { month: "short" }),
        key: i,
      };
    });
  }, []);
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [type, setType] = useState<"in-person" | "video">("in-person");

  const slots = TIME_SLOTS[dayIdx] ?? [];
  const currentLabel = days[dayIdx]?.label ?? "Today";

  return (
    <div
      id="booking"
      className="dd-booking-panel"
      style={{
        background: "white",
        borderRadius: "var(--card-radius)",
        border: "1px solid var(--ink-200)",
        padding: 24,
        position: "sticky",
        top: 100,
        scrollMarginTop: 120,
      }}
    >
      <div className="dd-booking-head">
        <div className="dd-booking-avatar" aria-hidden="true">
          <Icon name="calendar" size={18} />
        </div>
        <div className="dd-booking-copy">
          <div className="dd-booking-eyebrow">Book with</div>
          <div
            className="serif dd-booking-doctor"
            style={{ fontSize: 20, fontWeight: 500, color: "var(--brand-900)", marginBottom: 4 }}
          >
            {DOCTOR.name}
          </div>
          <div className="dd-booking-fee" style={{ fontSize: 12, color: "var(--ink-500)", marginBottom: 16 }}>
            Consultation fee:{" "}
            <strong style={{ color: "var(--brand-900)" }}>SAR {DOCTOR.fee}</strong>
            <span style={{ color: "var(--accent-600)" }}> · Insurance accepted</span>
          </div>
        </div>
      </div>

      <div
        className="dd-booking-type"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 4,
          padding: 4,
          background: "var(--ink-50)",
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        {(
          [
            { id: "in-person" as const, icon: "pin" as IconName, l: "In-person" },
            { id: "video" as const, icon: "video" as IconName, l: "Video" },
          ]
        ).map((o) => {
          const active = type === o.id;
          return (
            <button
              key={o.id}
              onClick={() => setType(o.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "10px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                background: active ? "white" : "transparent",
                color: active ? "var(--brand-900)" : "var(--ink-500)",
                boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              }}
            >
              <Icon name={o.icon} size={14} /> {o.l}
            </button>
          );
        })}
      </div>

      <div
        className="dd-booking-section-label"
        style={{
          fontSize: 11,
          color: "var(--ink-500)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        Select date
      </div>
      <div className="dd-carousel-shell">
        <div
          className="dd-date-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 4,
            marginBottom: 20,
          }}
        >
          {days
            ? days.map((d) => {
                const has = (TIME_SLOTS[d.key] ?? []).length > 0;
                const active = dayIdx === d.key;
                return (
                  <button
                    className="dd-date-card"
                    key={d.key}
                    onClick={() => {
                      setDayIdx(d.key);
                      setSlot(null);
                    }}
                    disabled={!has}
                    style={{
                      padding: "10px 4px",
                      borderRadius: 8,
                      border: `1px solid ${active ? "var(--brand-800)" : "var(--ink-200)"}`,
                      background: active
                        ? "var(--brand-800)"
                        : has
                          ? "white"
                          : "var(--ink-50)",
                      color: active
                        ? "white"
                        : has
                          ? "var(--ink-900)"
                          : "var(--ink-400)",
                      cursor: has ? "pointer" : "not-allowed",
                      fontFamily: "inherit",
                      textAlign: "center",
                      opacity: has ? 1 : 0.5,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        opacity: 0.7,
                        marginBottom: 2,
                      }}
                    >
                      {d.label.slice(0, 3)}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>{d.date}</div>
                    <div style={{ fontSize: 9, opacity: 0.6, marginTop: 2 }}>{d.month}</div>
                  </button>
                );
              })
            : Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="dd-date-card"
                  style={{
                    padding: "10px 4px",
                    borderRadius: 8,
                    border: "1px solid var(--ink-200)",
                    background: "var(--ink-50)",
                    height: 58,
                  }}
                />
              ))}
        </div>
      </div>

      <div
        className="dd-booking-section-label"
        style={{
          fontSize: 11,
          color: "var(--ink-500)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        Available times · {currentLabel}
      </div>
      {slots.length === 0 ? (
        <div style={{ padding: "20px 0", textAlign: "center", fontSize: 13, color: "var(--ink-500)" }}>
          No availability on this day
        </div>
      ) : (
        <div className="dd-carousel-shell">
          <div
            className="dd-slot-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 6,
              marginBottom: 20,
            }}
          >
            {slots.map((s) => {
              const active = slot === s;
              return (
                <button
                  className="dd-slot-card"
                  key={s}
                  onClick={() => setSlot(s)}
                  style={{
                    padding: "10px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    border: `1px solid ${active ? "var(--accent-600)" : "var(--ink-200)"}`,
                    background: active ? "var(--accent-600)" : "white",
                    color: active ? "white" : "var(--ink-700)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        disabled={!slot}
        className="btn btn-primary"
        style={{
          width: "100%",
          padding: "14px",
          opacity: slot ? 1 : 0.5,
          cursor: slot ? "pointer" : "not-allowed",
        }}
      >
        {slot ? `Confirm ${currentLabel}, ${slot}` : "Select a time slot"}
        {slot && <Icon name="arrow" size={14} />}
      </button>
      <div style={{ fontSize: 11, color: "var(--ink-500)", textAlign: "center", marginTop: 12 }}>
        Free cancellation up to 4 hours before
      </div>
    </div>
  );
}

function InsurancePanel() {
  return (
    <div
      className="dd-insurance-panel"
      style={{
        background: "var(--ink-50)",
        borderRadius: 14,
        padding: 20,
        border: "1px solid var(--ink-200)",
      }}
    >
      <div className="dd-insurance-head flex" style={{ gap: 10, alignItems: "center", marginBottom: 14 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "var(--brand-50)",
            color: "var(--brand-800)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Icon name="shield" size={16} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-900)" }}>
            Accepted insurance
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-500)" }}>
            {DOCTOR.insurance.length} major insurers covered
          </div>
        </div>
      </div>
      <div className="dd-carousel-shell dd-insurance-carousel">
        <div className="dd-insurance-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 6 }}>
        {DOCTOR.insurance.map((i) => (
          <div
            className="dd-insurance-card"
            key={i}
            style={{
              padding: "8px 10px",
              background: "white",
              borderRadius: 6,
              fontSize: 12,
              color: "var(--ink-700)",
              border: "1px solid var(--ink-200)",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {i}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export function DoctorDetailsBody() {
  return (
    <section className="dd-body-section" style={{ background: "var(--ink-50)", paddingTop: 40, paddingBottom: 80 }}>
      <div
        className="container dd-body-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div className="dd-main-column" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <DoctorDetailsTabs />
        </div>
        <div className="dd-side-column" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <BookingPanel />
          <InsurancePanel />
        </div>
      </div>
    </section>
  );
}

export { REVIEWS };
