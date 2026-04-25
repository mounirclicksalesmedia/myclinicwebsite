"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ClinicBackground } from "./ClinicBackground";
import { Icon, type IconName } from "./Icon";
import { Placeholder, SectionHeader } from "./ui";

type SubService = { t: string; d: string };
type Service = {
  id: "physio" | "physician" | "nursing";
  icon: IconName;
  name: string;
  short: string;
  desc: string;
  subServices: SubService[];
};

const HHC_SERVICES: Service[] = [
  {
    id: "physio",
    icon: "bone",
    name: "Physiotherapy",
    short: "Licensed physiotherapists deliver tailored treatment in your home.",
    desc:
      "Home physiotherapy is a service where licensed physiotherapists provide personalized treatment to patients in the comfort of their own homes. This approach is especially beneficial for individuals who have difficulty traveling to a clinic due to mobility issues, chronic conditions, or post-surgical recovery.",
    subServices: [
      { t: "Geriatric Physiotherapy", d: "Mobility, fall prevention and balance for older adults." },
      { t: "Neurological Physiotherapy", d: "Post-stroke, Parkinson's and neurological rehab." },
      { t: "Orthopedic Physiotherapy", d: "Joint, muscle and bone rehabilitation." },
      { t: "Pediatric Physiotherapy", d: "Developmental delays and pediatric mobility." },
      { t: "Post-Operative Physiotherapy", d: "Recovery plans after orthopedic surgery." },
      { t: "Sports Physiotherapy", d: "Injury recovery and return-to-sport programs." },
    ],
  },
  {
    id: "physician",
    icon: "stethoscope",
    name: "Physician Assessment",
    short: "Doctor visits at home with full workup and care plan.",
    desc:
      "Home physician assessment involves a licensed doctor visiting patients in their home to provide comprehensive medical evaluation and care. Patients receive medical care in a familiar and comfortable environment and we develop a customized treatment plan based on the individual patient's needs.",
    subServices: [
      { t: "GP Assessments", d: "General practitioner visit & primary care evaluation." },
      { t: "Specialist Evaluation", d: "Board-certified specialist consultations at home." },
      { t: "Senior Specialist", d: "In-depth review by senior clinicians." },
      { t: "Consultant Evaluation", d: "Complex case review by consultants." },
      { t: "Post-Acute Care Program", d: "Structured follow-up after hospital discharge." },
      { t: "Population Health Management", d: "Chronic-disease coordination and follow-up." },
    ],
  },
  {
    id: "nursing",
    icon: "syringe",
    name: "Nursing Care",
    short: "Professional nurses for medical and personal care at home.",
    desc:
      "Nursing care at home involves professional nurses providing a range of medical and personal care services to patients in the comfort of their own homes. This service is especially beneficial for individuals who require ongoing medical attention but prefer to stay in their familiar environment — the elderly, those recovering from surgery, or patients with chronic illnesses.",
    subServices: [
      { t: "Vital Signs Monitoring", d: "Blood pressure, oxygen, glucose & ECG tracking." },
      { t: "Laboratory Test Extraction", d: "Blood, urine and sample collection at home." },
      { t: "Immunization Injections", d: "Vaccinations and scheduled injections." },
      { t: "IV Fluids", d: "Hydration and medication via IV under supervision." },
      { t: "Wound Care", d: "Dressing changes, post-op wound management." },
      { t: "ECG at Home", d: "12-lead ECG performed and reviewed remotely." },
      { t: "Retinal Imaging", d: "Diabetic retinopathy screening at home." },
      { t: "Vascular Doppler", d: "Peripheral vascular assessment." },
    ],
  },
];

const HHC_STEPS: { n: string; icon: IconName; t: string; d: string }[] = [
  { n: "01", icon: "phone", t: "Request a visit", d: "Use the app, website, or call hotline 920 022 811." },
  { n: "02", icon: "stethoscope", t: "Care plan match", d: "We pair you with the right clinician based on your needs." },
  { n: "03", icon: "home", t: "In-home service", d: "Your clinician arrives on schedule with all required equipment." },
  { n: "04", icon: "check", t: "Follow-up & records", d: "Notes, results and next steps available instantly in the app." },
];

const HHC_AREAS = [
  "Riyadh",
  "Jeddah",
  "Dammam",
  "Makkah",
  "Madinah",
  "Khobar",
  "Taif",
  "Tabuk",
  "Abha",
  "Buraydah",
];

