"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export function Placeholder({
  label,
  dark,
  accent,
  style,
  className = "",
  children,
}: {
  label?: string;
  dark?: boolean;
  accent?: boolean;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`ph${dark ? " ph-dark" : ""}${accent ? " ph-accent" : ""} ${className}`}
      style={style}
    >
      {children ?? <span className="ph-label">{label}</span>}
    </div>
  );
}

export function SectionHeader({
  kicker,
  title,
  body,
  align = "left",
  side,
}: {
  kicker: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  side?: ReactNode;
}) {
  return (
    <div
      className={`mc-section-header${side ? " has-side" : ""}${align === "center" ? " is-centered" : ""}`}
      style={{
        display: "grid",
        gridTemplateColumns: side ? "1fr auto" : "1fr",
        alignItems: "end",
        gap: 24,
        maxWidth: align === "center" ? 760 : "100%",
        margin: align === "center" ? "0 auto 56px" : "0 0 48px",
        textAlign: align,
      }}
    >
      <div>
        <div className="kicker" style={{ marginBottom: 16 }}>
          {kicker}
        </div>
        <h2 className="serif" style={{ marginBottom: body ? 16 : 0 }}>
          {title}
        </h2>
        {body && (
          <p
            style={{
              maxWidth: 560,
              marginInline: align === "center" ? "auto" : 0,
              fontSize: 17,
            }}
          >
            {body}
          </p>
        )}
      </div>
      {side}
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  style,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "span";
  style?: CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const combinedStyle: CSSProperties = {
    transitionDelay: `${delay}ms`,
    ...style,
  };

  const classes = `scroll-reveal${visible ? " is-visible" : ""} ${className}`;

  if (Tag === "section") {
    return (
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className={classes}
        style={combinedStyle}
      >
        {children}
      </section>
    );
  }
  if (Tag === "span") {
    return (
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className={classes}
        style={combinedStyle}
      >
        {children}
      </span>
    );
  }
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={classes}
      style={combinedStyle}
    >
      {children}
    </div>
  );
}
