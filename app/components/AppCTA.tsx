"use client";

import { Icon } from "./Icon";
import { useT } from "./I18nProvider";

export function AppCTA() {
  const { t, pick } = useT();

  return (
    <section className="section" style={{ background: "white" }}>
      <div className="container">
        <div
          className="mc-app-cta"
          style={{
            background: "linear-gradient(135deg, var(--brand-800) 0%, var(--brand-900) 100%)",
            borderRadius: 24,
            padding: "80px 72px",
            color: "white",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 64,
            alignItems: "center",
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
                "radial-gradient(circle at 85% 20%, rgba(47,181,164,0.25), transparent 50%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative" }}>
            <div className="kicker" style={{ marginBottom: 16, color: "var(--accent-400)" }}>
              {t("app_kicker")}
            </div>
            <h2
              className="serif"
              style={{ color: "white", marginBottom: 20, fontSize: "clamp(32px, 3.4vw, 44px)" }}
            >
              {t("app_title")}
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: 16,
                marginBottom: 28,
                maxWidth: 480,
              }}
            >
              {t("app_body")}
            </p>
            <div className="flex" style={{ gap: 12, marginBottom: 36, flexWrap: "wrap" }}>
              <a
                href="#"
                style={{
                  background: "white",
                  color: "var(--brand-900)",
                  borderRadius: 10,
                  padding: "10px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  textDecoration: "none",
                }}
              >
                <Icon name="apple" size={28} stroke={0} />
                <div>
                  <div style={{ fontSize: 10, opacity: 0.7 }}>{pick("Download on the", "متوفر على")}</div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{pick("App Store", "آب ستور")}</div>
                </div>
              </a>
              <a
                href="#"
                style={{
                  background: "white",
                  color: "var(--brand-900)",
                  borderRadius: 10,
                  padding: "10px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  textDecoration: "none",
                }}
              >
                <Icon name="google" size={28} stroke={0} />
                <div>
                  <div style={{ fontSize: 10, opacity: 0.7 }}>{pick("Get it on", "احصل عليه من")}</div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{pick("Google Play", "جوجل بلاي")}</div>
                </div>
              </a>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 32,
                paddingTop: 28,
                borderTop: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div>
                <div className="serif" style={{ fontSize: 26, fontWeight: 500 }}>
                  {pick("1.2M+", "+١٫٢ مليون")}
                </div>
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>
                  {pick("Downloads", "تنزيلات")}
                </div>
              </div>
              <div>
                <div className="serif" style={{ fontSize: 26, fontWeight: 500 }}>
                  {pick("4.7★", "★٤٫٧")}
                </div>
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>
                  {pick("App Store", "آب ستور")}
                </div>
              </div>
              <div>
                <div className="serif" style={{ fontSize: 26, fontWeight: 500 }}>
                  {pick("4.8★", "★٤٫٨")}
                </div>
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>
                  {pick("Google Play", "جوجل بلاي")}
                </div>
              </div>
            </div>
          </div>

          <div className="mc-phone-mockup" style={{ position: "relative", width: 280, height: 560 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 36,
                background: "#111",
                padding: 12,
                boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 26,
                  background: "var(--brand-50)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ padding: 20, background: "var(--brand-800)", color: "white" }}>
                  <div style={{ fontSize: 10, opacity: 0.7, letterSpacing: "0.12em" }}>
                    {pick("Good morning", "صباح الخير")}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>
                    {pick("Ahmed 👋", "أحمد 👋")}
                  </div>
                </div>
                <div
                  style={{
                    margin: 12,
                    padding: 12,
                    background: "white",
                    borderRadius: 12,
                    border: "1px solid var(--ink-200)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      color: "var(--accent-600)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {pick("Upcoming", "القادم")}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--brand-900)",
                      marginTop: 4,
                    }}
                  >
                    {pick("Dr. Hala · Cardiology", "د. هالة · أمراض القلب")}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--ink-500)", marginTop: 2 }}>
                    {pick("Today · 14:00 · Video", "اليوم · ١٤:٠٠ · فيديو")}
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 8,
                    margin: 12,
                  }}
                >
                  {[
                    { en: "Book", ar: "احجز" },
                    { en: "Records", ar: "السجلات" },
                    { en: "Home visit", ar: "زيارة منزلية" },
                    { en: "Telehealth", ar: "طب عن بُعد" },
                  ].map((a) => (
                    <div
                      key={a.en}
                      style={{
                        background: "white",
                        border: "1px solid var(--ink-200)",
                        borderRadius: 10,
                        padding: 10,
                        fontSize: 10,
                        color: "var(--brand-900)",
                        fontWeight: 600,
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          background: "var(--accent-50)",
                          color: "var(--accent-600)",
                          display: "grid",
                          placeItems: "center",
                          marginBottom: 6,
                        }}
                      >
                        <Icon name="plus" size={12} />
                      </div>
                      {pick(a.en, a.ar)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: 20,
                left: "50%",
                transform: "translateX(-50%)",
                width: 100,
                height: 20,
                background: "#111",
                borderRadius: 12,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
