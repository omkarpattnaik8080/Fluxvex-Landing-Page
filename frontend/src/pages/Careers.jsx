import { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Check, ChevronDown, Loader2, MessagesSquare, Rocket, Send, Sparkles, TrendingUp, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";
import TapCTA from "@/components/ui/TapCTA";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { ROLES, CULTURE, HIRING_STEPS, CAREER_FAQS, TICKER_ITEMS } from "@/data/careers";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const CULTURE_ICONS = { ship: Rocket, ai: Sparkles, founders: Users, grow: TrendingUp };
const STEP_ICONS = { text: Send, session: MessagesSquare, ppo: BadgeCheck };

function JsonLd() {
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "careers-jsonld";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        ...ROLES.map((r) => ({
          "@type": "JobPosting",
          title: r.title,
          description: `${r.type}. Location: ${r.location}. On completion: ${r.ppo}. ${r.desc}`,
          datePosted: "2026-10-21",
          employmentType: "INTERN",
          directApply: true,
          hiringOrganization: { "@type": "Organization", name: "Fluxvex" },
          jobLocationType: "TELECOMMUTE",
        })),
        {
          "@type": "FAQPage",
          mainEntity: CAREER_FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
        },
      ],
    });
    document.head.appendChild(el);
    return () => {
      document.getElementById("careers-jsonld")?.remove();
    };
  }, []);
  return null;
}

