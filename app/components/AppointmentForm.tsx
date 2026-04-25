"use client";

import { useState, type FormEvent } from "react";
import { Icon, type IconName } from "./Icon";
import { useT } from "./I18nProvider";

type Bi = { en: string; ar: string };

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 12,
          color: "var(--ink-700)",
          marginBottom: 6,
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "12px 14px",
          border: "1px solid var(--ink-200)",
          borderRadius: 10,
          fontFamily: "inherit",
          fontSize: 14,
          color: "var(--ink-900)",
          outline: "none",
          background: "white",
        }}
      />
    </div>
  );
}

function Select({
  label,
  opts,
  selectPrompt,
}: {
  label: string;
  opts: string[];
  selectPrompt: string;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 12,
          color: "var(--ink-700)",
          marginBottom: 6,
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      <select
        style={{
          width: "100%",
          padding: "12px 14px",
          border: "1px solid var(--ink-200)",
          borderRadius: 10,
          fontFamily: "inherit",
          fontSize: 14,
          color: "var(--ink-900)",
          outline: "none",
          background: "white",
          cursor: "pointer",
        }}
      >
        <option value="">{selectPrompt}</option>
        {opts.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

const CONTACT: { icon: IconName; l: Bi; v: Bi }[] = [
  {
    icon: "phone",
    l: { en: "Hotline (24/7)", ar: "الخط الساخن (٢٤/٧)" },
    v: { en: "920 022 811", ar: "٩٢٠ ٠٢٢ ٨١١" },
  },
  {
    icon: "mail",
    l: { en: "Email", ar: "البريد الإلكتروني" },
    v: { en: "care@myclinic.com.sa", ar: "care@myclinic.com.sa" },
  },
  {
    icon: "pin",
    l: { en: "Headquarters", ar: "المقر الرئيسي" },
    v: {
      en: "King Fahd Road, Riyadh 12333",
      ar: "طريق الملك فهد، الرياض ١٢٣٣٣",
    },
  },
];

const SPECIALTY_OPTS: Bi[] = [
  { en: "Cardiology", ar: "أمراض القلب" },
  { en: "Dermatology", ar: "الأمراض الجلدية" },
  { en: "Dental", ar: "طب الأسنان" },
  { en: "Pediatrics", ar: "طب الأطفال" },
];

const CITY_OPTS: Bi[] = [
  { en: "Riyadh", ar: "الرياض" },
  { en: "Jeddah", ar: "جدة" },
  { en: "Dammam", ar: "الدمام" },
  { en: "Makkah", ar: "مكة" },
];

export function AppointmentForm() {
  const { t, pick } = useT();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section" style={{ background: "var(--ink-50)" }}>
      <div className="container">
        <div
          className="mc-form-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          <div>
            <div className="kicker" style={{ marginBottom: 16 }}>
              {t("form_kicker")}
            </div>
            <h2 className="serif" style={{ marginBottom: 20 }}>
              {t("form_title")}
            </h2>
            <p style={{ fontSize: 16, marginBottom: 32 }}>{t("form_body")}</p>
            <div style={{ display: "grid", gap: 16 }}>
              {CONTACT.map((c) => (
                <div key={c.l.en} className="flex" style={{ gap: 14, alignItems: "center" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "white",
                      border: "1px solid var(--ink-200)",
                      color: "var(--brand-800)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Icon name={c.icon} size={16} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--ink-500)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {pick(c.l.en, c.l.ar)}
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        color: "var(--brand-900)",
                        fontWeight: 600,
                        marginTop: 2,
                      }}
                    >
                      {pick(c.v.en, c.v.ar)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            className="mc-appointment-form"
            onSubmit={onSubmit}
            style={{
              background: "white",
              borderRadius: 20,
              padding: 32,
              border: "1px solid var(--ink-200)",
            }}
          >
            {submitted ? (
              <div style={{ padding: "60px 20px", textAlign: "center" }}>
                <div
                  className="mc-form-row"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "var(--accent-50)",
                    color: "var(--accent-600)",
                    display: "grid",
                    placeItems: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <Icon name="check" size={28} stroke={2.5} />
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: 24,
                    fontWeight: 500,
                    color: "var(--brand-900)",
                    marginBottom: 8,
                  }}
                >
                  {pick("Request received", "تم استلام الطلب")}
                </div>
                <p>
                  {pick(
                    "A care coordinator will reach out within 2 business hours.",
                    "سيتواصل معك منسق الرعاية خلال ساعتي عمل.",
                  )}
                </p>
              </div>
            ) : (
              <>
                <div
                  className="mc-form-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    marginBottom: 16,
                  }}
                >
                  <Field
                    label={t("name")}
                    placeholder={pick("Ahmed Al-Rashid", "أحمد الراشد")}
                  />
                  <Field
                    label={t("phone")}
                    placeholder={pick("+966 5X XXX XXXX", "+٩٦٦ ٥X XXX XXXX")}
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <Field
                    label={t("email")}
                    placeholder={pick("ahmed@example.com", "ahmed@example.com")}
                    type="email"
                  />
                </div>
                <div
                  className="mc-form-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    marginBottom: 16,
                  }}
                >
                  <Select
                    label={t("specialty")}
                    selectPrompt={pick("Select…", "اختر…")}
                    opts={SPECIALTY_OPTS.map((o) => pick(o.en, o.ar))}
                  />
                  <Select
                    label={t("city")}
                    selectPrompt={pick("Select…", "اختر…")}
                    opts={CITY_OPTS.map((o) => pick(o.en, o.ar))}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "var(--ink-700)",
                      marginBottom: 6,
                      fontWeight: 500,
                    }}
                  >
                    {t("message")}
                  </label>
                  <textarea
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: "1px solid var(--ink-200)",
                      borderRadius: 10,
                      fontFamily: "inherit",
                      fontSize: 14,
                      color: "var(--ink-900)",
                      outline: "none",
                      resize: "vertical",
                      background: "white",
                    }}
                    placeholder={pick(
                      "Briefly describe what you need…",
                      "صف باختصار ما تحتاجه…",
                    )}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "16px" }}
                >
                  <Icon name="arrow" size={14} /> {t("submit")}
                </button>
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--ink-500)",
                    marginTop: 12,
                    textAlign: "center",
                  }}
                >
                  {pick(
                    "By submitting, you agree to our privacy policy. All data is encrypted.",
                    "بإرسالك الطلب فإنك توافق على سياسة الخصوصية. جميع البيانات مشفرة.",
                  )}
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
