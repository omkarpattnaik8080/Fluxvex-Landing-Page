import { useEffect } from "react";

const SITE_URL = "https://www.fluxvex.com";
const INDEXABLE_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1";

function upsertMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [tag, key] = selector.replace(/[\[\]']/g, "").split("=");
    el.setAttribute(tag === "meta" ? "name" : "property", key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Per-route <title>, description, canonical and og:url (static head remains the SEO floor). */
export const Seo = ({ title, description, path = "/", noindex = false }) => {
  useEffect(() => {
    upsertMeta('meta[name="robots"]', "name", noindex ? "noindex, nofollow" : INDEXABLE_ROBOTS);
    const url = `${SITE_URL}${path}`;
    upsertCanonical(url);
    upsertMeta('meta[property="og:url"]', "property", url);
    if (title) document.title = title;
    if (description) {
      upsertMeta('meta[name="description"]', "name", description);
      upsertMeta('meta[property="og:title"]', "property", title || document.title);
      upsertMeta('meta[property="og:description"]', "property", description);
      upsertMeta('meta[name="twitter:title"]', "name", title || document.title);
      upsertMeta('meta[name="twitter:description"]', "name", description);
    }
  }, [title, description, path, noindex]);
  return null;
};

export default Seo;
