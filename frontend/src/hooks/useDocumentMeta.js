import { useEffect } from "react";

const SITE_URL = "https://www.franzin.de";
const DEFAULT_TITLE = "GSF – Grafik Service Franzin | Print Engineering Solutions";

function setMetaContent(selector, content) {
  if (!content) return;
  const el = document.querySelector(selector);
  if (el) el.setAttribute("content", content);
}

function setCanonical(path) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  // No trailing slash on sub-paths, to match the URLs listed in sitemap.xml.
  const cleanPath = path === "/" ? "/" : path.replace(/\/+$/, "");
  link.setAttribute("href", `${SITE_URL}${cleanPath}`);
}

// Updates document.title, the meta description, Open Graph title/description
// and the canonical link for the current route. This is a small hand-rolled
// hook rather than react-helmet: adding a new runtime dependency would also
// require regenerating yarn.lock, which isn't reliably done from here - and
// for a handful of static per-page tags, direct DOM updates are simpler and
// dependency-free anyway. Resets to the site-wide defaults on unmount so
// client-side navigation away from a page doesn't leave stale tags behind.
export function useDocumentMeta({ title, description, path } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} – GSF Grafik Service Franzin` : DEFAULT_TITLE;
    document.title = fullTitle;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', fullTitle);
    setMetaContent('meta[property="og:description"]', description);
    if (path) setCanonical(path);

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, description, path]);
}
