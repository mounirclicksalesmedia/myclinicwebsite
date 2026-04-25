"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon, type IconName } from "./Icon";
import { useT } from "./I18nProvider";
import type { I18nKey } from "@/app/lib/i18n";

const NAV_LINKS: { key: I18nKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "specialties", href: "/specialties" },
  { key: "doctors", href: "/find-a-doctor" },
  { key: "telemedicine", href: "/telemedicine" },
  { key: "home_healthcare", href: "/home-healthcare" },
  { key: "media", href: "#" },
];

const TOPBAR_LINKS: { key: I18nKey; href: string }[] = [
  { key: "about", href: "/about" },
  { key: "careers", href: "#" },
  { key: "for_business", href: "#" },
  { key: "insurance", href: "#" },
];

type SearchItem = {
  title: string;
  subtitle: string;
  href: string;
  type: "Doctor" | "Service" | "Specialty" | "Page";
  icon: IconName;
  keywords: string[];
};

const SEARCH_ITEMS: SearchItem[] = [
  {
    title: "Find a Doctor",
    subtitle: "Search doctors by specialty, branch, and availability",
    href: "/find-a-doctor",
    type: "Page",
    icon: "stethoscope",
    keywords: ["doctor", "find doctor", "appointment", "physician", "consultant"],
  },
  {
    title: "Home Healthcare",
    subtitle: "Physiotherapy, nursing, and physician visits at home",
    href: "/home-healthcare",
    type: "Service",
    icon: "home",
    keywords: ["home", "home care", "home healthcare", "nurse", "physiotherapy", "visit"],
  },
  {
    title: "Telemedicine",
    subtitle: "Video consultations with MyClinic doctors",
    href: "/telemedicine",
    type: "Service",
    icon: "video",
    keywords: ["telemedicine", "online doctor", "video", "virtual", "consultation"],
  },
  {
    title: "Cardiology",
    subtitle: "Heart health, blood pressure, ECG, and cardiac care",
    href: "/specialties/cardiology",
    type: "Specialty",
    icon: "heart",
    keywords: ["cardiology", "heart", "blood pressure", "ecg", "chest pain"],
  },
  {
    title: "Neurology",
    subtitle: "Headaches, nerves, stroke follow-up, and movement conditions",
    href: "/specialties/neurology",
    type: "Specialty",
    icon: "brain",
    keywords: ["neurology", "brain", "headache", "migraine", "stroke", "nerve"],
  },
  {
    title: "Orthopedics",
    subtitle: "Bone, joint, sports injuries, and post-operative recovery",
    href: "/specialties/orthopedics",
    type: "Specialty",
    icon: "bone",
    keywords: ["orthopedics", "bone", "joint", "knee", "back pain", "sports injury"],
  },
  {
    title: "Pediatrics",
    subtitle: "Child health, vaccines, growth, and urgent pediatric care",
    href: "/specialties/pediatrics",
    type: "Specialty",
    icon: "baby",
    keywords: ["pediatrics", "children", "child", "baby", "vaccine", "kids"],
  },
  {
    title: "Dermatology",
    subtitle: "Skin, acne, allergy, hair, and cosmetic dermatology",
    href: "/specialties/dermatology",
    type: "Specialty",
    icon: "skin",
    keywords: ["dermatology", "skin", "acne", "rash", "hair", "allergy"],
  },
  {
    title: "Dentistry",
    subtitle: "Dental center, cleaning, braces, implants, and oral care",
    href: "/specialties/dentistry",
    type: "Specialty",
    icon: "tooth",
    keywords: ["dentist", "dentistry", "teeth", "dental", "braces", "implant"],
  },
  {
    title: "About MyClinic",
    subtitle: "Branches, accreditations, leadership, and our story",
    href: "/about",
    type: "Page",
    icon: "shield",
    keywords: ["about", "branches", "myclinic", "accreditation", "company"],
  },
];

