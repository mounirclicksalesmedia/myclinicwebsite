"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Icon } from "./Icon";
import { useT } from "./I18nProvider";
import { SectionHeader } from "./ui";

type Branch = {
  name: string;
  city: "Jeddah" | "Riyadh";
  district: string;
  address: string;
  hours: string;
  specialties: string[];
  doctors: { name: string; spec: string; img: string }[];
  lng: number;
  lat: number;
};

const BRANCHES: Branch[] = [
  {
    name: "Jeddah Al Mohammadiyah",
    city: "Jeddah",
    district: "Al Mohammadiyah",
    address: "Prince Sultan Road, Al Mohammadiyah",
    hours: "Open daily · 8 AM - 11 PM",
    specialties: ["Family Medicine", "Dermatology", "Pediatrics", "Lab"],
    doctors: [
      { name: "Dr. Lina Akkad", spec: "Gynecology", img: "/doctors/lina-akkad.webp" },
      { name: "Dr. Omar Ashour", spec: "Orthopedics", img: "/doctors/omar-ashour.webp" },
    ],
    lng: 39.1680,
    lat: 21.5900,
  },
  {
    name: "Jeddah Al Safa",
    city: "Jeddah",
    district: "Al Safa",
    address: "Al Safa District, Jeddah",
    hours: "Open daily · 9 AM - 10 PM",
    specialties: ["Internal Medicine", "ENT", "Dental", "Radiology"],
    doctors: [
      { name: "Dr. Hani Mawardi", spec: "ENT", img: "/doctors/hani-mawardi.webp" },
      { name: "Dr. Amira El-Tawdy", spec: "Dental", img: "/doctors/amira-el-tawdy.webp" },
    ],
    lng: 39.1800,
    lat: 21.5360,
  },
  {
    name: "Jeddah Al Khalidiyyah",
    city: "Jeddah",
    district: "Al Khalidiyyah",
    address: "Al Khalidiyyah District, Jeddah",
    hours: "Open daily · 8 AM - 11 PM",
    specialties: ["Cardiology", "Neurology", "Ophthalmology", "Pharmacy"],
    doctors: [
      { name: "Dr. Haifa Al-Falah", spec: "Cardiology", img: "/doctors/haifa-alfalah.webp" },
      { name: "Dr. Nora Halawani", spec: "Ophthalmology", img: "/doctors/nora-halawani.webp" },
    ],
    lng: 39.1420,
    lat: 21.5840,
  },
  {
    name: "Dental Center",
    city: "Jeddah",
    district: "Specialized Dental Center",
    address: "Tahlia Street, Jeddah",
    hours: "Open daily · 10 AM - 10 PM",
    specialties: ["Orthodontics", "Implants", "Cosmetic Dental", "Pediatric Dental"],
    doctors: [
      { name: "Dr. Amira El-Tawdy", spec: "Orthodontics", img: "/doctors/amira-el-tawdy.webp" },
      { name: "Dr. Yosra Turkistani", spec: "Dental", img: "/doctors/yosra-turkistani.webp" },
    ],
    lng: 39.1720,
    lat: 21.5450,
  },
  {
    name: "Riyadh Al Sahafa",
    city: "Riyadh",
    district: "Al Sahafa",
    address: "Anas Ibn Malik Road, Al Sahafa",
    hours: "Open 24/7",
    specialties: ["Cardiology", "Orthopedics", "Women's Health", "Emergency"],
    doctors: [
      { name: "Dr. Sarah Dahlan", spec: "Dermatology", img: "/doctors/sarah-dahlan.webp" },
      { name: "Dr. Turki Al-Ahmadi", spec: "Cardiology", img: "/doctors/turki-alahmadi.webp" },
    ],
    lng: 46.6500,
    lat: 24.8010,
  },
  {
    name: "Jeddah Tahlia",
    city: "Jeddah",
    district: "Tahlia",
    address: "Prince Mohammed Bin Abdulaziz Street",
    hours: "Open daily · 8 AM - 12 AM",
    specialties: ["Executive Health", "Dermatology", "Dental", "Physiotherapy"],
    doctors: [
      { name: "Dr. Sarah Dahlan", spec: "Dermatology", img: "/doctors/sarah-dahlan.webp" },
      { name: "Dr. Faisal Almuhizi", spec: "Pediatrics", img: "/doctors/faisal-almuhizi.webp" },
    ],
    lng: 39.1695,
    lat: 21.5640,
  },
  {
    name: "Jeddah Obhour",
    city: "Jeddah",
    district: "Obhour",
    address: "North Obhour Waterfront, Jeddah",
    hours: "Open daily · 9 AM - 11 PM",
    specialties: ["Pediatrics", "Family Medicine", "Home Healthcare", "Diagnostics"],
    doctors: [
      { name: "Dr. Fotoun Abu Al-Faraj", spec: "Family Medicine", img: "/doctors/fotoun-abualfaraj.webp" },
      { name: "Dr. Rania Harere", spec: "Pediatrics", img: "/doctors/rania-harere.webp" },
    ],
    lng: 39.0910,
    lat: 21.7600,
  },
];

function getBranchLabel(branch: Branch) {
  return branch.name === "Dental Center" ? "Dental Center" : branch.district;
}

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

