import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Lock, RefreshCw, LogOut, Inbox, ArrowRight, Settings, Save } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const TOKEN_KEY = "gsf-admin-token";

export default function Admin() {
  const { lang } = useLang();
  const de = lang === "de";
  const T = {
    title: de ? "Anfragen-Übersicht" : "Inquiries overview",
    subtitle: de ? "Interner Bereich · eingegangene Kontaktanfragen" : "Internal area · received contact inquiries",
    login: de ? "Anmelden" : "Sign in",
    password: de ? "Passwort" : "Password",
    wrong: de ? "Ungültiges Passwort." : "Invalid password.",
    empty: de ? "Noch keine Anfragen vorhanden." : "No inquiries yet.",
    refresh: de ? "Aktualisieren" : "Refresh",
    logout: de ? "Abmelden" : "Sign out",
    count: de ? "Anfragen" : "inquiries",
    cols: de
      ? ["Datum", "Name", "Unternehmen", "E-Mail", "Telefon", "Standort", "Betreff", "Nachricht", "E-Mail"]
      : ["Date", "Name", "Company", "Email", "Phone", "Location", "Subject", "Message", "Email"],
    hint: de ? "Zugang nur für GSF-Mitarbeiter." : "Access for GSF staff only.",
    settingsTitle: de ? "Benachrichtigungs-Einstellungen" : "Notification settings",
    recipientLabel: de ? "Empfänger-E-Mail für Kontaktanfragen" : "Recipient email for contact inquiries",
    recipientHint: de
      ? "An diese Adresse schickt Resend neue Kontaktanfragen. Im Resend-Testmodus wird nur an die Konto-E-Mail zugestellt."
      : "New contact inquiries are sent here via Resend. In Resend test mode, delivery only works to the account owner's email.",
    save: de ? "Speichern" : "Save",
    saved: de ? "Gespeichert." : "Saved.",
    saveFailed: de ? "Speichern fehlgeschlagen." : "Failed to save.",
    settingsUnavailable: de
      ? "Einstellungen konnten nicht geladen werden."
      : "Could not load settings.",
  };

  const [token, setToken] = useState(() => (typeof window !== "undefined" ? window.sessionStorage.getItem(TOKEN_KEY) || "" : ""));
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState(null);

  const [recipient, setRecipient] = useState("");
  const [recipientInput, setRecipientInput] = useState("");
  const [settingsError, setSettingsError] = useState("");
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const fetchContacts = useCallback(async (tok) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API}/contact`, { headers: { "X-Admin-Token": tok } });
      setContacts(res.data);
    } catch (e) {
      if (e?.response?.status === 401) {
        setError(T.wrong);
        setToken("");
        window.sessionStorage.removeItem(TOKEN_KEY);
        setContacts(null);
      }
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [T.wrong]);

  const fetchSettings = useCallback(async (tok) => {
    setSettingsError("");
    try {
      const res = await axios.get(`${API}/admin/settings`, { headers: { "X-Admin-Token": tok } });
      setRecipient(res.data.contact_recipient || "");
      setRecipientInput(res.data.contact_recipient || "");
    } catch (e) {
      setSettingsError(T.settingsUnavailable);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [T.settingsUnavailable]);

  useEffect(() => {
    if (token) {
      fetchContacts(token);
      fetchSettings(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post(`${API}/admin/login`, {}, { headers: { "X-Admin-Token": pw } });
      window.sessionStorage.setItem(TOKEN_KEY, pw);
      setToken(pw);
      await fetchContacts(pw);
      await fetchSettings(pw);
    } catch (e) {
      setError(T.wrong);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setContacts(null);
    setPw("");
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSettingsError("");
    setSettingsSaved(false);
    setSettingsSaving(true);
    try {
      const res = await axios.put(
        `${API}/admin/settings`,
        { contact_recipient: recipientInput },
        { headers: { "X-Admin-Token": token } }
      );
      setRecipient(res.data.contact_recipient || "");
      setRecipientInput(res.data.contact_recipient || "");
      setSettingsSaved(true);
    } catch (e) {
      setSettingsError(T.saveFailed);
    } finally {
      setSettingsSaving(false);
    }
  };

  const fmtDate = (iso) => {
    try {
      return new Date(iso).toLocaleString(de ? "de-DE" : "en-GB", { dateStyle: "medium", timeStyle: "short" });
    } catch {
      return iso;
    }
  };

  // --- Login gate ---
  if (!token) {
    return (
      <section className="gsf-section">
        <div className="gsf-container max-w-md">
          <div className="gsf-panel !p-8">
            <div className="flex items-center gap-3">
              <Lock size={22} strokeWidth={1.6} style={{ color: "var(--gsf-blue)" }} />
              <h1 className="gsf-h3">{T.title}</h1>
            </div>
            <p className="gsf-body mt-3 text-sm">{T.hint}</p>
            <form onSubmit={handleLogin} className="mt-6" noValidate>
              <label htmlFor="admin-pw" className="block font-mono-tech text-[11px] uppercase tracking-[0.16em] mb-2" style={{ color: "var(--gsf-muted)" }}>{T.password}</label>
              <input
                id="admin-pw"
                type="password"
                value={pw}
                onChange={(e) => { setPw(e.target.value); setError(""); }}
                className="w-full rounded-[8px] border bg-white px-4 py-3 text-[15px] outline-none"
                style={{ borderColor: error ? "var(--gsf-danger)" : "var(--gsf-border)", color: "var(--gsf-ink)" }}
                data-testid="admin-password-input"
                autoFocus
              />
              {error ? <p className="mt-2 text-xs" style={{ color: "var(--gsf-danger)" }} data-testid="admin-login-error">{error}</p> : null}
              <button type="submit" className="gsf-btn-primary mt-5 w-full" disabled={loading} data-testid="admin-login-button">
                {loading ? "…" : T.login}
                {!loading && <ArrowRight size={16} strokeWidth={2} />}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  // --- Dashboard ---
  return (
    <section className="gsf-section">
      <div className="gsf-container">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="gsf-kicker">{T.subtitle}</div>
            <h1 className="gsf-h2 mt-2 flex items-center gap-3">
              <Inbox size={28} strokeWidth={1.5} style={{ color: "var(--gsf-blue)" }} />
              {T.title}
            </h1>
            {contacts ? <p className="gsf-body mt-2 text-sm">{contacts.length} {T.count}</p> : null}
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => fetchContacts(token)} className="gsf-btn-secondary !py-2.5 !px-4 text-[12px]" data-testid="admin-refresh-button">
              <RefreshCw size={15} strokeWidth={1.8} className={loading ? "animate-spin" : ""} />
              {T.refresh}
            </button>
            <button type="button" onClick={handleLogout} className="gsf-btn-secondary !py-2.5 !px-4 text-[12px]" data-testid="admin-logout-button">
              <LogOut size={15} strokeWidth={1.8} />
              {T.logout}
            </button>
          </div>
        </div>

        <div className="mt-8 gsf-panel !p-6">
          <div className="flex items-center gap-3">
            <Settings size={18} strokeWidth={1.6} style={{ color: "var(--gsf-blue)" }} />
            <h2 className="gsf-h3 !text-base">{T.settingsTitle}</h2>
          </div>
          <form onSubmit={handleSaveSettings} className="mt-4 flex flex-col sm:flex-row sm:items-end gap-3" noValidate>
            <div className="flex-1">
              <label htmlFor="admin-recipient" className="block font-mono-tech text-[11px] uppercase tracking-[0.16em] mb-2" style={{ color: "var(--gsf-muted)" }}>
                {T.recipientLabel}
              </label>
              <input
                id="admin-recipient"
                type="email"
                required
                value={recipientInput}
                onChange={(e) => { setRecipientInput(e.target.value); setSettingsSaved(false); }}
                className="w-full rounded-[8px] border bg-white px-4 py-3 text-[15px] outline-none"
                style={{ borderColor: "var(--gsf-border)", color: "var(--gsf-ink)" }}
                data-testid="admin-recipient-input"
              />
              <p className="gsf-body mt-2 text-xs">{T.recipientHint}</p>
            </div>
            <button type="submit" className="gsf-btn-primary !py-3 !px-5" disabled={settingsSaving || recipientInput === recipient} data-testid="admin-settings-save-button">
              <Save size={15} strokeWidth={1.8} />
              {settingsSaving ? "…" : T.save}
            </button>
          </form>
          {settingsSaved ? <p className="mt-2 text-xs" style={{ color: "var(--gsf-success)" }} data-testid="admin-settings-saved">{T.saved}</p> : null}
          {settingsError ? <p className="mt-2 text-xs" style={{ color: "var(--gsf-danger)" }} data-testid="admin-settings-error">{settingsError}</p> : null}
        </div>

        <div className="mt-8 gsf-panel !p-0 overflow-hidden">
          {contacts && contacts.length === 0 ? (
            <div className="p-10 text-center gsf-body" data-testid="admin-empty">{T.empty}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm" data-testid="admin-contacts-table">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--gsf-border)", background: "var(--gsf-surface-2)" }}>
                    {T.cols.map((c) => (
                      <th key={c} className="font-mono-tech text-[10px] uppercase tracking-[0.14em] px-4 py-3 whitespace-nowrap" style={{ color: "var(--gsf-muted)" }}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(contacts || []).map((row) => (
                    <tr key={row.id} style={{ borderBottom: "1px solid var(--gsf-border)" }} className="align-top">
                      <td className="px-4 py-3 whitespace-nowrap font-mono-tech text-xs" style={{ color: "var(--gsf-muted)" }}>{fmtDate(row.createdAt)}</td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium" style={{ color: "var(--gsf-ink)" }}>{row.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{row.company}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><a href={`mailto:${row.email}`} className="hover:text-[color:var(--gsf-blue)]">{row.email}</a></td>
                      <td className="px-4 py-3 whitespace-nowrap">{row.phone || "–"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{row.location || "–"}</td>
                      <td className="px-4 py-3">{row.subject || "–"}</td>
                      <td className="px-4 py-3 min-w-[240px] max-w-[360px]"><span className="gsf-body text-[13px] whitespace-pre-wrap">{row.message}</span></td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-mono-tech text-[10px] uppercase px-2 py-1 rounded" style={{
                          color: row.email_status === "sent" ? "var(--gsf-success)" : "var(--gsf-danger)",
                          background: row.email_status === "sent" ? "rgba(6,118,71,0.08)" : "rgba(180,35,24,0.08)",
                        }}>{row.email_status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