function HHCHero() {
  return (
    <section
      className="hhc-hero"
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
            "radial-gradient(ellipse at 80% 20%, rgba(47,181,164,0.22), transparent 55%)",
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
          <span style={{ color: "white" }}>Home Healthcare</span>
        </div>

        <div
          className="hhc-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div className="hhc-coverage-copy">
            <div className="kicker" style={{ color: "var(--accent-400)", marginBottom: 16 }}>
              Home Healthcare
            </div>
            <h1
              className="serif"
              style={{
                color: "white",
                marginBottom: 22,
                fontSize: "clamp(44px, 5vw, 68px)",
              }}
            >
              Hospital-grade care,
              <br />
              <span style={{ color: "var(--accent-400)", fontStyle: "italic" }}>
                at your door.
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
              Licensed physiotherapists, physicians and nurses — scheduled when you need them, tracked through our app. Covered by most insurers.
            </p>
            <div className="flex" style={{ gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
              <a href="#request" className="btn btn-accent hhc-hero-cta" style={{ padding: "16px 28px", fontSize: 15 }}>
                <Icon name="home" size={16} /> Request a visit
              </a>
              <a
                href="#services"
                className="btn hhc-hero-cta"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "16px 28px",
                  fontSize: 15,
                }}
              >
                Explore services
              </a>
            </div>
            <div
              className="flex"
              style={{
                gap: 24,
                flexWrap: "wrap",
                fontSize: 12,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              <span className="flex" style={{ gap: 6, alignItems: "center" }}>
                <Icon name="shield" size={14} /> MOH-licensed clinicians
              </span>
              <span className="flex" style={{ gap: 6, alignItems: "center" }}>
                <Icon name="clock" size={14} /> 7 days a week
              </span>
              <span className="flex" style={{ gap: 6, alignItems: "center" }}>
                <Icon name="pin" size={14} /> 10 cities across KSA
              </span>
            </div>
          </div>
          <div
            className="hhc-hero-media"
            style={{
              position: "relative",
              height: 480,
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Image
              src="/myclinic-house.png"
              alt="Home healthcare visit"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div
          className="hhc-stats"
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            padding: "28px 0",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {[
            { n: "45k+", l: "Home visits / year" },
            { n: "200+", l: "Licensed clinicians" },
            { n: "< 2h", l: "Urgent response" },
            { n: "4.9", l: "Patient rating" },
          ].map((s, i) => (
            <div
              key={i}
              className="hhc-stat"
              style={{
                textAlign: "center",
                borderInlineEnd: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
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

function HHCHowItWorks() {
  return (
    <section className="section" style={{ background: "white" }}>
      <div className="container">
        <SectionHeader
          kicker="How it works"
          title="Book a home visit in 4 steps."
          body="From request to care plan, we handle the coordination so you can focus on recovery."
        />
        <div
          className="hhc-steps-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
          }}
        >
          {HHC_STEPS.map((s, i) => (
            <div
              key={s.n}
              className="hhc-step-card"
              style={{
                padding: 28,
                background: i % 2 === 0 ? "white" : "var(--ink-50)",
                borderInlineStart: i === 0 ? "1px solid var(--ink-200)" : "none",
                borderInlineEnd: "1px solid var(--ink-200)",
                borderTop: "1px solid var(--ink-200)",
                borderBottom: "1px solid var(--ink-200)",
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

function HHCServices() {
  const [active, setActive] = useState<Service["id"]>(HHC_SERVICES[0].id);
  const svc = HHC_SERVICES.find((s) => s.id === active) ?? HHC_SERVICES[0];

  return (
    <section id="services" className="section" style={{ background: "var(--ink-50)" }}>
      <div className="container">
        <SectionHeader
          kicker="Our services"
          title="Three pillars of care. One trusted provider."
          body="Each service is delivered by licensed professionals with hospital-grade equipment and oversight."
        />
        <div
          className="hhc-service-tabs"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            marginBottom: 32,
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid var(--ink-200)",
            background: "white",
          }}
        >
          {HHC_SERVICES.map((s, i) => {
            const on = active === s.id;
            return (
              <button
                key={s.id}
                className="hhc-service-tab"
                onClick={() => setActive(s.id)}
                style={{
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: on ? "var(--brand-800)" : "white",
                  color: on ? "white" : "var(--brand-900)",
                  border: "none",
                  borderInlineEnd: i < HHC_SERVICES.length - 1 ? "1px solid var(--ink-200)" : "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textAlign: "start",
                  transition: "background .2s, color .2s",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: on ? "rgba(255,255,255,0.15)" : "var(--accent-50)",
                    color: on ? "var(--accent-400)" : "var(--accent-600)",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon name={s.icon} size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{s.name}</div>
                  <div
                    style={{
                      fontSize: 12,
                      color: on ? "rgba(255,255,255,0.7)" : "var(--ink-500)",
                    }}
                  >
                    {s.short}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="card hhc-service-card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="hhc-service-detail" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr" }}>
            {svc.id === "physio" ? (
              <div
                className="hhc-service-media"
                style={{
                  position: "relative",
                  minHeight: 480,
                  borderInlineEnd: "1px solid var(--ink-200)",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/therapie.png"
                  alt={`${svc.name} at home`}
                  fill
                  sizes="(max-width: 900px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : (
              <Placeholder
                accent
                className="hhc-service-media"
                label={`${svc.name} at home`}
                style={{
                  minHeight: 480,
                  borderRadius: 0,
                  borderInlineEnd: "1px solid var(--ink-200)",
                }}
              />
            )}
            <div className="hhc-service-copy" style={{ padding: 40 }}>
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
                <Icon name={svc.icon} size={22} />
              </div>
              <div className="kicker" style={{ marginBottom: 10 }}>
                Service
              </div>
              <h3 className="serif" style={{ fontSize: 30, marginBottom: 14 }}>
                {svc.name}
              </h3>
              <p style={{ fontSize: 14, marginBottom: 24 }}>{svc.desc}</p>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--ink-700)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 14,
                }}
              >
                What&apos;s included
              </div>
              <div
                className="hhc-subservices-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                {svc.subServices.map((ss) => (
                  <div
                    key={ss.t}
                    className="hhc-subservice-card"
                    style={{
                      padding: "14px 16px",
                      border: "1px solid var(--ink-200)",
                      borderRadius: 10,
                      background: "var(--ink-50)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--brand-900)",
                        marginBottom: 4,
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "var(--accent-600)", display: "inline-flex" }}>
                        <Icon name="check" size={13} stroke={2.5} />
                      </span>
                      {ss.t}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ink-500)", lineHeight: 1.4 }}>
                      {ss.d}
                    </div>
                  </div>
                ))}
              </div>
              <a href="#request" className="btn btn-primary" style={{ marginTop: 24 }}>
                Request this service <Icon name="arrow" size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type HHCBranch = {
  name: string;
  district: string;
  city: "Jeddah" | "Riyadh";
  lng: number;
  lat: number;
  big?: boolean;
};

const HHC_BRANCHES: HHCBranch[] = [
  { name: "Jeddah Al Mohammadiyah", district: "Al Mohammadiyah", city: "Jeddah", lng: 39.1680, lat: 21.5900 },
  { name: "Jeddah Al Safa", district: "Al Safa", city: "Jeddah", lng: 39.1800, lat: 21.5360 },
  { name: "Jeddah Al Khalidiyyah", district: "Al Khalidiyyah", city: "Jeddah", lng: 39.1420, lat: 21.5840 },
  { name: "Dental Center", district: "Specialized Dental Center", city: "Jeddah", lng: 39.1720, lat: 21.5450 },
  { name: "Riyadh Al Sahafa", district: "Al Sahafa", city: "Riyadh", lng: 46.6500, lat: 24.8010, big: true },
  { name: "Jeddah Tahlia", district: "Tahlia", city: "Jeddah", lng: 39.1695, lat: 21.5640, big: true },
  { name: "Jeddah Obhour", district: "Obhour", city: "Jeddah", lng: 39.0910, lat: 21.7600 },
];

function forceEnglishLabels(map: maplibregl.Map) {
  const layers = map.getStyle()?.layers;
  if (!layers) return;
  for (const layer of layers) {
    if (layer.type !== "symbol") continue;
    try {
      const current = map.getLayoutProperty(layer.id, "text-field");
      if (current === undefined || current === null) continue;
      map.setLayoutProperty(layer.id, "text-field", [
        "coalesce",
        ["get", "name:en"],
        ["get", "name_en"],
        ["get", "name:latin"],
        ["get", "name"],
      ]);
    } catch {
      // ignore layers that don't expose text-field
    }
  }
}

function HHCCoverage() {
  const [selected, setSelected] = useState<number | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || mapRef.current) return;

    const map = new maplibregl.Map({
      container,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: [45, 24],
      zoom: 4.5,
      dragRotate: false,
      pitchWithRotate: false,
      attributionControl: { compact: true },
    });

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false, visualizePitch: false }),
      "top-right"
    );

    map.on("load", () => {
      forceEnglishLabels(map);

      const bounds = new maplibregl.LngLatBounds();
      HHC_BRANCHES.forEach((b) => bounds.extend([b.lng, b.lat]));
      map.fitBounds(bounds, {
        padding: { top: 60, right: 60, bottom: 60, left: 60 },
        duration: 0,
        maxZoom: 10,
      });

      HHC_BRANCHES.forEach((b, i) => {
        const el = document.createElement("button");
        el.className = `mc-hhc-marker${b.big ? " is-big" : ""}`;
        el.type = "button";
        el.setAttribute("aria-label", `${b.name}: ${b.district}, ${b.city}`);
        el.innerHTML = `<span class="mc-hhc-ring"></span><span class="mc-hhc-dot"></span><span class="mc-hhc-name">${b.district}</span>`;
        el.addEventListener("click", (ev) => {
          ev.stopPropagation();
          setSelected(i);
        });

        const marker = new maplibregl.Marker({ element: el, anchor: "center" })
          .setLngLat([b.lng, b.lat])
          .addTo(map);
        markersRef.current.push(marker);
      });
    });

    map.on("styledata", () => forceEnglishLabels(map));

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    markersRef.current.forEach((m, i) => {
      m.getElement().classList.toggle("is-active", i === selected);
    });

    const map = mapRef.current;
    if (!map) return;

    if (selected === null) {
      const bounds = new maplibregl.LngLatBounds();
      HHC_BRANCHES.forEach((b) => bounds.extend([b.lng, b.lat]));
      map.fitBounds(bounds, {
        padding: { top: 60, right: 60, bottom: 60, left: 60 },
        duration: 900,
        maxZoom: 10,
      });
      return;
    }

    const b = HHC_BRANCHES[selected];
    map.flyTo({
      center: [b.lng, b.lat],
      zoom: 13.5,
      speed: 1.2,
      curve: 1.4,
      essential: true,
    });
  }, [selected]);

  return (
    <section className="section" style={{ background: "white" }}>
      <div className="container">
          <div
            className="hhc-coverage-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div>
            <div className="kicker" style={{ marginBottom: 14 }}>
              Coverage
            </div>
            <h2 className="serif" style={{ fontSize: 40, marginBottom: 18 }}>
              Home healthcare from our {HHC_BRANCHES.length} branches.
            </h2>
            <p style={{ fontSize: 15, marginBottom: 28 }}>
              Each MyClinic branch dispatches licensed clinicians to surrounding neighborhoods — with same-day availability across Jeddah and Riyadh.
            </p>
            <div className="hhc-branch-list" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {HHC_BRANCHES.map((b, i) => {
                const active = selected === i;
                return (
                  <button
                    key={b.name}
                    className="hhc-branch-button"
                    type="button"
                    onClick={() => setSelected(active ? null : i)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr auto",
                      alignItems: "center",
                      gap: 12,
                      padding: "11px 12px",
                      border: `1px solid ${active ? "rgba(47,181,164,0.5)" : "var(--ink-200)"}`,
                      borderRadius: 10,
                      background: active ? "var(--accent-50)" : "white",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "start",
                      transition: "background .15s, border-color .15s",
                    }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        background: active ? "var(--brand-800)" : "var(--ink-100)",
                        color: active ? "white" : "var(--ink-700)",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--brand-900)" }}>
                        {b.name}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--ink-500)", marginTop: 1 }}>
                        {b.district} · {b.city}
                      </div>
                    </div>
                    <Icon name="chevron" size={12} />
                  </button>
                );
              })}
            </div>
          </div>
          <div
            className="hhc-map-shell"
            style={{
              position: "relative",
              height: 480,
              borderRadius: 18,
              overflow: "hidden",
              border: "1px solid var(--ink-200)",
              background: "var(--brand-50)",
            }}
          >
            <div ref={mapContainerRef} className="mc-ml-map" />
          </div>
        </div>
      </div>
    </section>
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
          style={{ ...base, minHeight: 90, resize: "vertical" }}
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

function HHCForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    service: "",
    patient: "",
    notes: "",
    urgency: "normal" as "urgent" | "today" | "normal",
  });
  const [sent, setSent] = useState(false);
  const upd = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));
  const valid = form.name.trim().length > 0 && form.phone.trim().length > 0;
  const infoItems: { icon: IconName; l: string; v: string }[] = [
    { icon: "phone", l: "Hotline 920 022 811", v: "Available 24/7" },
    { icon: "shield", l: "Insurance-ready", v: "Direct billing with major insurers" },
    { icon: "clock", l: "Urgent visits", v: "Response in under 2 hours in major cities" },
  ];

  return (
    <section id="request" className="section" style={{ background: "var(--ink-50)", scrollMarginTop: 120 }}>
      <div className="container">
        <div
          className="card hhc-form-card"
          style={{
            padding: 0,
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
          }}
        >
          <div
            className="hhc-form-info"
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
                  "radial-gradient(ellipse at 80% 80%, rgba(47,181,164,0.22), transparent 55%)",
              }}
            />
            <div style={{ position: "relative" }}>
              <div className="kicker" style={{ color: "var(--accent-400)", marginBottom: 18 }}>
                Request a home visit
              </div>
              <h2 className="serif" style={{ color: "white", fontSize: 36, marginBottom: 20 }}>
                A care coordinator calls you back in 15 minutes.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, marginBottom: 32 }}>
                Tell us who needs care, where you are, and when you&apos;d like the visit. We handle the rest — scheduling, equipment, documentation and insurance.
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

          <div className="hhc-form-fields" style={{ padding: 48 }}>
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
                  A care coordinator will call <strong>{form.phone}</strong> shortly to confirm your visit.
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
                  Home visit request form
                </div>
                <h3
                  className="serif"
                  style={{ fontSize: 26, color: "var(--brand-900)", marginBottom: 24 }}
                >
                  Book your visit.
                </h3>
                <div className="hhc-field-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <FField
                    label="Your name"
                    value={form.name}
                    onChange={(v) => upd("name", v)}
                    placeholder="Full name"
                  />
                  <FField
                    label="Phone"
                    value={form.phone}
                    onChange={(v) => upd("phone", v)}
                    placeholder="+966 5X XXX XXXX"
                  />
                  <FField
                    label="City"
                    as="select"
                    value={form.city}
                    onChange={(v) => upd("city", v)}
                    options={["Select a city", ...HHC_AREAS]}
                  />
                  <FField
                    label="Service"
                    as="select"
                    value={form.service}
                    onChange={(v) => upd("service", v)}
                    options={["Select a service", "Physiotherapy", "Physician Assessment", "Nursing Care"]}
                  />
                  <FField
                    label="Patient"
                    as="select"
                    value={form.patient}
                    onChange={(v) => upd("patient", v)}
                    options={["For whom?", "Myself", "Parent / elder", "Child", "Spouse", "Other family member"]}
                    style={{ gridColumn: "1 / -1" }}
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
                      Urgency
                    </label>
                    <div
                      className="hhc-urgency-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 6,
                      }}
                    >
                      {(
                        [
                          { id: "urgent", l: "Urgent (< 2h)" },
                          { id: "today", l: "Today" },
                          { id: "normal", l: "Schedule later" },
                        ] as const
                      ).map((t) => {
                        const active = form.urgency === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => upd("urgency", t.id)}
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
                    label="Notes (symptoms, mobility, meds, etc.)"
                    as="textarea"
                    value={form.notes}
                    onChange={(v) => upd("notes", v)}
                    placeholder="Anything our coordinator should know before calling you back…"
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
                  Request visit <Icon name="arrow" size={14} />
                </button>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--ink-500)",
                    textAlign: "center",
                    marginTop: 14,
                  }}
                >
                  By submitting you agree to our privacy policy and service terms.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeHealthcarePage() {
  return (
    <>
      <HHCHero />
      <HHCHowItWorks />
      <HHCServices />
      <HHCCoverage />
      <HHCForm />
    </>
  );
}