export function Locations() {
  const { t } = useT();
  const [selected, setSelected] = useState<number | null>(null);
  const branch = selected === null ? null : BRANCHES[selected];

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || mapRef.current) return;

    const map = new maplibregl.Map({
      container,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: [42.5, 23.2],
      zoom: 4.6,
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
      BRANCHES.forEach((b) => bounds.extend([b.lng, b.lat]));
      map.fitBounds(bounds, { padding: { top: 60, bottom: 200, left: 60, right: 60 }, duration: 0, maxZoom: 10 });

      BRANCHES.forEach((b, i) => {
        const el = document.createElement("button");
        el.className = "mc-ml-marker";
        el.type = "button";
        el.setAttribute("aria-label", `${getBranchLabel(b)}: ${b.name}`);
        el.innerHTML = '<span class="mc-ml-ring"></span><span class="mc-ml-dot"></span>';
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
      const el = m.getElement();
      el.classList.toggle("is-active", i === selected);
    });

    const map = mapRef.current;
    if (!map) return;

    if (selected === null) {
      const bounds = new maplibregl.LngLatBounds();
      BRANCHES.forEach((b) => bounds.extend([b.lng, b.lat]));
      map.fitBounds(bounds, {
        padding: { top: 60, bottom: 200, left: 60, right: 60 },
        duration: 900,
        maxZoom: 10,
      });
      return;
    }

    const b = BRANCHES[selected];
    map.flyTo({
      center: [b.lng, b.lat],
      zoom: 14.5,
      speed: 1.2,
      curve: 1.4,
      essential: true,
    });
  }, [selected]);

  return (
    <section className="section" style={{ background: "var(--ink-50)" }}>
      <div className="container">
        <SectionHeader kicker={t("loc_kicker")} title={t("loc_title")} body={t("loc_body")} />
        <div
          className="mc-locations-shell"
          style={{
            display: "grid",
            gridTemplateColumns: "0.86fr 1.4fr",
            gap: 0,
            background: "white",
            borderRadius: 20,
            border: "1px solid var(--ink-200)",
            overflow: "hidden",
            minHeight: 560,
          }}
        >
          <div className="mc-branch-list" style={{ padding: 22, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 11,
                color: "var(--ink-500)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {BRANCHES.length} {t("branches")} · Jeddah & Riyadh
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {BRANCHES.map((b, i) => {
                const active = selected === i;
                return (
                  <button
                    key={b.name}
                    onClick={() => setSelected(i)}
                    className="mc-branch-item"
                    type="button"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr auto",
                      alignItems: "center",
                      gap: 12,
                      padding: "13px 12px",
                      border: `1px solid ${active ? "rgba(47,181,164,0.45)" : "transparent"}`,
                      cursor: "pointer",
                      background: active ? "var(--accent-50)" : "transparent",
                      borderRadius: 12,
                      fontFamily: "inherit",
                      textAlign: "left",
                      transition: "background .15s, border-color .15s, transform .15s",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: active ? "var(--brand-800)" : "var(--ink-100)",
                        color: active ? "white" : "var(--ink-700)",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--brand-900)" }}>
                        {b.name}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--ink-500)", marginTop: 2 }}>
                        {b.district} · {b.city}
                      </div>
                    </div>
                    <Icon name="chevron" size={14} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mc-locations-map" style={{ position: "relative", background: "var(--brand-50)" }}>
            <div ref={mapContainerRef} className="mc-ml-map" />

            {branch && selected !== null ? (
              <div
                className="mc-locations-card"
                style={{
                  position: "absolute",
                  left: 24,
                  bottom: 24,
                  right: 24,
                  maxWidth: 460,
                  background: "white",
                  borderRadius: 16,
                  padding: 18,
                  boxShadow: "var(--shadow-lg)",
                  border: "1px solid var(--ink-200)",
                  zIndex: 20,
                }}
              >
                <div className="between mc-branch-card-head" style={{ marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--accent-600)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
                      {getBranchLabel(branch)} branch
                    </div>
                    <div className="serif" style={{ fontSize: 22, fontWeight: 500, color: "var(--brand-900)" }}>
                      {branch.name}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ink-500)", marginTop: 2 }}>
                      {branch.hours}
                    </div>
                  </div>
                  <div className="mc-branch-card-tools">
                    <span className="chip chip-accent">
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--accent-600)",
                        }}
                      />
                      {branch.city}
                    </span>
                    <button
                      className="mc-branch-card-close"
                      type="button"
                      onClick={() => setSelected(null)}
                      aria-label="Close branch details"
                    >
                      <Icon name="close" size={15} />
                    </button>
                  </div>
                </div>

                <div className="mc-branch-address" style={{ fontSize: 13, color: "var(--ink-700)", lineHeight: 1.5, marginBottom: 12 }}>
                  <Icon name="pin" size={13} />
                  <span>{branch.address}</span>
                </div>

                <div className="mc-branch-specialties">
                  {branch.specialties.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>

                <div className="mc-branch-doctors">
                  {branch.doctors.map((d) => (
                    <div key={d.name} className="mc-branch-doctor">
                      <Image src={d.img} alt={d.name} width={34} height={34} />
                      <div>
                        <div>{d.name}</div>
                        <span>{d.spec}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex mc-branch-actions" style={{ gap: 8 }}>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ flex: 1, padding: "10px" }}
                  >
                    <Icon name="calendar" size={14} /> Book here
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                    style={{ padding: "10px 14px" }}
                    aria-label="Get directions"
                  >
                    <Icon name="pin" size={14} />
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
