import { POSTS_1 } from "./posts1";
import { POSTS_2 } from "./posts2";

export const AUTHORS = {
  omkar: { name: "Omkar", role: "Fluxvex" },
  sakti: { name: "Sakti", role: "Fluxvex" },
  sneha: { name: "Sneha", role: "Fluxvex" },
  ankit: { name: "Ankit", role: "Fluxvex" },
  saswat: { name: "Saswat", role: "Fluxvex" },
  nikhil: { name: "Nikhil", role: "Fluxvex" },
};

export const BLOG_POSTS = [...POSTS_1, ...POSTS_2].sort((a, b) => b.date.localeCompare(a.date));

export const getPostBySlug = (slug) => BLOG_POSTS.find((p) => p.slug === slug);

export const getRelatedPosts = (post, n = 2) => {
  const sameCategory = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category);
  const rest = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, n);
};

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export const authorInitial = (key) => (AUTHORS[key]?.name || "?").charAt(0).toUpperCase();
