import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";
import { BLOG_POSTS, AUTHORS, formatDate, authorInitial } from "@/data/blog";

function AuthorRow({ post, tone = "light" }) {
  const author = AUTHORS[post.author];
  return (
    <span className="flex items-center gap-2">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full font-display text-[10px] font-bold text-white ${
          tone === "light" ? "bg-ink" : "bg-white/20"
        }`}
      >
        {authorInitial(post.author)}
      </span>
      <span className={`text-xs font-medium ${tone === "light" ? "text-ink" : "text-white/85"}`}>{author.name}</span>
      <span className="text-xs text-black/40">· {formatDate(post.date)}</span>
      <span className="flex items-center gap-1 text-xs text-black/40">
        <Clock className="h-3 w-3" /> {post.readTime} min
      </span>
    </span>
  );
}

function PostCard({ post, featured = false }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group flex h-full flex-col rounded-2xl border border-line bg-page p-7 transition-[box-shadow,transform,background-color] duration-300 hover:-translate-y-1 hover:bg-accent-tint/25 hover:shadow-[0_32px_64px_-28px_rgba(61,67,232,0.35)] ${
        featured ? "lg:flex-row lg:items-center lg:gap-10 lg:p-10" : ""
      }`}
      data-testid={`blog-post-card-${post.slug}`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-accent-border bg-accent-tint px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
            {post.category}
          </span>
          {featured && (
            <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
              Featured
            </span>
          )}
        </div>
        <h2
          className={`mt-4 font-display font-semibold leading-snug tracking-tight text-ink ${
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          {post.title}
        </h2>
        <p className={`mt-3 leading-relaxed text-ink-soft ${featured ? "text-[15px]" : "text-sm line-clamp-3"}`}>
          {post.description}
        </p>
        <div className="mt-5">
          <AuthorRow post={post} />
        </div>
      </div>
      <span
        className={`mt-6 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white ${
          featured ? "lg:mt-0" : ""
        }`}
        aria-hidden="true"
      >
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export default function Blog() {
  const [featured, ...rest] = BLOG_POSTS;
  return (
    <>
      <Seo
        title="Blog — Client Reporting Playbooks for Agencies | Fluxvex"
        description="Guides and essays on automated client reporting: agency analytics tool comparisons, AI in digital marketing, white-label reports, and platform alternatives."
        path="/blog"
      />
      <Navbar />
      <main className="pt-[76px]" data-testid="blog-page">
        <div className="mx-auto max-w-[1100px] px-5 py-16 lg:px-8 lg:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Fluxvex blog</p>
          <CinematicText
            as="h1"
            className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-5xl"
          >
            Client reporting, done properly.
          </CinematicText>
          <Reveal y={14} delay={0.1}>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-ink-soft">
              Playbooks, comparisons, and honest essays on reporting for marketing agencies—written by the team
              building Fluxvex.
            </p>
          </Reveal>

          <div className="mt-12">
            <Reveal>
              <PostCard post={featured} featured />
            </Reveal>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.06} className="h-full">
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
