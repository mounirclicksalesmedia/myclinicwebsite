"use client";

import Link from "next/link";
import { Icon, StarFill } from "./Icon";
import { SectionHeader } from "./ui";

const RELATED = [
  { name: "Dr. Turki Al-Ahmadi", spec: "Cardiology", title: "Electrophysiology", rating: 4.7, img: "/doctors/turki-alahmadi.webp" },
  { name: "Dr. Omar Ashour", spec: "Orthopedics", title: "Sports medicine", rating: 4.8, img: "/doctors/omar-ashour.webp" },
  { name: "Dr. Khaled Al-Bazli", spec: "Neurology", title: "Movement disorders", rating: 4.8, img: "/doctors/khaled-albazli.webp" },
  { name: "Dr. Sarah Dahlan", spec: "Dermatology", title: "Cosmetic", rating: 4.9, img: "/doctors/sarah-dahlan.webp" },
];

export function RelatedDoctors() {
  return (
    <section className="section dd-related-section" style={{ background: "white" }}>
      <div className="container">
        <SectionHeader
          kicker="Similar Doctors"
          title="You may also consider."
          side={
            <Link href="/find-a-doctor" className="link">
              All doctors <Icon name="arrow" size={14} />
            </Link>
          }
        />
        <div className="dd-related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {RELATED.map((d) => (
            <a
              key={d.name}
              href="#"
              className="card dd-related-card"
              style={{ padding: 20, textDecoration: "none", color: "inherit" }}
            >
              <img
                src={d.img}
                alt={d.name}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  marginBottom: 14,
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  fontSize: 11,
                  color: "var(--accent-600)",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {d.spec}
              </div>
              <div
                className="serif"
                style={{
                  fontSize: 17,
                  fontWeight: 500,
                  color: "var(--brand-900)",
                  marginBottom: 4,
                }}
              >
                {d.name}
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-500)", marginBottom: 12 }}>
                {d.title}
              </div>
              <div
                className="flex"
                style={{ gap: 4, alignItems: "center", fontSize: 12 }}
              >
                <StarFill size={12} />
                <strong style={{ color: "var(--brand-900)" }}>{d.rating}</strong>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
