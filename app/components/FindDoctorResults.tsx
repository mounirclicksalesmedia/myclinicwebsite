"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { Icon, StarFill } from "./Icon";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/^dr\.\s*/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type Doctor = {
  id: number;
  name: string;
  gender: "F" | "M";
  spec: string;
  sub: string;
  title: string;
  edu: string;
  langs: string[];
  rating: number;
  reviews: number;
  next: string;
  city: string;
  exp: number;
  insurance: string[];
  video: boolean;
  img: string;
};

const ALL_DOCTORS: Doctor[] = [
  { id: 1, name: "Dr. Haifa Al-Falah", gender: "F", spec: "Cardiology", sub: "Interventional", title: "Senior Consultant", edu: "Johns Hopkins", langs: ["EN", "AR"], rating: 4.9, reviews: 284, next: "Today 14:00", city: "Riyadh", exp: 18, insurance: ["Bupa", "Tawuniya", "Medgulf"], video: true, img: "/doctors/haifa-alfalah.webp" },
  { id: 2, name: "Dr. Omar Ashour", gender: "M", spec: "Orthopedics", sub: "Sports medicine", title: "Consultant", edu: "Mayo Clinic", langs: ["EN", "AR", "FR"], rating: 4.8, reviews: 196, next: "Tomorrow 10:30", city: "Jeddah", exp: 14, insurance: ["Bupa", "Tawuniya"], video: true, img: "/doctors/omar-ashour.webp" },
  { id: 3, name: "Dr. Sarah Dahlan", gender: "F", spec: "Dermatology", sub: "Cosmetic", title: "Consultant", edu: "King's College London", langs: ["EN", "AR", "UR"], rating: 4.9, reviews: 412, next: "Today 16:15", city: "Riyadh", exp: 12, insurance: ["Bupa", "Medgulf"], video: true, img: "/doctors/sarah-dahlan.webp" },
  { id: 4, name: "Dr. Faisal Almuhizi", gender: "M", spec: "Pediatrics", sub: "Neonatology", title: "Senior Consultant", edu: "McGill University", langs: ["EN", "AR"], rating: 5.0, reviews: 328, next: "Today 11:00", city: "Dammam", exp: 22, insurance: ["Bupa", "Tawuniya", "Medgulf", "AXA"], video: false, img: "/doctors/faisal-almuhizi.webp" },
  { id: 5, name: "Dr. Nora Halawani", gender: "F", spec: "Ophthalmology", sub: "Retina", title: "Consultant", edu: "Moorfields Eye", langs: ["EN", "AR"], rating: 4.8, reviews: 152, next: "Thu 09:30", city: "Makkah", exp: 11, insurance: ["Bupa"], video: true, img: "/doctors/nora-halawani.webp" },
  { id: 6, name: "Dr. Turki Al-Ahmadi", gender: "M", spec: "Cardiology", sub: "Electrophysiology", title: "Consultant", edu: "Cleveland Clinic", langs: ["EN", "AR"], rating: 4.7, reviews: 119, next: "Tomorrow 15:00", city: "Riyadh", exp: 10, insurance: ["Bupa", "Tawuniya"], video: true, img: "/doctors/turki-alahmadi.webp" },
  { id: 7, name: "Dr. Lina Akkad", gender: "F", spec: "Gynecology", sub: "Maternal-fetal", title: "Senior Consultant", edu: "Karolinska", langs: ["EN", "AR"], rating: 4.9, reviews: 267, next: "Today 13:30", city: "Jeddah", exp: 16, insurance: ["Bupa", "Medgulf", "AXA"], video: true, img: "/doctors/lina-akkad.webp" },
  { id: 8, name: "Dr. Khaled Al-Bazli", gender: "M", spec: "Neurology", sub: "Movement disorders", title: "Consultant", edu: "University of Toronto", langs: ["EN", "AR"], rating: 4.8, reviews: 88, next: "Thu 11:30", city: "Riyadh", exp: 13, insurance: ["Bupa", "Tawuniya"], video: false, img: "/doctors/khaled-albazli.webp" },
  { id: 9, name: "Dr. Amira El-Tawdy", gender: "F", spec: "Dental", sub: "Orthodontics", title: "Consultant", edu: "NYU College of Dentistry", langs: ["EN", "AR", "UR"], rating: 4.9, reviews: 342, next: "Today 17:00", city: "Riyadh", exp: 15, insurance: ["Bupa", "Medgulf"], video: false, img: "/doctors/amira-el-tawdy.webp" },
];

