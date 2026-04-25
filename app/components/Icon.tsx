"use client";

import type { CSSProperties, ReactNode } from "react";

export type IconName =
  | "search"
  | "user"
  | "calendar"
  | "phone"
  | "pin"
  | "stethoscope"
  | "heart"
  | "brain"
  | "bone"
  | "eye"
  | "tooth"
  | "baby"
  | "kidney"
  | "lungs"
  | "skin"
  | "syringe"
  | "mobile"
  | "video"
  | "home"
  | "chevron"
  | "arrow"
  | "star"
  | "plus"
  | "play"
  | "check"
  | "close"
  | "menu"
  | "shield"
  | "globe"
  | "clock"
  | "filter"
  | "apple"
  | "google"
  | "mail";

const PATHS: Record<IconName, ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  phone: (
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  pin: (
    <>
      <path d="M12 22s-7-7.5-7-13a7 7 0 0 1 14 0c0 5.5-7 13-7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M6 4v5a4 4 0 0 0 8 0V4" />
      <path d="M10 13v3a5 5 0 0 0 10 0v-2" />
      <circle cx="20" cy="12" r="2" />
    </>
  ),
  heart: (
    <path d="M20.8 6.6a5 5 0 0 0-8.8-2 5 5 0 0 0-8.8 2c0 6 8.8 11 8.8 11s8.8-5 8.8-11z" />
  ),
  brain: (
    <>
      <path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 5 3 3 0 0 0 4 4h1V3z" />
      <path d="M15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 5 3 3 0 0 1-4 4h-1V3z" />
    </>
  ),
  bone: (
    <>
      <path d="M17 3a3 3 0 0 1 2 5l-6 6-3-3 6-6a3 3 0 0 1 1-2z" />
      <path d="M7 21a3 3 0 0 1-2-5l6-6 3 3-6 6a3 3 0 0 1-1 2z" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  tooth: (
    <path d="M12 3c-3 0-4 2-6 2-2 0-3 1-3 4 0 4 1.5 5 2 8s1 4 2 4 1.5-3 2-5 1-2 3-2 2.5 0 3 2 1 5 2 5 1.5-1 2-4 2-4 2-8c0-3-1-4-3-4-2 0-3-2-6-2z" />
  ),
  baby: (
    <>
      <circle cx="12" cy="9" r="4" />
      <path d="M8 9.5h.01M16 9.5h.01" />
      <path d="M5 20c2-3 5-4 7-4s5 1 7 4" />
    </>
  ),
  kidney: (
    <path d="M8 4c-3 0-5 3-5 8s3 8 7 8c3 0 4-2 4-4s-2-3-2-5 3-3 3-5-3-2-7-2z" />
  ),
  lungs: (
    <>
      <path d="M12 3v13" />
      <path d="M8 9c-3 1-5 4-5 8a3 3 0 0 0 5 2l1-3V9z" />
      <path d="M16 9c3 1 5 4 5 8a3 3 0 0 1-5 2l-1-3V9z" />
    </>
  ),
  skin: <path d="M4 7a8 8 0 0 1 16 0v8a4 4 0 0 1-8 0 4 4 0 0 1-8 0z" />,
  syringe: (
    <>
      <path d="M14 4l6 6M17 7l-9 9-4 1 1-4 9-9z" />
      <path d="M11 10l3 3" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="12" height="12" rx="2" />
      <path d="m15 10 5-3v10l-5-3z" />
    </>
  ),
  home: (
    <>
      <path d="M3 11 12 3l9 8" />
      <path d="M5 10v10h14V10" />
    </>
  ),
  chevron: <path d="m9 6 6 6-6 6" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  star: (
    <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" />
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  play: <path d="M6 4v16l14-8z" />,
  check: <path d="m4 12 5 5L20 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  shield: <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  filter: <path d="M3 5h18l-7 9v6l-4-2v-4z" />,
  apple: (
    <path d="M16 3c-1.5.3-3 1.5-3 3 1.5.5 3-1 3-3zM18 14c0-3 2-4 2-4s-1.5-3-4-3c-1.5 0-2 1-3 1s-1.5-1-3-1c-3 0-5 2.5-5 6 0 4 3 8 5 8 1 0 1.5-1 3-1s2 1 3 1c1 0 2.5-1.5 3.5-4-.5-.5-1.5-1.5-1.5-3z" />
  ),
  google: (
    <path d="M20 12h-8v3h4.5c-.4 2-2.1 3-4.5 3a5 5 0 1 1 0-10c1.2 0 2.4.4 3.3 1.2l2.3-2.2A8 8 0 1 0 20 12z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 7 9-7" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  stroke = 1.6,
  className,
  style,
}: {
  name: IconName;
  size?: number;
  stroke?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

export function StarFill({ size = 14, color = "#fbbc05" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" />
    </svg>
  );
}

export function GoogleLogo({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path fill="#4285F4" d="M22 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.6c-.2 1.3-1 2.4-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.6z" />
      <path fill="#34A853" d="M12 22c2.9 0 5.3-.9 7-2.6l-3.4-2.6c-.9.6-2.1 1-3.6 1-2.8 0-5.1-1.9-6-4.4H2.6v2.7A10 10 0 0 0 12 22z" />
      <path fill="#FBBC05" d="M6 13.4a6 6 0 0 1 0-3.8V6.9H2.6a10 10 0 0 0 0 10.2L6 13.4z" />
      <path fill="#EA4335" d="M12 5.8c1.6 0 3 .5 4.1 1.6l3-3A10 10 0 0 0 2.6 6.9L6 9.6C6.9 7.1 9.2 5.8 12 5.8z" />
    </svg>
  );
}
