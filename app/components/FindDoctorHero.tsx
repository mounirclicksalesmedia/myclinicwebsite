"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ClinicBackground } from "./ClinicBackground";
import { Icon, type IconName } from "./Icon";

function FDInput({
  icon,
  label,
  placeholder,
  options,
}: {
  icon: IconName;
  label: string;
  placeholder: string;
  options?: string[];
}) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  const wrap = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div
      className="fd-input"
      ref={wrap}
      style={{
        background: "var(--ink-50)",
        borderRadius: 12,
        border: "1px solid var(--ink-200)",
        padding: "10px 14px",
        position: "relative",
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: "var(--ink-500)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: 4,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      <div className="flex" style={{ gap: 8, alignItems: "center" }}>
        <span style={{ color: "var(--brand-800)" }}>
          <Icon name={icon} size={15} />
        </span>
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--ink-900)",
            fontSize: 14,
            fontFamily: "inherit",
          }}
        />
        {options && <Icon name="chevron" size={12} />}
      </div>
      {open && options && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid var(--ink-200)",
            borderRadius: 10,
            boxShadow: "var(--shadow-md)",
            zIndex: 10,
            padding: 6,
            maxHeight: 240,
            overflow: "auto",
          }}
        >
          {options.map((o) => (
            <div
              key={o}
              onClick={() => {
                setVal(o);
                setOpen(false);
              }}
              style={{
                padding: "10px 12px",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 13,
                color: "var(--ink-900)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--ink-50)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function FindDoctorHero() {
  return (
    <section
      className="fd-hero"
      style={{
        background: "var(--brand-900)",
        color: "white",
        position: "relative",
        paddingTop: 64,
        paddingBottom: 140,
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
          className="flex fd-breadcrumb"
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
          <span style={{ color: "white" }}>Find a Doctor</span>
        </div>
        <div className="fd-hero-copy" style={{ maxWidth: 780 }}>
          <div className="kicker" style={{ color: "var(--accent-400)", marginBottom: 16 }}>
            Find Your Doctor
          </div>
          <h1
            className="serif"
            style={{
              color: "white",
              marginBottom: 16,
              fontSize: "clamp(40px, 4.8vw, 64px)",
            }}
          >
            850+ consultants across 40+ specialties.
            <br />
            <span style={{ color: "var(--accent-400)", fontStyle: "italic" }}>
              Find yours in seconds.
            </span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, maxWidth: 620 }}>
            Search by specialty, city, doctor name, insurance, or availability. Book video or in-person — whichever fits your day.
          </p>
        </div>
      </div>

      <div className="container fd-search-wrap" style={{ position: "relative", marginTop: 80 }}>
        <div
          className="fd-search-panel"
          style={{
            position: "absolute",
            left: 32,
            right: 32,
            bottom: -60,
            background: "white",
            borderRadius: 20,
            padding: 20,
            boxShadow: "var(--shadow-lg)",
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1fr 1fr auto",
            gap: 12,
            border: "1px solid var(--ink-200)",
          }}
        >
          <FDInput
            icon="user"
            label="Doctor or specialty"
            placeholder="Search name or specialty"
          />
          <FDInput
            icon="pin"
            label="City"
            placeholder="Any city"
            options={["Riyadh", "Jeddah", "Dammam", "Makkah", "Madinah"]}
          />
          <FDInput
            icon="shield"
            label="Insurance"
            placeholder="Any insurer"
            options={["Bupa", "Tawuniya", "Medgulf", "AXA"]}
          />
          <FDInput
            icon="calendar"
            label="Availability"
            placeholder="Any time"
            options={["Today", "Tomorrow", "This week"]}
          />
          <button className="btn btn-primary fd-search-button" style={{ padding: "0 32px", fontSize: 14 }}>
            <Icon name="search" size={16} /> Search
          </button>
        </div>
      </div>
    </section>
  );
}
