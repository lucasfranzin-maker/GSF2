import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/i18n/LanguageContext";

// Reusable contact CTA with a strong, accessible conversion path.
export const ContactCTA = () => {
  const { t } = useLang();
  return (
    <section className="gsf-section" data-testid="contact-cta">
      <div className="gsf-container">
        <Reveal>
          <div className="gsf-panel gsf-cta-panel !p-8 md:!p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
              <div className="flex items-start gap-5 md:gap-7 max-w-3xl">
                <div
                  className="hidden sm:inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px]"
                  style={{ backgroundColor: "var(--gsf-blue-soft)", color: "var(--gsf-blue)" }}
                  aria-hidden="true"
                >
                  <MessageSquareText size={23} strokeWidth={1.6} />
                </div>
                <div>
                  <div className="gsf-kicker mb-3">GSF / DIRECT CONTACT</div>
                  <h2 className="gsf-h2">{t.contactCta.title}</h2>
                  <p className="gsf-body mt-4 max-w-xl">{t.contactCta.text}</p>
                </div>
              </div>
              <Link to="/kontakt" className="gsf-btn-primary shrink-0" data-testid="cta-strip-contact-link">
                {t.common.contactCta}
                <ArrowRight size={16} strokeWidth={2} className="gsf-arrow" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
