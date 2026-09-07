import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/i18n/LanguageContext";

// Reusable contact CTA strip (bordered white, no gradient).
export const ContactCTA = () => {
  const { t } = useLang();
  return (
    <section className="gsf-section" data-testid="contact-cta">
      <div className="gsf-container">
        <Reveal>
          <div className="gsf-panel !p-8 md:!p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="gsf-h2">{t.contactCta.title}</h2>
              <p className="gsf-body mt-4 max-w-xl">{t.contactCta.text}</p>
            </div>
            <Link to="/kontakt" className="gsf-btn-primary shrink-0" data-testid="cta-strip-contact-link">
              {t.common.contactCta}
              <ArrowRight size={16} strokeWidth={2} className="gsf-arrow" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