/* GSAP roles ticker — one DOM copy per item, duplicated track for the loop */
function RolesTicker() {
  const trackRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduce) return undefined;
    gsap.set(track, { force3D: true });
    const tween = gsap.to(track, { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
    return () => {
      tween.kill();
      gsap.set(track, { clearProps: "transform" });
    };
  }, [reduce]);

  return (
    <div
      className="relative mt-14 overflow-hidden border-y border-line bg-page py-4"
      data-testid="careers-ticker"
      aria-label="Open internship roles at Fluxvex"
    >
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {[0, 1].map((dup) => (
          <div key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
            {TICKER_ITEMS.map((t, i) => (
              <span key={`${dup}-${i}`} className="flex items-center">
                <span className="whitespace-nowrap font-display text-sm font-semibold tracking-tight text-ink/80">{t}</span>
                <FluxvexMark size={16} className="mx-6 rounded" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Slow-floating hero badge (desktop whitespace) */
function FloatBadge({ className = "", children, delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={reduce ? { delay } : { y: { duration: 5.5, repeat: Infinity, delay, ease: "easeInOut" }, opacity: { delay }, scale: { delay } }}
      className={`pointer-events-none absolute hidden items-center gap-2 rounded-full border border-line bg-page px-4 py-2 text-[11px] font-semibold text-ink shadow-[0_18px_40px_-18px_rgba(16,16,20,0.35)] lg:flex ${className}`}
      aria-hidden="true"
    >
      {children}
    </motion.span>
  );
}

function RoleCard({ role, i, onApply }) {
  return (
    <Reveal delay={i * 0.08} className="h-full">
      <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="h-full">
        <div className="flex h-full flex-col rounded-2xl border border-line bg-page p-7 shadow-[0_24px_50px_-32px_rgba(16,16,20,0.35)]" data-testid={role.testid}>
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 rounded-full border border-mint/40 bg-mint/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0E8A3E]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0E8A3E] animate-pulse-dot" aria-hidden="true" />
              Open
            </span>
            <span className="text-[11px] font-medium text-black/40">{role.team}</span>
          </div>
          <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-ink">{role.title}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {[role.type, role.location].map((chip) => (
              <span key={chip} className="rounded-full border border-line bg-surface px-2.5 py-1 text-[10.5px] font-medium text-ink-soft">
                {chip}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">{role.desc}</p>
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-accent/20 bg-accent-tint/50 p-3.5">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p className="text-[12.5px] font-semibold leading-snug text-ink">{role.ppo}</p>
          </div>
          <ul className="mt-4 space-y-2">
            {role.wants.map((w) => (
              <li key={w} className="flex items-start gap-2 text-[12.5px] leading-snug text-ink-soft">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2.4} />
                {w}
              </li>
            ))}
          </ul>
          <TapCTA
            onClick={() => onApply(role.slug)}
            className="group mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink font-display text-sm font-semibold text-white transition-colors hover:bg-black/80"
            testid={`career-apply-${role.slug}`}
          >
            Text us to apply
            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </TapCTA>
        </div>
      </motion.div>
    </Reveal>
  );
}

function HiringTimeline() {
  const reduce = useReducedMotion();
  return (
    <div className="relative" data-testid="careers-timeline">
      {/* animated connector line (desktop) */}
      <div className="absolute left-0 right-0 top-[26px] hidden h-px lg:block" aria-hidden="true">
        <motion.div
          className="h-px origin-left bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={reduce ? {} : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        />
      </div>
      <div className="grid gap-5 lg:grid-cols-3 lg:gap-8">
        {HIRING_STEPS.map((s, i) => {
          const Icon = STEP_ICONS[s.icon];
          return (
            <Reveal key={s.title} delay={i * 0.12} className="h-full">
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="relative h-full">
                <div className="flex h-full flex-col rounded-2xl border border-line bg-page p-7 shadow-[0_24px_50px_-32px_rgba(16,16,20,0.35)]" data-testid={`careers-step-${i + 1}`}>
                  <div className="flex items-center justify-between">
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-accent font-display text-sm font-bold text-white">
                      {i + 1}
                      {!reduce && (
                        <motion.span
                          className="absolute inset-0 rounded-xl border-2 border-accent/50"
                          animate={{ scale: [1, 1.3], opacity: [0.9, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{s.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

function TextUsForm({ role, setRole }) {
  const [form, setForm] = useState({ name: "", email: "", portfolio: "", message: "", trap: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await axios.post(`${API}/careers`, { ...form, role });
      if (res.data && res.data.ok) setStatus("success");
      else {
        setStatus("error");
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setError(
        err.response && err.response.data && err.response.data.detail
          ? err.response.data.detail
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="relative mx-auto max-w-lg" data-testid="careers-textus-card">
      <div className="overflow-hidden rounded-3xl border border-line bg-page shadow-[0_50px_110px_-50px_rgba(16,16,20,0.5)]">
        {/* chat header */}
        <div className="flex items-center gap-3 border-b border-line bg-surface px-5 py-3.5">
          <span className="relative flex h-10 w-10 items-center justify-center">
            <span className="absolute inset-0 rounded-full border-2 border-mint/60" aria-hidden="true" />
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111] font-display text-xs font-bold text-[#F5D748]">F</span>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-page bg-mint animate-pulse-dot" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold text-ink">Text Fluxvex</p>
            <p className="text-[11px] text-[#0E8A3E]">Founding team · replies personally</p>
          </div>
        </div>

        {status === "success" ? (
          <div className="p-7 text-center" data-testid="careers-success">
            <motion.div
              initial={{ scale: 0, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-[#2BBE5C] shadow-[0_20px_45px_-14px_rgba(67,214,117,0.65)]"
            >
              <Check className="h-8 w-8 text-white" strokeWidth={3} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-5 font-display text-xl font-semibold tracking-tight text-ink"
            >
              Text sent. It's with us.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-soft"
            >
              Your message landed straight with the founding team. If the fit is real, we reply to schedule a short
              working session.
            </motion.p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 p-5 sm:p-6" noValidate data-testid="careers-form">
            <input type="text" name="trap" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" data-testid="careers-honeypot" />
            {/* incoming bubble */}
            <div className="flex justify-start">
              <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-surface px-4 py-3 text-[13px] leading-relaxed text-ink shadow-sm">
                Tell us who you are, where you can contribute the most, and why you want to build the agency OS with
                us. No portals, no cover-letter theatre—just one honest text.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm text-ink placeholder:text-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                data-testid="careers-name-input"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm text-ink placeholder:text-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                data-testid="careers-email-input"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-line bg-surface px-3.5 pr-9 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  data-testid="careers-role-select"
                >
                  {ROLES.map((r) => (
                    <option key={r.slug} value={r.slug}>
                      {r.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />
              </div>
              <input
                type="url"
                placeholder="Portfolio / reel link (optional)"
                value={form.portfolio}
                onChange={(e) => set("portfolio", e.target.value)}
                className="h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm text-ink placeholder:text-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                data-testid="careers-portfolio-input"
              />
            </div>
            <div className="flex justify-end">
              <div className="w-full rounded-2xl rounded-br-md border border-accent/25 bg-accent-tint/60 px-4 py-3">
                <textarea
                  rows={4}
                  placeholder="Why do you want to join Fluxvex—and where can you contribute the most?"
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  className="w-full resize-none bg-transparent text-[13.5px] leading-relaxed text-ink placeholder:text-black/35 focus:outline-none"
                  data-testid="careers-message-input"
                />
                <p className="mt-1 text-right text-[10px] text-black/35">{form.message.length} / 5000</p>
              </div>
            </div>
            {error && (
              <p className="text-sm text-[#D64545]" role="alert" data-testid="careers-error">
                {error}
              </p>
            )}
            <TapCTA
              type="submit"
              disabled={status === "loading"}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink font-display text-sm font-semibold text-white transition-colors hover:bg-black/80 disabled:opacity-60"
              testid="careers-submit-button"
            >
              {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {status === "loading" ? "Sending…" : "Text the founding team"}
            </TapCTA>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Careers() {
  const [role, setRole] = useState(ROLES[0].slug);

  const applyTo = (slug) => {
    setRole(slug);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Seo
        title="Careers — SaaS Sales Internships With Guaranteed PPOs | Fluxvex"
        description="Fluxvex is hiring SaaS sales interns for India, US, and UK markets. Four-month unpaid internships with guaranteed PPO conversion chances up to ₹6 LPA. Apply by texting the founding team."
        path="/careers"
      />
      <JsonLd />
      <Navbar />
      <main className="pt-[76px]" data-testid="careers-page">
        {/* hero */}
        <div className="relative mx-auto max-w-[1100px] px-5 py-16 text-center lg:px-8 lg:py-24">
          <FloatBadge className="left-[2%] top-[26%]" delay={0.6}>
            <Sparkles className="h-3.5 w-3.5 text-accent" /> PPO up to ₹6 LPA
          </FloatBadge>
          <FloatBadge className="right-[2%] top-[34%]" delay={1.2}>
            <Users className="h-3.5 w-3.5 text-accent" /> US · UK · India — all remote
          </FloatBadge>
          <FloatBadge className="bottom-[14%] left-[6%]" delay={1.8}>
            <Send className="h-3.5 w-3.5 text-accent" /> Replies from the founding team
          </FloatBadge>

          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Careers at Fluxvex</p>
          </Reveal>
          <CinematicText
            as="h1"
            className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-5xl lg:text-[56px]"
          >
            Don't send a cover letter. Send us a text.
          </CinematicText>
          <Reveal y={14} delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.75] text-ink-soft" data-testid="careers-answer-first">
              Fluxvex is hiring three SaaS sales interns—for India, the US, and the UK markets. The internships are
              unpaid, run four months, and end with a guaranteed PPO conversion chance: up to ₹6 LPA in India and
              above-market-standard packages in the US and UK. Apply by texting the founding team directly—no
              portals, no cover letters.
            </p>
          </Reveal>
          <Reveal y={12} delay={0.15}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {["Remote-first", "Internship-first", "AI-native", "Founders you can text"].map((chip) => (
                <span key={chip} className="rounded-full border border-line bg-page px-3.5 py-1.5 text-[11px] font-medium text-ink-soft">
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <RolesTicker />

        {/* culture */}
        <div className="mx-auto max-w-[1280px] px-5 pb-4 pt-14 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CULTURE.map((c, i) => {
              const Icon = CULTURE_ICONS[c.icon];
              return (
                <Reveal key={c.title} delay={i * 0.06} className="h-full">
                  <div className="group h-full rounded-xl border border-line bg-page p-6 transition-[box-shadow,background-color] duration-300 hover:bg-accent-tint/25 hover:shadow-[0_28px_56px_-28px_rgba(61,67,232,0.35)]" data-testid={`careers-culture-${i + 1}`}>
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-ink">{c.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{c.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* openings */}
        <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-20" data-testid="careers-openings">
          <Reveal>
            <div className="flex flex-col items-center gap-3 text-center">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Open internships</h2>
              <p className="max-w-xl text-[15px] leading-[1.7] text-ink-soft">
                Four-month unpaid internships, every one with a guaranteed PPO conversion chance on
                completion—India up to ₹6 LPA, US and UK above market standards.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {ROLES.map((r, i) => (
              <RoleCard key={r.slug} role={r} i={i} onApply={applyTo} />
            ))}
          </div>
        </div>

        {/* how hiring works */}
        <div className="border-y border-line bg-[#F7F6F2]">
          <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-20">
            <Reveal>
              <div className="mb-10 flex flex-col items-center gap-3 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">How hiring works</p>
                <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  Three steps. No black holes.
                </h2>
              </div>
            </Reveal>
            <HiringTimeline />
          </div>
        </div>

        {/* text-us application */}
        <div id="apply">
          <div className="mx-auto max-w-[1100px] px-5 py-16 lg:px-8 lg:py-20">
            <Reveal>
              <div className="mb-10 flex flex-col items-center gap-3 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">The unique part</p>
                <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  Skip the portal. Text us why you want in.
                </h2>
                <p className="max-w-xl text-[15px] leading-[1.7] text-ink-soft">
                  One message—why you want to join Fluxvex and where you can contribute. It lands directly with
                  the founding team, and we read every single one.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <TextUsForm role={role} setRole={setRole} />
            </Reveal>
          </div>
        </div>

        {/* faq */}
        <div className="mx-auto max-w-[860px] px-5 py-16 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Fair questions</h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {CAREER_FAQS.map(([q, a], i) => (
              <Reveal key={q} delay={i * 0.06}>
                <details className="group rounded-xl border border-line bg-page px-6 py-5" data-testid={`careers-faq-${i + 1}`}>
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-accent transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{a}</p>
                </details>
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