function TopBar() {
  const { t, lang, toggle } = useT();
  return (
    <div
      style={{
        background: "var(--brand-900)",
        color: "rgba(255,255,255,0.8)",
        fontSize: 12,
      }}
    >
      <div className="container between" style={{ minHeight: 38 }}>
        <div
          className="flex"
          style={{ gap: 20, alignItems: "center", flexWrap: "wrap" }}
        >
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <Icon name="phone" size={13} /> {t("hotline")}
          </span>
          <span className="mc-topbar-extras" style={{ opacity: 0.4 }}>
            |
          </span>
          {TOPBAR_LINKS.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className="mc-topbar-extras"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {t(l.key)}
            </Link>
          ))}
        </div>
        <div className="flex" style={{ gap: 16, alignItems: "center" }}>
          <span
            className="mc-topbar-location"
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <Icon name="pin" size={13} />{" "}
            {lang === "ar" ? "الرياض — فرع العليا" : "Riyadh — Olaya Branch"}
          </span>
          <button
            onClick={toggle}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              padding: "4px 10px",
              borderRadius: 4,
              cursor: "pointer",
              fontSize: 12,
              fontFamily: "inherit",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Icon name="globe" size={12} /> {t("language_toggle")}
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, toggle, pick } = useT();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.classList.contains("mobile-drawer-open");
    document.body.classList.add("mobile-drawer-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      if (!prev) document.body.classList.remove("mobile-drawer-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <>
      <div
        className={`mobile-drawer-backdrop${open ? " is-open" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`mobile-drawer${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <div className="mobile-drawer-header">
          <Link
            href="/"
            onClick={onClose}
            aria-label="MyClinic home"
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <Image
              src="/myclinic-logo.webp"
              alt="MyClinic — عيادتي"
              width={180}
              height={56}
              style={{ height: 44, width: "auto", display: "block" }}
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="mobile-drawer-close"
            aria-label="Close menu"
          >
            <Icon name="close" size={18} stroke={2.2} />
          </button>
        </div>

        <div className="mobile-drawer-section-label">{pick("Explore", "استكشف")}</div>
        <nav className="mobile-drawer-nav" aria-label="Primary">
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.key}
              href={l.href}
              onClick={onClose}
              className="mobile-drawer-link"
              style={{ animationDelay: open ? `${80 + i * 55}ms` : "0ms" }}
            >
              <span>{t(l.key)}</span>
              <span className="arrow-icon" aria-hidden>
                <Icon name="arrow" size={14} />
              </span>
            </Link>
          ))}
        </nav>

        <div className="mobile-drawer-section-label">{pick("Company", "الشركة")}</div>
        <div className="mobile-drawer-sub">
          {TOPBAR_LINKS.map((l) => (
            <Link key={l.key} href={l.href} onClick={onClose}>
              {t(l.key)}
            </Link>
          ))}
        </div>

        <div className="mobile-drawer-actions">
          <Link
            href="/login"
            onClick={onClose}
            className="btn"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "14px 20px",
              justifyContent: "center",
            }}
          >
            <Icon name="user" size={16} /> {t("login")}
          </Link>
          <a
            href="#"
            onClick={onClose}
            className="btn btn-accent"
            style={{ padding: "14px 20px", justifyContent: "center" }}
          >
            <Icon name="calendar" size={16} /> {t("book_now")}
          </a>
        </div>

        <div className="mobile-drawer-footer">
          <a href="tel:920022811" className="mobile-drawer-hotline">
            <Icon name="phone" size={14} /> {t("hotline")}
          </a>
          <button
            type="button"
            className="mobile-drawer-lang"
            onClick={toggle}
          >
            <Icon name="globe" size={12} /> {t("language_toggle")}
          </button>
        </div>
      </aside>
    </>
  );
}