const SPECS = ["Cardiology", "Orthopedics", "Dermatology", "Pediatrics", "Ophthalmology", "Gynecology", "Neurology", "Dental"];
const CITIES = ["Riyadh", "Jeddah", "Dammam", "Makkah"];
const LANGS: { k: string; l: string }[] = [
  { k: "EN", l: "English" },
  { k: "AR", l: "Arabic" },
  { k: "FR", l: "French" },
  { k: "UR", l: "Urdu" },
];
const INSURERS = ["Bupa", "Tawuniya", "Medgulf", "AXA"];
const GENDERS: { k: "" | "F" | "M"; l: string }[] = [
  { k: "", l: "Any" },
  { k: "F", l: "Female" },
  { k: "M", l: "Male" },
];

type Filters = {
  spec: string[];
  city: string[];
  gender: "" | "F" | "M";
  lang: string[];
  insurance: string[];
  video: boolean;
};

const EMPTY_FILTERS: Filters = {
  spec: [],
  city: [],
  gender: "",
  lang: [],
  insurance: [],
  video: false,
};

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="filter-group">
      <h4>{title}</h4>
      {children}
    </div>
  );
}

function DoctorCard({ d }: { d: Doctor }) {
  return (
    <div
      className="card fd-doctor-card"
      style={{
        padding: 20,
        display: "grid",
        gridTemplateColumns: "104px 1fr",
        gap: 18,
        alignItems: "start",
      }}
    >
      <img
        className="fd-doctor-card-img"
        src={d.img}
        alt={d.name}
        style={{
          width: 104,
          height: 104,
          borderRadius: 12,
          objectFit: "cover",
          display: "block",
        }}
      />
      <div className="fd-doctor-card-body">
        <div className="between" style={{ marginBottom: 6 }}>
          <span className="chip chip-accent" style={{ fontSize: 10 }}>
            {d.spec}
          </span>
          <div
            className="flex"
            style={{ gap: 4, alignItems: "center", fontSize: 12, color: "var(--ink-700)" }}
          >
            <StarFill size={12} />
            <span style={{ fontWeight: 600 }}>{d.rating}</span>
            <span style={{ color: "var(--ink-400)" }}>({d.reviews})</span>
          </div>
        </div>
        <div
          className="serif"
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: "var(--brand-900)",
            marginBottom: 2,
          }}
        >
          {d.name}
        </div>
        <div style={{ fontSize: 12, color: "var(--ink-500)", marginBottom: 12 }}>
          {d.title} · {d.exp} yrs · {d.edu}
        </div>
        <div
          className="flex"
          style={{
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 12,
            fontSize: 11,
            color: "var(--ink-700)",
          }}
        >
          <span className="flex" style={{ gap: 4, alignItems: "center" }}>
            <Icon name="pin" size={12} /> {d.city}
          </span>
          <span className="flex" style={{ gap: 4, alignItems: "center" }}>
            <Icon name="globe" size={12} /> {d.langs.join(" · ")}
          </span>
          {d.video && (
            <span
              className="flex"
              style={{
                gap: 4,
                alignItems: "center",
                color: "var(--accent-600)",
                fontWeight: 600,
              }}
            >
              <Icon name="video" size={12} /> Video
            </span>
          )}
        </div>
        <div
          style={{
            padding: "10px 12px",
            background: "var(--accent-50)",
            borderRadius: 8,
            fontSize: 12,
            color: "var(--brand-900)",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon name="clock" size={13} />
          <span>
            Next available:{" "}
            <strong style={{ color: "var(--accent-600)" }}>{d.next}</strong>
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
          <Link
            href={`/doctor/${slugify(d.name)}`}
            className="btn btn-primary"
            style={{ padding: "10px" }}
          >
            Book appointment
          </Link>
          <Link
            href={`/doctor/${slugify(d.name)}`}
            className="btn btn-ghost"
            style={{ padding: "10px 12px" }}
            aria-label="View profile"
          >
            <Icon name="arrow" size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function DoctorRow({ d }: { d: Doctor }) {
  return (
    <div
      className="card fd-doctor-row"
      style={{
        padding: 20,
        display: "grid",
        gridTemplateColumns: "80px 1.5fr 1fr auto",
        gap: 20,
        alignItems: "center",
      }}
    >
      <img
        className="fd-doctor-row-img"
        src={d.img}
        alt={d.name}
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <div>
        <div className="flex" style={{ gap: 8, alignItems: "center", marginBottom: 4 }}>
          <span className="chip chip-accent" style={{ fontSize: 10 }}>
            {d.spec}
          </span>
          <span style={{ fontSize: 11, color: "var(--ink-500)" }}>· {d.sub}</span>
        </div>
        <div
          className="serif"
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: "var(--brand-900)",
            marginBottom: 2,
          }}
        >
          {d.name}
        </div>
        <div style={{ fontSize: 12, color: "var(--ink-500)" }}>
          {d.title} · {d.exp} yrs experience · {d.edu}
        </div>
      </div>
      <div style={{ fontSize: 12, color: "var(--ink-700)" }}>
        <div
          className="flex"
          style={{ gap: 4, alignItems: "center", marginBottom: 4 }}
        >
          <Icon name="pin" size={12} /> {d.city}
          {d.video && (
            <span
              style={{
                color: "var(--accent-600)",
                marginLeft: 8,
                fontWeight: 600,
              }}
            >
              · Video
            </span>
          )}
        </div>
        <div className="flex" style={{ gap: 4, alignItems: "center" }}>
          <StarFill size={12} />
          <span style={{ fontWeight: 600 }}>{d.rating}</span>
          <span style={{ color: "var(--ink-400)" }}>({d.reviews} reviews)</span>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 11, color: "var(--ink-500)", marginBottom: 2 }}>
          Next available
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--accent-600)",
            marginBottom: 10,
          }}
        >
          {d.next}
        </div>
        <Link
          href={`/doctor/${slugify(d.name)}`}
          className="btn btn-primary"
          style={{ padding: "10px 20px" }}
        >
          Book
        </Link>
      </div>
    </div>
  );
}

