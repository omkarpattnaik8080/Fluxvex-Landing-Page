import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import NotFound from "@/pages/NotFound";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";
import { useWaitlist } from "@/components/WaitlistContext";
import TapCTA from "@/components/ui/TapCTA";
import { getPostBySlug, getRelatedPosts, AUTHORS, formatDate, authorInitial } from "@/data/blog";

function ArticleBody({ body }) {
  return (
    <div>
      {body.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-10 font-display text-2xl font-semibold tracking-tight text-ink">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 font-display text-xl font-semibold tracking-tight text-ink">
                {block.text}
              </h3>
            );
          case "list":
            return (
              <ul key={i} className="mt-5 space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-[15px] leading-[1.7] text-ink-soft">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="mt-8 border-l-2 border-accent bg-accent-tint/40 py-4 pl-5 pr-4 font-display text-lg font-medium leading-relaxed tracking-tight text-ink"
              >
                {block.text}
              </blockquote>
            );
          default:
            return (
              <p key={i} className="mt-5 text-[15px] leading-[1.8] text-ink-soft first:mt-0">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const { openWaitlist } = useWaitlist();

  useEffect(() => {
    if (!post) return undefined;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "blog-post-jsonld";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: { "@type": "Person", name: AUTHORS[post.author].name },
      publisher: { "@type": "Organization", name: "Fluxvex" },
      mainEntityOfPage: `https://www.fluxvex.com/blog/${post.slug}`,
    });
    document.head.appendChild(el);
    return () => {
      document.getElementById("blog-post-jsonld")?.remove();
    };
  }, [post]);

  if (!post) return <NotFound />;

  const related = getRelatedPosts(post, 2);
  const author = AUTHORS[post.author];

  return (
    <>
      <Seo title={`${post.title} | Fluxvex Blog`} description={post.description} path={`/blog/${post.slug}`} />
      <Navbar />
      <main className="pt-[76px]" data-testid="blog-post-page">
        <article className="mx-auto max-w-[760px] px-5 py-14 lg:px-8 lg:py-20" data-testid="blog-post-article">
          <Reveal y={12}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-accent"
              data-testid="blog-back-link"
            >
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
          </Reveal>

          <Reveal y={14} delay={0.05}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-accent-border bg-accent-tint px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-black/45">
                <Clock className="h-3 w-3" /> {post.readTime} min read
              </span>
            </div>
          </Reveal>

          <CinematicText
            as="h1"
            className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tightest text-ink sm:text-[42px]"
          >
            {post.title}
          </CinematicText>

          <Reveal y={12} delay={0.1}>
            <div className="mt-7 flex items-center gap-3 border-b border-line pb-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-white">
                {authorInitial(post.author)}
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-ink">{author.name}</p>
                <p className="text-xs text-black/45">
                  {author.role} · {formatDate(post.date)}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-8">
            <ArticleBody body={post.body} />
          </div>

          <Reveal>
            <div className="mt-14 rounded-2xl border border-accent-border bg-accent-tint p-8 text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Reporting that runs itself</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                Fluxvex turns Google Ads, Meta Ads, and GA4 data into branded client reports—drafted by AI,
                approved by you, delivered on schedule.
              </p>
              <TapCTA
                onClick={() => openWaitlist("blog-post")}
                className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
                testid="blog-post-cta-button"
              >
                Join the waitlist
              </TapCTA>
            </div>
          </Reveal>

          <div className="mt-14 border-t border-line pt-10" data-testid="blog-related">
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">Keep reading</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-line bg-page p-6 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_56px_-28px_rgba(61,67,232,0.35)]"
                  data-testid={`blog-related-card-${r.slug}`}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">{r.category}</span>
                  <span className="mt-2.5 font-display text-base font-semibold leading-snug text-ink">{r.title}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-medium text-ink-soft">
                    Read article
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
