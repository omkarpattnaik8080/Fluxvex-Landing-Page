import { useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Building2, CircleAlert, Clock3, Loader2, Mail, MessageSquareText, MousePointerClick, Send, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Seo from "@/components/Seo";
import { Label } from "@/components/ui/label";
import CinematicText from "@/components/ui/CinematicText";
import { Reveal } from "@/components/Reveal";
import TapCTA from "@/components/ui/TapCTA";
import SuccessBurst from "@/components/SuccessBurst";
import { Link } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Icon field with focus ring — same anatomy as the waitlist form */
function Field({ id, label, optional, icon: Icon, error, children }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-ink/70">
        {label} {!optional && <span className="text-accent">*</span>}
      </Label>
      <div
        className={`flex items-center gap-2.5 rounded-xl border bg-surface px-3.5 transition-[border-color,box-shadow] duration-200 focus-within:border-accent/60 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(61,67,232,0.08)] ${
          error ? "border-[#D64545]/60" : "border-line"
        } ${id === "ct-message" ? "items-start" : "h-12"}`}
      >
        <Icon
          className={`h-4 w-4 shrink-0 ${id === "ct-message" ? "mt-[15px]" : ""} ${error ? "text-[#D64545]" : "text-ink-soft/60"}`}
        />
        {children}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs text-[#D64545]"
          role="alert"
        >
          <CircleAlert className="h-3.5 w-3.5 shrink-0" />
          {error}
        </motion.p>
      )}
    </div>
  );
}

