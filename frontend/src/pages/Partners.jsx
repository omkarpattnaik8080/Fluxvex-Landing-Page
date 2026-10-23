import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Check, Link2, Loader2, User, Users, Wallet } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Seo from "@/components/Seo";
import CinematicText from "@/components/ui/CinematicText";
import SuccessBurst from "@/components/SuccessBurst";
import { Reveal } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const CHANNELS = ["LinkedIn", "X / Twitter", "YouTube", "Newsletter", "Community", "Podcast", "Other"];
const CLIENT_RANGES = ["1–5", "6–15", "16–50", "50+"];

const STEPS = [
  { icon: Link2, title: "Get your referral link", desc: "When the program opens, every early partner gets a personal link and an earnings dashboard." },
  { icon: Users, title: "Share it with your world", desc: "Creators post it. Agencies hand it to clients still wrestling with spreadsheets and slide decks." },
  { icon: Wallet, title: "Earn up to 20% recurring", desc: "Every subscription payment your referrals make pays you back—paid monthly, tracked automatically." },
];

function StepRow({ icon: Icon, title, desc, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="flex gap-4 rounded-2xl border border-line bg-page p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-26px_rgba(16,16,20,0.35)]" data-testid="partner-step">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-tint text-accent">
          <Icon className="h-5 w-5" strokeWidth={1.9} />
        </span>
        <div>
          <p className="font-display text-[15.5px] font-semibold tracking-tight text-ink">{title}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function Partners() {
  const [audience, setAudience] = useState("individual");
  const [form, setForm] = useState({ name: "", email: "", organization: "", reach: "", message: "" });
  const [channels, setChannels] = useState([]);
  const [errors, setErrors] = useState({});
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverError, setServerError] = useState("");
  const [result, setResult] = useState({ position: null, email: "" });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleChannel = (ch) =>
    setChannels((c) => (c.includes(ch) ? c.filter((x) => x !== ch) : [...c, ch]));

  const validate = () => {
    const fe = {};
    if (!form.name.trim()) fe.name = "Tell us your name.";
    if (!EMAIL_RE.test(form.email.trim())) fe.email = "That email doesn’t look right — try you@agency.com.";
    if (audience === "agency" && !form.organization.trim()) fe.organization = "Tell us your agency’s name.";
    setErrors(fe);
    return Object.keys(fe).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch(`${API}/partners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          audience,
          organization: form.organization,
          reach: form.reach,
          channels,
          message: form.message,
          source: "partner-page",
          trap,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.detail || "Something went wrong.");
      setResult({ position: data.position ?? null, email: form.email });
      setStatus("success");
    } catch (err) {
      setServerError(err.message || "Network hiccup — please try again.");
      setStatus("error");
    }
  };

  const field = (key) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-black/30 focus:ring-4 ${
      errors[key]
        ? "border-[#D65A5A] focus:border-[#D65A5A] focus:ring-[#D65A5A]/10"
        : "border-line focus:border-accent/60 focus:ring-accent/10"
    }`;

  return (
    <>
      <Seo
        title="Affiliate Partner Program — Earn 20% Recurring | Fluxvex"
        description="Join the Fluxvex partner waitlist. Creators and agencies earn up to 20% of every subscription payment their referrals make — paid monthly, tracked automatically."
        path="/partners"
      />
      <Navbar />
      <main className="pt-[76px]">
        {/* hero */}
        <div className="mx-auto max-w-[1100px] px-5 pb-2 pt-14 text-center lg:pt-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0E8A3E]/25 bg-[#EAF6E9] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0E8A3E]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0E8A3E] animate-pulse-dot" aria-hidden="true" />
              Affiliate partner program
            </span>
          </Reveal>
          <CinematicText
            as="h1"
            className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-5xl"
          >
            Earn 20% recurring. Creators and agencies, alike.
          </CinematicText>
          <Reveal y={16} delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.75] text-ink-soft">
              Share Fluxvex—the automated client-reporting platform for agencies—with your network or your clients.
              When the program opens, every subscription payment your referrals make pays you back. Automatically,
              every month.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
              {["Free to join", "No T&C — yours to keep", "Paid monthly, tracked automatically"].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[12px] font-semibold text-ink"
                >
                  <Check className="h-3.5 w-3.5 text-[#0E8A3E]" strokeWidth={2.6} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* form + how you earn */}
        <div className="mx-auto max-w-[1100px] px-5 pb-24 pt-10">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_1fr]">
            {/* form card */}
            <Reveal>
              <div
                className="rounded-[28px] border border-accent-border bg-[linear-gradient(160deg,#F5F4FF_0%,#FFFFFF_55%,#F7FBF5_100%)] p-7 shadow-[0_50px_100px_-60px_rgba(61,67,232,0.5)] sm:p-9"
                data-testid="partner-form"
              >
                {status === "success" ? (
                  <div className="py-10 text-center" data-testid="partner-success">
                    <SuccessBurst testid="partner-success-animation" />
                    <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">You’re on the partner list</h2>
                    {result.position && (
                      <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">
                        You’re{" "}
                        <span className="font-display font-bold text-[#0E8A3E]" data-testid="partner-position">
                          #{result.position}
                        </span>{" "}
                        on the list — we’ll email <span className="font-semibold text-ink">{result.email}</span> the
                        moment your referral link goes live.
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 rounded-full border border-line bg-white px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface"
                      data-testid="partner-success-done"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <h2 className="font-display text-xl font-semibold tracking-tight text-ink">Join the partner waitlist</h2>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                      Early partners get the program’s best tier when it opens.
                    </p>

                    {/* audience toggle */}
                    <p className="mt-6 text-[13px] font-semibold text-ink">I’m joining as</p>
                    <div className="mt-2.5 grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Audience type">
                      {[
                        { key: "individual", icon: User, label: "Individual creator", hint: "You have an audience" },
                        { key: "agency", icon: Building2, label: "Agency or consultant", hint: "You serve clients" },
                      ].map((a) => {
                        const active = audience === a.key;
                        return (
                          <button
                            key={a.key}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => setAudience(a.key)}
                            className={`rounded-xl border p-3.5 text-left transition-[border-color,background-color,box-shadow] duration-200 ${
                              active
                                ? "border-accent/60 bg-accent-tint shadow-[0_16px_32px_-20px_rgba(61,67,232,0.5)]"
                                : "border-line bg-white hover:border-accent/35"
                            }`}
                            data-testid={`partner-audience-${a.key}`}
                          >
                            <span className="flex items-center gap-2">
                              <a.icon className={`h-4 w-4 ${active ? "text-accent" : "text-ink-soft"}`} strokeWidth={2} />
                              <span className={`text-[13px] font-bold ${active ? "text-ink" : "text-ink-soft"}`}>{a.label}</span>
                              {active && <Check className="ml-auto h-3.5 w-3.5 text-accent" strokeWidth={3} />}
                            </span>
                            <span className="mt-1 block text-[11px] text-ink-soft">{a.hint}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* name + email */}
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="partner-name" className="text-[13px] font-semibold text-ink">
                          Name
                        </label>
                        <input id="partner-name" className={`mt-1.5 ${field("name")}`} placeholder="Your name" value={form.name} onChange={set("name")} data-testid="partner-name-input" />
                        {errors.name && <p className="mt-1 text-[11.5px] font-medium text-[#C43D3D]" data-testid="partner-name-error">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="partner-email" className="text-[13px] font-semibold text-ink">
                          Email
                        </label>
                        <input id="partner-email" type="email" className={`mt-1.5 ${field("email")}`} placeholder="you@agency.com" value={form.email} onChange={set("email")} data-testid="partner-email-input" />
                        {errors.email && <p className="mt-1 text-[11.5px] font-medium text-[#C43D3D]" data-testid="partner-email-error">{errors.email}</p>}
                      </div>
                    </div>

                    {/* audience-specific */}
                    {audience === "agency" ? (
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="partner-org" className="text-[13px] font-semibold text-ink">
                            Agency name
                          </label>
                          <input id="partner-org" className={`mt-1.5 ${field("organization")}`} placeholder="e.g. Bright Loop Media" value={form.organization} onChange={set("organization")} data-testid="partner-org-input" />
                          {errors.organization && <p className="mt-1 text-[11.5px] font-medium text-[#C43D3D]" data-testid="partner-org-error">{errors.organization}</p>}
                        </div>
                        <div>
                          <label htmlFor="partner-reach" className="text-[13px] font-semibold text-ink">
                            Clients today
                          </label>
                          <select id="partner-reach" className={`mt-1.5 ${field("reach")}`} value={form.reach} onChange={set("reach")} data-testid="partner-reach-input">
                            <option value="">Select…</option>
                            {CLIENT_RANGES.map((r) => (
                              <option key={r} value={r}>
                                {r} clients
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <label htmlFor="partner-reach" className="text-[13px] font-semibold text-ink">
                          Where do you create? <span className="font-normal text-ink-soft">(optional)</span>
                        </label>
                        <input id="partner-reach" className={`mt-1.5 ${field("reach")}`} placeholder="e.g. YouTube · 12k subscribers" value={form.reach} onChange={set("reach")} data-testid="partner-reach-input" />
                      </div>
                    )}

                    {/* channels */}
                    <p className="mt-5 text-[13px] font-semibold text-ink">
                      Main channels <span className="font-normal text-ink-soft">(optional)</span>
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {CHANNELS.map((ch) => {
                        const on = channels.includes(ch);
                        return (
                          <button
                            key={ch}
                            type="button"
                            onClick={() => toggleChannel(ch)}
                            className={`rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-[border-color,background-color,color] duration-150 ${
                              on ? "border-accent/60 bg-accent-tint text-accent" : "border-line bg-white text-ink-soft hover:border-accent/35 hover:text-ink"
                            }`}
                            data-testid={`partner-channel-${ch.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                          >
                            {ch}
                          </button>
                        );
                      })}
                    </div>

                    {/* message */}
                    <div className="mt-5">
                      <label htmlFor="partner-message" className="text-[13px] font-semibold text-ink">
                        Anything we should know? <span className="font-normal text-ink-soft">(optional)</span>
                      </label>
                      <textarea id="partner-message" rows={3} maxLength={600} className={`mt-1.5 resize-none ${field("message")}`} placeholder="Your audience, your clients, or how you’d share Fluxvex…" value={form.message} onChange={set("message")} data-testid="partner-message-input" />
                    </div>

                    {/* honeypot */}
                    <input
                      type="text"
                      name="trap"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      value={trap}
                      onChange={(e) => setTrap(e.target.value)}
                      aria-hidden="true"
                    />

                    {status === "error" && serverError && (
                      <p className="mt-4 rounded-xl bg-[#FDF1F1] px-4 py-2.5 text-[12.5px] font-medium text-[#C43D3D]" data-testid="partner-error">
                        {serverError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-7 font-display text-sm font-semibold text-white shadow-[0_20px_40px_-16px_rgba(61,67,232,0.7)] transition-[transform,background-color] duration-200 hover:bg-accent-strong disabled:opacity-70 sm:w-auto"
                      data-testid="partner-submit-button"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Joining…
                        </>
                      ) : (
                        "Join the partner waitlist"
                      )}
                    </button>
                    <p className="mt-3 text-[11.5px] leading-snug text-black/40">
                      No spam, one list. We’ll only email you about the partner program.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>

            {/* how you earn */}
            <div className="flex flex-col gap-4">
              <Reveal delay={0.1}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">How you earn</p>
              </Reveal>
              {STEPS.map((s, i) => (
                <StepRow key={s.title} icon={s.icon} title={s.title} desc={s.desc} delay={0.14 + i * 0.08} />
              ))}
              <Reveal delay={0.4}>
                <div className="relative overflow-hidden rounded-2xl bg-[radial-gradient(120%_160%_at_85%_0%,#1E7A3C_0%,#0C2E1B_70%)] p-6">
                  <span
                    className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(67,214,117,0.35),transparent_70%)] blur-2xl"
                    aria-hidden="true"
                  />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mint">Early partner perk</p>
                  <p className="mt-2 font-display text-[17px] font-semibold leading-snug tracking-tight text-white">
                    The first 100 partners keep the program’s best tier—
                    <span className="text-mint">locked in for life.</span>
                  </p>
                  <p className="mt-2 text-[12px] leading-relaxed text-white/60">
                    Referrals you send now are counted from day one. Individuals and agencies earn the same way.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.46}>
                <p className="px-1 text-[12.5px] leading-relaxed text-ink-soft">
                  Questions first?{" "}
                  <Link to="/contact" className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-strong" data-testid="partner-contact-link">
                    Talk to the founding team
                  </Link>
                  . See the{" "}
                  <Link to="/" className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-strong">
                    product overview
                  </Link>{" "}
                  to learn what you’d be sharing.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
