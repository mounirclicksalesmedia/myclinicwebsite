"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Icon, type IconName } from "./Icon";
import { useT } from "./I18nProvider";
import type { I18nKey } from "@/app/lib/i18n";

type Mode = "login" | "register";

function Field({
  label,
  type = "text",
  placeholder,
  icon,
  autoComplete,
  required,
  trailing,
  inputType,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  icon: IconName;
  autoComplete?: string;
  required?: boolean;
  trailing?: React.ReactNode;
  inputType?: string;
}) {
  const t = inputType ?? type;
  return (
    <label className="mc-auth-field">
      <span className="mc-auth-field-label">{label}</span>
      <span className="mc-auth-field-input">
        <span className="mc-auth-field-icon" aria-hidden>
          <Icon name={icon} size={16} />
        </span>
        <input
          type={t}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
        />
        {trailing ? <span className="mc-auth-field-trailing">{trailing}</span> : null}
      </span>
    </label>
  );
}

export function AuthForm({ mode }: { mode: Mode }) {
  const { t, lang } = useT();
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isLogin = mode === "login";

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const k = (key: I18nKey) => t(key);

  return (
    <section className="mc-auth-shell">
      <div className="mc-auth-grid">
        {/* Brand panel */}
        <aside className="mc-auth-panel" aria-hidden="true">
          <div className="mc-auth-panel-glow mc-auth-panel-glow-a" />
          <div className="mc-auth-panel-glow mc-auth-panel-glow-b" />
          <div className="mc-auth-panel-grid" />
          <div className="mc-auth-panel-content">
            <div className="mc-auth-panel-top">
              <div className="kicker mc-auth-panel-kicker">
                {k("auth_panel_kicker")}
              </div>
              <h2 className="serif mc-auth-panel-title">
                {k("auth_panel_title")}
              </h2>
              <p className="mc-auth-panel-body">{k("auth_panel_body")}</p>
            </div>

            <ul className="mc-auth-panel-bullets">
              {(
                [
                  { i: "calendar" as IconName, k: "auth_panel_b1" as I18nKey },
                  { i: "video" as IconName, k: "auth_panel_b2" as I18nKey },
                  { i: "shield" as IconName, k: "auth_panel_b3" as I18nKey },
                ]
              ).map((b) => (
                <li key={b.k}>
                  <span className="mc-auth-panel-bullet-icon">
                    <Icon name={b.i} size={16} />
                  </span>
                  <span>{k(b.k)}</span>
                </li>
              ))}
            </ul>

            <div className="mc-auth-panel-trust">
              <div className="mc-auth-trust-stat">
                <span className="serif">14</span>
                <small>{lang === "ar" ? "فروع" : "Branches"}</small>
              </div>
              <div className="mc-auth-trust-stat">
                <span className="serif">850+</span>
                <small>{lang === "ar" ? "استشاري" : "Consultants"}</small>
              </div>
              <div className="mc-auth-trust-stat">
                <span className="serif">4.8</span>
                <small>{lang === "ar" ? "تقييم جوجل" : "Google rating"}</small>
              </div>
            </div>
          </div>
        </aside>

        {/* Form panel */}
        <div className="mc-auth-form-wrap">
          <Link href="/" className="mc-auth-back">
            <Icon name="arrow" size={14} className="mc-auth-back-icon" />
            <span>{k("auth_back")}</span>
          </Link>

          <div className="mc-auth-form-inner">
            <div className="kicker" style={{ marginBottom: 14 }}>
              {isLogin ? k("auth_login_kicker") : k("auth_register_kicker")}
            </div>
            <h1 className="serif mc-auth-heading">
              {isLogin ? k("auth_login_title") : k("auth_register_title")}
            </h1>
            <p className="mc-auth-sub">
              {isLogin ? k("auth_login_sub") : k("auth_register_sub")}
            </p>

            {submitted ? (
              <div className="mc-auth-success">
                <div className="mc-auth-success-icon">
                  <Icon name="check" size={26} stroke={2.4} />
                </div>
                <div className="serif mc-auth-success-title">
                  {isLogin
                    ? lang === "ar"
                      ? "تم تسجيل الدخول"
                      : "Signed in"
                    : lang === "ar"
                      ? "تم إنشاء الحساب"
                      : "Account created"}
                </div>
                <p>
                  {lang === "ar"
                    ? "جارٍ تحويلك إلى لوحة التحكم…"
                    : "Redirecting you to your dashboard…"}
                </p>
              </div>
            ) : (
              <>
                <div className="mc-auth-social">
                  <button type="button" className="mc-auth-social-btn">
                    <Icon name="google" size={18} />
                    <span>{k("auth_google")}</span>
                  </button>
                  <button type="button" className="mc-auth-social-btn">
                    <Icon name="apple" size={18} />
                    <span>{k("auth_apple")}</span>
                  </button>
                </div>

                <div className="mc-auth-divider">
                  <span>{k("auth_or")}</span>
                </div>

                <form className="mc-auth-form" onSubmit={onSubmit} noValidate>
                  {!isLogin && (
                    <div className="mc-auth-row">
                      <Field
                        label={k("auth_full_name")}
                        placeholder={k("auth_full_name_ph")}
                        icon="user"
                        autoComplete="name"
                        required
                      />
                      <Field
                        label={k("auth_phone")}
                        placeholder={k("auth_phone_ph")}
                        icon="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                      />
                    </div>
                  )}

                  <Field
                    label={k("auth_email")}
                    placeholder={k("auth_email_ph")}
                    icon="mail"
                    type="email"
                    autoComplete="email"
                    required
                  />

                  <Field
                    label={k("auth_password")}
                    placeholder={k("auth_password_ph")}
                    icon="shield"
                    inputType={showPw ? "text" : "password"}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    trailing={
                      <button
                        type="button"
                        className="mc-auth-pw-toggle"
                        onClick={() => setShowPw((v) => !v)}
                        aria-label={showPw ? k("auth_hide") : k("auth_show")}
                      >
                        {showPw ? k("auth_hide") : k("auth_show")}
                      </button>
                    }
                  />

                  {!isLogin && (
                    <Field
                      label={k("auth_confirm_password")}
                      placeholder={k("auth_password_ph")}
                      icon="shield"
                      inputType={showPw2 ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      trailing={
                        <button
                          type="button"
                          className="mc-auth-pw-toggle"
                          onClick={() => setShowPw2((v) => !v)}
                          aria-label={showPw2 ? k("auth_hide") : k("auth_show")}
                        >
                          {showPw2 ? k("auth_hide") : k("auth_show")}
                        </button>
                      }
                    />
                  )}

                  {isLogin ? (
                    <div className="mc-auth-meta">
                      <label className="mc-auth-check">
                        <input type="checkbox" defaultChecked />
                        <span className="mc-auth-check-box" aria-hidden>
                          <Icon name="check" size={12} stroke={2.6} />
                        </span>
                        <span>{k("auth_remember")}</span>
                      </label>
                      <a href="#" className="mc-auth-link">
                        {k("auth_forgot")}
                      </a>
                    </div>
                  ) : (
                    <label className="mc-auth-check mc-auth-check-block">
                      <input type="checkbox" required />
                      <span className="mc-auth-check-box" aria-hidden>
                        <Icon name="check" size={12} stroke={2.6} />
                      </span>
                      <span>
                        {k("auth_terms_prefix")}{" "}
                        <a href="#" className="mc-auth-link">
                          {k("auth_terms_link")}
                        </a>{" "}
                        {k("auth_terms_and")}{" "}
                        <a href="#" className="mc-auth-link">
                          {k("auth_privacy_link")}
                        </a>
                        .
                      </span>
                    </label>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary mc-auth-submit"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="mc-auth-spinner" aria-hidden />
                    ) : (
                      <Icon name="arrow" size={14} />
                    )}
                    <span>
                      {isLogin ? k("auth_login_cta") : k("auth_register_cta")}
                    </span>
                  </button>
                </form>

                <div className="mc-auth-switch">
                  {isLogin ? (
                    <>
                      <span>{k("auth_no_account")}</span>{" "}
                      <Link href="/register" className="mc-auth-link">
                        {k("auth_create_link")}
                      </Link>
                    </>
                  ) : (
                    <>
                      <span>{k("auth_have_account")}</span>{" "}
                      <Link href="/login" className="mc-auth-link">
                        {k("auth_signin_link")}
                      </Link>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