type ArrKey = "spec" | "city" | "lang" | "insurance";

export function FindDoctorResults() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sort, setSort] = useState<"recommended" | "rating" | "experience" | "soonest">(
    "recommended",
  );
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = (k: ArrKey, v: string) =>
    setFilters((p) => {
      const arr = p[k];
      return {
        ...p,
        [k]: arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v],
      };
    });

  const doctors = useMemo(() => {
    let list = ALL_DOCTORS.filter((d) => {
      if (filters.spec.length && !filters.spec.includes(d.spec)) return false;
      if (filters.city.length && !filters.city.includes(d.city)) return false;
      if (filters.gender && d.gender !== filters.gender) return false;
      if (filters.lang.length && !filters.lang.some((l) => d.langs.includes(l))) return false;
      if (
        filters.insurance.length &&
        !filters.insurance.some((i) => d.insurance.includes(i))
      )
        return false;
      if (filters.video && !d.video) return false;
      return true;
    });
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "experience") list = [...list].sort((a, b) => b.exp - a.exp);
    if (sort === "soonest") list = [...list].sort((a, b) => a.next.localeCompare(b.next));
    return list;
  }, [filters, sort]);

  const activeCount =
    filters.spec.length +
    filters.city.length +
    filters.lang.length +
    filters.insurance.length +
    (filters.gender ? 1 : 0) +
    (filters.video ? 1 : 0);

  type Chip = { k: ArrKey | "gender" | "video"; v: string };
  const activeChips: Chip[] = [
    ...filters.spec.map<Chip>((v) => ({ k: "spec", v })),
    ...filters.city.map<Chip>((v) => ({ k: "city", v })),
    ...filters.lang.map<Chip>((v) => ({ k: "lang", v })),
    ...filters.insurance.map<Chip>((v) => ({ k: "insurance", v })),
    ...(filters.gender ? [{ k: "gender" as const, v: filters.gender }] : []),
    ...(filters.video ? [{ k: "video" as const, v: "Video available" }] : []),
  ];

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setFiltersOpen(false);
  };

  return (
    <section
      className="fd-results-section"
      id="doctor-results"
      style={{ background: "var(--ink-50)", paddingTop: 60, paddingBottom: 100, scrollMarginTop: 120 }}
    >
      <div className="container">
        <div
          className="fd-results-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: 32,
            alignItems: "start",
          }}
        >
          {filtersOpen && (
            <button
              type="button"
              className="fd-filter-backdrop"
              aria-label="Close filters"
              onClick={() => setFiltersOpen(false)}
            />
          )}
          <aside
            className={`fd-filter-panel${filtersOpen ? " is-open" : ""}`}
            style={{
              background: "white",
              borderRadius: "var(--card-radius)",
              border: "1px solid var(--ink-200)",
              padding: "0 24px",
              position: "sticky",
              top: 100,
            }}
          >
            <div
              className="between"
              style={{ padding: "20px 0", borderBottom: "1px solid var(--ink-200)" }}
            >
              <div className="flex" style={{ gap: 10, alignItems: "center" }}>
                <Icon name="filter" size={16} />
                <span style={{ fontWeight: 600, color: "var(--brand-900)" }}>Filters</span>
                {activeCount > 0 && (
                  <span
                    style={{
                      background: "var(--accent-600)",
                      color: "white",
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 7px",
                      borderRadius: 999,
                    }}
                  >
                    {activeCount}
                  </span>
                )}
              </div>
              {activeCount > 0 && (
                <button
                  onClick={clearFilters}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--accent-600)",
                    cursor: "pointer",
                    fontSize: 12,
                    fontFamily: "inherit",
                  }}
                >
                  Clear all
                </button>
              )}
            </div>

            <FilterGroup title="Specialty">
              {SPECS.map((s) => (
                <label key={s} className="chk">
                  <input
                    type="checkbox"
                    checked={filters.spec.includes(s)}
                    onChange={() => toggle("spec", s)}
                  />
                  {s}
                  <span className="count">
                    {ALL_DOCTORS.filter((d) => d.spec === s).length}
                  </span>
                </label>
              ))}
            </FilterGroup>

            <FilterGroup title="City">
              {CITIES.map((c) => (
                <label key={c} className="chk">
                  <input
                    type="checkbox"
                    checked={filters.city.includes(c)}
                    onChange={() => toggle("city", c)}
                  />
                  {c}
                  <span className="count">
                    {ALL_DOCTORS.filter((d) => d.city === c).length}
                  </span>
                </label>
              ))}
            </FilterGroup>

            <FilterGroup title="Gender">
              <div className="flex" style={{ gap: 6, marginTop: 2 }}>
                {GENDERS.map((o) => {
                  const active = filters.gender === o.k;
                  return (
                    <button
                      key={o.l}
                      onClick={() => setFilters((p) => ({ ...p, gender: o.k }))}
                      style={{
                        flex: 1,
                        padding: "9px 10px",
                        fontSize: 12,
                        fontWeight: 500,
                        border: `1px solid ${active ? "var(--brand-800)" : "var(--ink-200)"}`,
                        background: active ? "var(--brand-800)" : "white",
                        color: active ? "white" : "var(--ink-700)",
                        borderRadius: 8,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      {o.l}
                    </button>
                  );
                })}
              </div>
            </FilterGroup>

            <FilterGroup title="Language">
              {LANGS.map((l) => (
                <label key={l.k} className="chk">
                  <input
                    type="checkbox"
                    checked={filters.lang.includes(l.k)}
                    onChange={() => toggle("lang", l.k)}
                  />
                  {l.l}
                </label>
              ))}
            </FilterGroup>

            <FilterGroup title="Insurance">
              {INSURERS.map((i) => (
                <label key={i} className="chk">
                  <input
                    type="checkbox"
                    checked={filters.insurance.includes(i)}
                    onChange={() => toggle("insurance", i)}
                  />
                  {i}
                </label>
              ))}
            </FilterGroup>

            <FilterGroup title="Consultation type">
              <label className="chk">
                <input
                  type="checkbox"
                  checked={filters.video}
                  onChange={() => setFilters((p) => ({ ...p, video: !p.video }))}
                />
                Video consultation available
              </label>
            </FilterGroup>
            <div style={{ height: 20 }} />
            <button
              type="button"
              className="btn btn-primary fd-apply-filters"
              onClick={() => setFiltersOpen(false)}
            >
              Apply filters
            </button>
          </aside>

          <div className="fd-results-main">
            <div
              className="between fd-results-toolbar"
              style={{
                background: "white",
                border: "1px solid var(--ink-200)",
                borderRadius: "var(--card-radius)",
                padding: "16px 20px",
                marginBottom: 20,
              }}
            >
              <div>
                <div
                  className="serif"
                  style={{ fontSize: 22, fontWeight: 500, color: "var(--brand-900)" }}
                >
                  {doctors.length} doctor{doctors.length !== 1 ? "s" : ""} found
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-500)", marginTop: 2 }}>
                  Showing results across {new Set(doctors.map((d) => d.city)).size} cities
                </div>
              </div>
              <div className="flex fd-results-controls" style={{ gap: 12, alignItems: "center" }}>
                <button
                  type="button"
                  className="btn btn-ghost fd-mobile-filter-button"
                  onClick={() => setFiltersOpen(true)}
                >
                  <Icon name="filter" size={14} /> Filters
                  {activeCount > 0 && <span>{activeCount}</span>}
                </button>
                <div className="flex" style={{ gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "var(--ink-500)" }}>Sort</span>
                  <select
                    value={sort}
                    onChange={(e) =>
                      setSort(e.target.value as typeof sort)
                    }
                    style={{
                      padding: "8px 12px",
                      border: "1px solid var(--ink-200)",
                      borderRadius: 8,
                      fontFamily: "inherit",
                      fontSize: 13,
                      cursor: "pointer",
                      background: "white",
                    }}
                  >
                    <option value="recommended">Recommended</option>
                    <option value="rating">Highest rated</option>
                    <option value="experience">Most experienced</option>
                    <option value="soonest">Soonest available</option>
                  </select>
                </div>
                <div
                  style={{
                    width: 1,
                    height: 24,
                    background: "var(--ink-200)",
                  }}
                />
                <div
                  className="flex"
                  style={{
                    gap: 2,
                    padding: 3,
                    background: "var(--ink-50)",
                    borderRadius: 8,
                    border: "1px solid var(--ink-200)",
                  }}
                >
                  {(["grid", "list"] as const).map((v) => {
                    const active = view === v;
                    return (
                      <button
                        key={v}
                        onClick={() => setView(v)}
                        style={{
                          padding: "6px 10px",
                          borderRadius: 5,
                          fontSize: 12,
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "inherit",
                          fontWeight: 500,
                          background: active ? "white" : "transparent",
                          boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                          color: active ? "var(--brand-900)" : "var(--ink-500)",
                          textTransform: "capitalize",
                        }}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {activeCount > 0 && (
              <div
                className="flex"
                style={{ gap: 8, flexWrap: "wrap", marginBottom: 20 }}
              >
                {activeChips.map(({ k, v }) => (
                  <button
                    key={k + v}
                    onClick={() => {
                      if (k === "gender") setFilters((p) => ({ ...p, gender: "" }));
                      else if (k === "video") setFilters((p) => ({ ...p, video: false }));
                      else toggle(k, v);
                    }}
                    style={{
                      background: "white",
                      border: "1px solid var(--ink-200)",
                      borderRadius: 999,
                      padding: "6px 12px",
                      fontSize: 12,
                      color: "var(--ink-700)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {v} <Icon name="close" size={11} />
                  </button>
                ))}
              </div>
            )}

            {doctors.length === 0 ? (
              <div
                style={{
                  background: "white",
                  borderRadius: "var(--card-radius)",
                  border: "1px solid var(--ink-200)",
                  padding: 80,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>◌</div>
                <h3 style={{ color: "var(--brand-900)", marginBottom: 8 }}>
                  No doctors match your filters
                </h3>
                <p>Try clearing some filters to see more results.</p>
              </div>
            ) : view === "grid" ? (
              <div
                className="fd-doctors-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 20,
                }}
              >
                {doctors.map((d) => (
                  <DoctorCard key={d.id} d={d} />
                ))}
              </div>
            ) : (
              <div className="fd-doctors-list" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {doctors.map((d) => (
                  <DoctorRow key={d.id} d={d} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