export function Header() {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return SEARCH_ITEMS.slice(0, 5);

    return SEARCH_ITEMS.map((item) => {
      const haystack = [item.title, item.subtitle, item.type, ...item.keywords]
        .join(" ")
        .toLowerCase();
      const title = item.title.toLowerCase();
      const score =
        title.startsWith(query) ? 4 :
        title.includes(query) ? 3 :
        item.keywords.some((keyword) => keyword.toLowerCase().startsWith(query)) ? 2 :
        haystack.includes(query) ? 1 :
        0;

      return { item, score };
    })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, 6)
      .map(({ item }) => item);
  }, [searchQuery]);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery("");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeSearch, searchOpen]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "white",
        borderBottom: `1px solid ${scrolled ? "var(--ink-200)" : "transparent"}`,
        transition: "border-color .2s, box-shadow .2s",
        boxShadow: scrolled ? "0 2px 10px rgba(10, 30, 60, 0.04)" : "none",
      }}
    >
      <TopBar />
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 24,
          minHeight: 72,
        }}
      >
        {/* Logo (always left in LTR / right in RTL) */}
        <Link
          href="/"
          aria-label="MyClinic home"
          style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}
        >
          <Image
            src="/myclinic-logo.webp"
            alt="MyClinic — عيادتي"
            width={180}
            height={56}
            priority
            className="mc-logo-img"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          className="desktop-only"
          style={{ gap: 4, justifyContent: "center" }}
          aria-label="Primary"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.key}
              href={l.href}
              style={{
                padding: "10px 14px",
                fontSize: 14,
                color: "var(--ink-700)",
                textDecoration: "none",
                fontWeight: 500,
                borderRadius: 6,
                transition: "color .15s, background .15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--brand-800)";
                e.currentTarget.style.background = "var(--brand-50)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--ink-700)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {t(l.key)}
            </a>
          ))}
        </nav>

        {/* Actions — right cluster */}
        <div className="mc-header-actions">
          <button
            type="button"
          onClick={() => setSearchOpen(true)}
            aria-label="Open search"
            className="icon-btn icon-btn-ghost"
          >
            <Icon name="search" size={18} />
          </button>

          {/* Desktop: login with text */}
          <Link
            href="/login"
            className="btn btn-ghost desktop-only"
            style={{ padding: "10px 16px" }}
          >
            <Icon name="user" size={16} /> {t("login")}
          </Link>
          {/* Desktop: book with text */}
          <a
            href="#"
            className="btn btn-primary desktop-only"
            style={{ padding: "12px 20px" }}
          >
            <Icon name="calendar" size={16} /> {t("book_now")}
          </a>

          {/* Mobile: icon-only login */}
          <Link
            href="/login"
            aria-label={t("login")}
            title={t("login")}
            className="icon-btn icon-btn-ghost mobile-only"
          >
            <Icon name="user" size={18} />
          </Link>
          {/* Mobile: icon-only book now (accent) */}
          <a
            href="#"
            aria-label={t("book_now")}
            title={t("book_now")}
            className="icon-btn icon-btn-accent mobile-only"
          >
            <Icon name="calendar" size={18} />
          </a>

          {/* Mobile burger — always last (right-most in LTR, left-most in RTL) */}
          <button
            type="button"
            className={`hamburger-btn mobile-only${menuOpen ? " is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="hamburger-lines" aria-hidden>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div
          className="mc-search-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,31,61,0.75)",
            backdropFilter: "blur(8px)",
            zIndex: 200,
          }}
          onClick={closeSearch}
        >
          <div
            className="container mc-search-modal-wrap"
            style={{ paddingTop: 140 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="mc-search-modal"
              style={{
                background: "white",
                borderRadius: 16,
                padding: 24,
              }}
            >
              <div className="mc-search-input-row">
                <Icon name="search" size={22} />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("search_placeholder")}
                  aria-label={t("search_placeholder")}
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: 20,
                    fontFamily: "inherit",
                    color: "var(--ink-900)",
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="mc-search-clear"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <Icon name="close" size={15} />
                  </button>
                )}
                <button
                  type="button"
                  className="mc-search-esc"
                  onClick={closeSearch}
                >
                  ESC
                </button>
              </div>

              <div className="mc-search-results" aria-live="polite">
                <div className="mc-search-results-head">
                  <span>{searchQuery.trim() ? "Results" : "Popular searches"}</span>
                  <span>{searchResults.length} found</span>
                </div>
                {searchResults.length > 0 ? (
                  <div className="mc-search-result-list">
                    {searchResults.map((result) => (
                      <Link
                        href={result.href}
                        key={`${result.type}-${result.title}`}
                        className="mc-search-result"
                        onClick={closeSearch}
                      >
                        <span className="mc-search-result-icon">
                          <Icon name={result.icon} size={18} />
                        </span>
                        <span className="mc-search-result-copy">
                          <span className="mc-search-result-title">{result.title}</span>
                          <span className="mc-search-result-subtitle">{result.subtitle}</span>
                        </span>
                        <span className="mc-search-result-type">{result.type}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="mc-search-empty">
                    <Icon name="search" size={24} />
                    <strong>No results for “{searchQuery.trim()}”</strong>
                    <span>Try doctor, home care, cardiology, dental, or telemedicine.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
