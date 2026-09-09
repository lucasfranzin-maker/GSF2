import React, { useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin, Printer, ArrowRight, CheckCircle2, Building2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { DashedRule } from "@/components/DashedRule";
import { useLang } from "@/i18n/LanguageContext";
import { LOCATIONS_CONTACT } from "@/i18n/translations";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM = { name: "", company: "", email: "", phone: "", location: "", subject: "", message: "", website: "" };
const INPUT_BASE = "gsf-input w-full rounded-[8px] border bg-white px-4 py-3 text-[15px] outline-none";
const LABEL_CLASS = "block font-mono-tech text-[11px] uppercase tracking-[0.16em] mb-2";
const AUTO_COMPLETE = { name: "name", company: "organization", email: "email", phone: "tel", subject: "off" };

export default function Kontakt() {
  const { t, lang } = useLang();
  const p = t.pages.kontakt;
  const f = p.form;
  useDocumentMeta({ title: p.label, description: p.intro, path: "/kontakt" });

  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const setField = (k) => (e) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = true;
    if (!form.company.trim()) next.company = true;
    if (!form.email.trim() || !EMAIL_RE.test(form.email)) next.email = form.email.trim() ? "email" : true;
    if (!form.message.trim()) next.message = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error(f.errorRequired);
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, { ...form, lang });
      setSuccess(true);
      toast.success(f.successTitle);
      setForm({ ...EMPTY_FORM });
    } catch (err) {
      console.error("contact submit failed", err);
      toast.error(f.errorSend);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader label={p.label} icon={Mail} headline={p.headline} intro={p.intro} />

      <section className="gsf-section pt-8">
        <div className="gsf-container grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7">
            {success ? (
              <Reveal>
                <div className="gsf-panel !p-10 flex flex-col items-start gap-5" data-testid="contact-form-success-message">
                  <CheckCircle2 size={40} strokeWidth={1.4} style={{ color: "var(--gsf-success)" }} />
                  <h2 className="gsf-h2">{f.successTitle}</h2>
                  <p className="gsf-body max-w-md">{f.successText}</p>
                  <button type="button" className="gsf-link mt-2" onClick={() => setSuccess(false)} data-testid="contact-form-reset-button">
                    {f.another}
                    <ArrowRight size={15} strokeWidth={2} className="gsf-arrow" />
                  </button>
                </div>
              </Reveal>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="gsf-panel !p-6 sm:!p-8" data-testid="contact-form">
                {/* Honeypot: hidden from real visitors, often auto-filled by simple bots. */}
                <div style={{ position: "absolute", left: "-9999px", top: "-9999px", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
                  <label htmlFor="cf-website">Website</label>
                  <input
                    id="cf-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={setField("website")}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <ContactField id="cf-name" field="name" required form={form} errors={errors} labels={f} onChange={setField} />
                  <ContactField id="cf-company" field="company" required form={form} errors={errors} labels={f} onChange={setField} />
                  <ContactField id="cf-email" field="email" type="email" required form={form} errors={errors} labels={f} onChange={setField} />
                  <ContactField id="cf-phone" field="phone" form={form} errors={errors} labels={f} onChange={setField} />

                  <div className="">
                    <label htmlFor="cf-location" className={LABEL_CLASS} style={{ color: "var(--gsf-muted)" }}>{f.location}</label>
                    <select
                      id="cf-location"
                      name="location"
                      value={form.location}
                      onChange={setField("location")}
                      className={INPUT_BASE}
                      style={fieldStyle(false)}
                      data-testid="contact-form-location-select"
                    >
                      <option value="">{f.locationPlaceholder}</option>
                      {f.locationOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>

                  <ContactField id="cf-subject" field="subject" form={form} errors={errors} labels={f} onChange={setField} />

                  <div className="sm:col-span-2">
                    <label htmlFor="cf-message" className={LABEL_CLASS} style={{ color: "var(--gsf-muted)" }}>
                      {f.message} <span style={{ color: "var(--gsf-danger)" }}>*</span>
                    </label>
                    <textarea
                      id="cf-message"
                      rows={6}
                      value={form.message}
                      onChange={setField("message")}
                      className={INPUT_BASE + " resize-y"}
                      style={fieldStyle(errors.message)}
                      data-testid="contact-form-message-textarea"
                      aria-invalid={!!errors.message}
                      aria-required
                      aria-describedby={errors.message ? "cf-message-error" : undefined}
                    />
                    {errors.message ? (
                      <p id="cf-message-error" className="mt-1.5 text-xs" style={{ color: "var(--gsf-danger)" }} role="alert">
                        {f.message} – {f.required}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-7 flex items-center gap-5">
                  <button type="submit" className="gsf-btn-primary" disabled={submitting} data-testid="contact-form-submit-button">
                    {submitting ? f.sending : f.submit}
                    {!submitting && <ArrowRight size={16} strokeWidth={2} className="gsf-arrow" />}
                  </button>
                  <span className="font-mono-tech text-[11px]" style={{ color: "var(--gsf-muted)" }}>* {f.required}</span>
                </div>
              </form>
            )}
          </div>

          {/* Direct contact */}
          <div className="lg:col-span-5">
            <div className="gsf-kicker mb-6">{p.directTitle}</div>
            <div className="flex flex-col gap-6">
              <ContactBlock
                icon={Building2}
                title={`Cape Town · ${t.common.headOffice}`}
                lines={["Grafik Service Franzin (Pty) Ltd.", "4 School Street, Unit 96", "Platinum Junction Business Park", "Milnerton 7441, Cape Town, South Africa"]}
              />
              <DashedRule />
              <ContactBlock
                icon={Building2}
                title={`Durban · ${t.common.branchOffice}`}
                lines={["Grafik Service Franzin (Pty) Ltd.", "73 Nguni Way Rd, Unit 53", "Acacia Business Park", "Hillcrest 3610, Durban, South Africa"]}
              />
              <DashedRule />
              <div className="flex flex-col gap-2.5">
                <a href={`tel:${LOCATIONS_CONTACT.phoneCapeTown.replace(/[^+\d]/g, "")}`} className="flex items-center gap-3 gsf-body hover:text-[color:var(--gsf-blue)] transition-colors" data-testid="contact-phone-sa">
                  <Phone size={16} strokeWidth={1.6} style={{ color: "var(--gsf-blue)" }} /> {LOCATIONS_CONTACT.phoneCapeTown}
                </a>
                <div className="flex items-center gap-3 gsf-body">
                  <Printer size={16} strokeWidth={1.6} style={{ color: "var(--gsf-blue)" }} /> {LOCATIONS_CONTACT.faxCapeTown}
                </div>
                <a href={`mailto:${LOCATIONS_CONTACT.emailSales}`} className="flex items-center gap-3 gsf-body hover:text-[color:var(--gsf-blue)] transition-colors" data-testid="contact-email-sales">
                  <Mail size={16} strokeWidth={1.6} style={{ color: "var(--gsf-blue)" }} /> {LOCATIONS_CONTACT.emailSales}
                </a>
                <a href={`mailto:${LOCATIONS_CONTACT.emailInfo}`} className="flex items-center gap-3 gsf-body hover:text-[color:var(--gsf-blue)] transition-colors" data-testid="contact-email-info">
                  <Mail size={16} strokeWidth={1.6} style={{ color: "var(--gsf-blue)" }} /> {LOCATIONS_CONTACT.emailInfo}
                </a>
              </div>
              <DashedRule />
              <div className="flex items-start gap-3 gsf-body text-sm">
                <MapPin size={16} strokeWidth={1.6} style={{ color: "var(--gsf-blue)" }} className="mt-0.5" />
                <span>{lang === "de" ? "Deutschland (vertreten durch):" : "Germany (represented by):"} {LOCATIONS_CONTACT.managingDirector}, Linnthun 12, 25578 Dägeling · {LOCATIONS_CONTACT.phoneGermany}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const fieldStyle = (invalid) => ({
  borderColor: invalid ? "var(--gsf-danger)" : "var(--gsf-border)",
  color: "var(--gsf-ink)",
});

const ContactField = ({ id, field, type = "text", required, form, errors, labels, onChange }) => {
  const errorId = `${id}-error`;
  const error = errors[field];

  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS} style={{ color: "var(--gsf-muted)" }}>
        {labels[field]} {required ? <span style={{ color: "var(--gsf-danger)" }}>*</span> : null}
      </label>
      <input
        id={id}
        name={field}
        type={type}
        value={form[field]}
        onChange={onChange(field)}
        autoComplete={AUTO_COMPLETE[field]}
        className={INPUT_BASE}
        style={fieldStyle(error)}
        data-testid={`contact-form-${field}-input`}
        aria-invalid={!!error}
        aria-required={!!required}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs" style={{ color: "var(--gsf-danger)" }} role="alert">
          {error === "email" ? labels.errorEmail : `${labels[field]} – ${labels.required}`}
        </p>
      ) : null}
    </div>
  );
};

const ContactBlock = ({ icon: Icon, title, lines }) => (
  <div className="flex items-start gap-3">
    <Icon size={18} strokeWidth={1.5} style={{ color: "var(--gsf-blue)" }} className="mt-0.5 shrink-0" />
    <div>
      <div className="gsf-h3 text-sm">{title}</div>
      <div className="mt-1.5 flex flex-col gap-0.5">
        {lines.map((l, i) => (
          <span key={i} className="gsf-body text-[13px] leading-snug">{l}</span>
        ))}
      </div>
    </div>
  </div>
);