const inputCls = "h-full w-full bg-transparent text-base text-ink placeholder:text-black/30 focus:outline-none";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", agency: "", message: "", trap: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const emailRef = useRef(null);

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setFieldErrors((fe) => ({ ...fe, [k]: undefined }));
  };

  const validate = () => {
    const fe = {};
    if (!form.name.trim()) fe.name = "Please add your name.";
    if (!EMAIL_RE.test(form.email.trim())) fe.email = "That email doesn’t look right — try you@agency.com.";
    if (form.message.trim().length < 10) fe.message = "Tell us a little more — even a sentence or two helps.";
    setFieldErrors(fe);
    return Object.keys(fe).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!validate()) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      await axios.post(`${API}/contact`, { ...form, email: form.email.trim(), source: "contact-page" });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err.response && err.response.data && err.response.data.detail
          ? err.response.data.detail
          : "Something went wrong. Please try again."
      );
    }
  };

  const reset = () => {
    setForm({ name: "", email: "", agency: "", message: "", trap: "" });
    setFieldErrors({});
    setStatus("idle");
  };

  return (
    <>
      <Seo
        title="Contact Fluxvex — Questions About Agency Reporting"
        description="Questions about Fluxvex, integrations, or early access? Send a short inquiry and the team will reply by email."
        path="/contact"
      />
      <Navbar />
      <main className="pt-[76px]">
        <div className="mx-auto grid max-w-[1280px] gap-14 px-5 py-16 lg:grid-cols-2 lg:gap-24 lg:px-8 lg:py-24">
          <Reveal>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Contact</p>
              <CinematicText
                as="h1"
                className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-5xl"
              >
                Questions about Fluxvex?
              </CinematicText>
              <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-ink-soft">
                Tell us about your agency and reporting workflow. A human reads every message and replies by
                email—usually within a couple of business days.
              </p>

              <div className="mt-10 space-y-3.5 border-t border-line pt-8">
                {[
                  { icon: User, title: "Read by a person", desc: "No bots, no ticket numbers—your note goes straight to the founding team." },
                  { icon: Clock3, title: "Replies in ~2 business days", desc: "Often sooner for integration and early-access questions." },
                  { icon: MousePointerClick, title: "Faster for waitlist questions", desc: "Join from any “Join the waitlist” button—no form needed." },
                ].map((r) => (
                  <div key={r.title} className="flex items-start gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-tint text-accent">
                      <r.icon className="h-4 w-4" strokeWidth={1.9} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{r.title}</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-8 text-xs font-medium">
                <span className="mr-1 text-ink-soft">Quick answers:</span>
                {[
                  { to: "/pricing", label: "Pricing" },
                  { to: "/security", label: "Security" },
                  { to: "/integrations/google-ads", label: "Integrations" },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="rounded-full border border-line bg-page px-3.5 py-1.5 text-ink-soft transition-colors hover:border-accent/40 hover:text-accent"
                    data-testid={`contact-quick-link-${l.label.toLowerCase()}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="rounded-2xl border border-line bg-page p-7 shadow-[0_40px_90px_-40px_rgba(20,21,122,0.35)] sm:p-9"
              data-testid="contact-form-card"
            >
              {status === "success" ? (
                <div className="py-8 text-center" data-testid="contact-success">
                  <SuccessBurst testid="contact-success-animation" />
                  <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.5 }}
                    className="font-display text-2xl font-semibold tracking-tight text-ink"
                  >
                    Message received.
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-soft"
                  >
                    Thanks, {form.name.trim().split(/\s+/)[0] || "friend"}—we’ll reply to {form.email.trim()} within a
                    couple of business days.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="mt-7 flex flex-col items-center gap-3"
                  >
                    <TapCTA
                      onClick={reset}
                      className="inline-flex h-11 w-full items-center justify-center rounded-full border border-line bg-page font-display text-sm font-semibold text-ink transition-colors hover:border-accent/40 hover:text-accent"
                      testid="contact-send-another-button"
                    >
                      Send another message
                    </TapCTA>
                    <Link to="/" className="text-xs font-medium text-ink-soft underline-offset-4 hover:text-ink hover:underline">
                      Back to home
                    </Link>
                  </motion.div>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4" noValidate>
                  <input type="text" name="trap" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="ct-name" label="Name" icon={User} error={fieldErrors.name}>
                      <input
                        id="ct-name"
                        required
                        autoComplete="name"
                        autoFocus
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Alex Rivera"
                        className={inputCls}
                        data-testid="contact-name-input"
                      />
                    </Field>
                    <Field id="ct-email" label="Work email" icon={Mail} error={fieldErrors.email}>
                      <input
                        id="ct-email"
                        ref={emailRef}
                        type="email"
                        required
                        inputMode="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="you@agency.com"
                        className={inputCls}
                        data-testid="contact-email-input"
                      />
                    </Field>
                  </div>
                  <Field id="ct-agency" label="Agency" optional icon={Building2} error={fieldErrors.agency}>
                    <input
                      id="ct-agency"
                      autoComplete="organization"
                      value={form.agency}
                      onChange={(e) => set("agency", e.target.value)}
                      placeholder="Northbeam Media"
                      className={inputCls}
                      data-testid="contact-agency-input"
                    />
                  </Field>
                  <Field id="ct-message" label="Message" icon={MessageSquareText} error={fieldErrors.message}>
                    <textarea
                      id="ct-message"
                      required
                      rows={5}
                      maxLength={2000}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="What would you like to know?"
                      className="w-full resize-none bg-transparent py-3 text-sm text-ink placeholder:text-black/30 focus:outline-none"
                      data-testid="contact-message-input"
                    />
                  </Field>

                  {error && (
                    <p className="flex items-start gap-1.5 text-sm text-[#D64545]" role="alert" data-testid="contact-error">
                      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                      {error}
                    </p>
                  )}

                  <TapCTA
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent font-display text-[15px] font-semibold text-white shadow-[0_18px_36px_-16px_rgba(61,67,232,0.7)] transition-[background-color,transform] hover:bg-accent-strong active:scale-[0.99] disabled:opacity-70"
                    testid="contact-submit-button"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </TapCTA>
                  <p className="text-center text-xs text-ink-soft/80">
                    We’ll only use your email to reply—added to nothing else.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
