import { useEffect } from "react";

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

/** Per-route <title> + description for the SPA (static head remains the SEO floor). */
export const Seo = ({ title, description }) => {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      upsertMeta('meta[name="description"]', "name", description);
      upsertMeta('meta[property="og:title"]', "property", title || document.title);
      upsertMeta('meta[property="og:description"]', "property", description);
      upsertMeta('meta[name="twitter:title"]', "name", title || document.title);
      upsertMeta('meta[name="twitter:description"]', "name", description);
    }
  }, [title, description]);
  return null;
};

export default Seo;
