import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, CircleAlert, CreditCard, Loader2, Mail, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import TapCTA from "@/components/ui/TapCTA";
import SuccessBurst from "@/components/SuccessBurst";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const WaitlistContext = createContext(null);
export const useWaitlist = () => useContext(WaitlistContext);

const CLIENT_OPTIONS = ["1–5", "6–15", "16–50", "50+", "Not sure"];
const CHANNEL_OPTIONS = ["Google Ads", "Meta Ads", "GA4", "Other"];
const INTEREST_OPTIONS = ["Not sure yet", "Starter", "Growth"];

const INITIAL = {
  email: "",
  agency_name: "",
  clients: "Not sure",
  channels: [],
  interest: "Not sure yet",
  trap: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function WaitlistForm({ source, interest, onDone }) {
  const [form, setForm] = useState({ ...INITIAL, interest: interest || INITIAL.interest });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");
  const [more, setMore] = useState(() => !!interest && interest !== "Not sure yet");
  const [position, setPosition] = useState(0);
  const emailRef = useRef(null);

  /* After a successful signup, show the person's real place in line */
  useEffect(() => {
    if (status !== "success") return undefined;
    let alive = true;
    axios
      .get(`${API}/waitlist/count`)
      .then((r) => {
        if (alive && r.data && Number.isFinite(r.data.count)) setPosition(r.data.count);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [status]);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const toggleChannel = (c) =>
    setForm((f) => ({
      ...f,
      channels: f.channels.includes(c) ? f.channels.filter((x) => x !== c) : [...f.channels, c],
    }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!EMAIL_RE.test(form.email.trim())) {
      setStatus("error");
      setError("That email doesn’t look right — try you@agency.com.");
      emailRef.current && emailRef.current.focus();
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await axios.post(`${API}/waitlist`, { ...form, email: form.email.trim(), source });
      if (res.data && res.data.ok) {
        setStatus("success");
      } else {
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

  if (status === "success") {
    return (
      <div className="py-2 text-center" data-testid="waitlist-success">
        <SuccessBurst testid="waitlist-success-animation" />
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="font-display text-2xl font-semibold tracking-tight text-ink"
        >
          You’re on the list.
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-soft"
        >
          We’ll email {form.email.trim()} when there is a meaningful Fluxvex launch or early-access update.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-4 py-1.5 text-[12px] font-medium text-[#0E8A3E]"
        >
          <Check className="h-3.5 w-3.5" /> Signup confirmed
        </motion.div>
        {position > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="mt-2.5 text-xs text-ink-soft"
            data-testid="waitlist-position"
          >
            You’re #{position} on the list.
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.5 }}
          className="mt-6"
        >
          <TapCTA
            onClick={onDone}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-white transition-colors hover:bg-black/80"
            testid="waitlist-success-done-button"
          >
            Done
          </TapCTA>
        </motion.div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <input
        type="text"
        name="trap"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        data-testid="waitlist-honeypot"
      />

      {/* the one required field */}
      <div className="space-y-1.5">
        <Label htmlFor="wl-email" className="text-xs font-medium text-ink/70">
          Work email
        </Label>
        <div
          className={`flex h-12 items-center gap-2.5 rounded-xl border bg-surface px-3.5 transition-[border-color,box-shadow] duration-200 focus-within:border-accent/60 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(61,67,232,0.08)] ${
            error ? "border-[#D64545]/60" : "border-line"
          }`}
        >
          <Mail className={`h-4 w-4 shrink-0 ${error ? "text-[#D64545]" : "text-ink-soft/60"}`} />
          <input
            ref={emailRef}
            id="wl-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoFocus
            placeholder="you@agency.com"
            value={form.email}
            onChange={(e) => {
              set("email", e.target.value);
              if (error) {
                setError("");
                setStatus("idle");
              }
            }}
            className="h-full w-full bg-transparent text-base text-ink placeholder:text-black/30 focus:outline-none"
            data-testid="waitlist-email-input"
          />
          {EMAIL_RE.test(form.email.trim()) && <Check className="h-4 w-4 shrink-0 text-[#0E8A3E]" />}
        </div>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-1.5 text-sm text-[#D64545]"
          role="alert"
          data-testid="waitlist-error"
        >
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </motion.p>
      )}

      <TapCTA
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent font-display text-[15px] font-semibold text-white shadow-[0_18px_36px_-16px_rgba(61,67,232,0.7)] transition-[background-color,transform] hover:bg-accent-strong active:scale-[0.99] disabled:opacity-70"
        testid="waitlist-submit-button"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Joining…
          </>
        ) : (
          "Join the waitlist"
        )}
      </TapCTA>

      {/* zero-friction trust row */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-medium text-ink-soft/75" aria-hidden="true">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-[#0E8A3E]" /> Free to join
        </span>
        <span className="h-2.5 w-px bg-line" />
        <span className="flex items-center gap-1">
          <CreditCard className="h-3 w-3 text-ink-soft/60" /> No credit card
        </span>
        <span className="h-2.5 w-px bg-line" />
        <span>Unsubscribe anytime</span>
      </div>

      {/* optional details — out of the way until asked for */}
      <button
        type="button"
        onClick={() => setMore((m) => !m)}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg py-1 text-xs font-medium text-ink-soft transition-colors hover:text-ink"
        aria-expanded={more}
        data-testid="waitlist-toggle-more"
      >
        {more ? "Hide optional details" : "Tailor your updates (optional)"}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${more ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {more && (
          <motion.div
            key="more"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-4 rounded-xl border border-line bg-surface/60 p-4">
              <div className="space-y-1.5">
                <Label htmlFor="wl-agency" className="text-xs font-medium text-ink/70">
                  Agency name <span className="text-ink/35">(optional)</span>
                </Label>
                <input
                  id="wl-agency"
                  type="text"
                  autoComplete="organization"
                  placeholder="Northbeam Media"
                  value={form.agency_name}
                  onChange={(e) => set("agency_name", e.target.value)}
                  className="h-11 w-full rounded-lg border border-line bg-white px-3.5 text-sm text-ink placeholder:text-black/30 transition-[border-color] focus:border-accent/60 focus:outline-none"
                  data-testid="waitlist-agency-input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="wl-clients" className="text-xs font-medium text-ink/70">
                    Number of clients
                  </Label>
                  <select
                    id="wl-clients"
                    value={form.clients}
                    onChange={(e) => set("clients", e.target.value)}
                    className="h-11 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-accent/60 focus:outline-none"
                    data-testid="waitlist-clients-select"
                  >
                    {CLIENT_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="wl-interest" className="text-xs font-medium text-ink/70">
                    Plan interest
                  </Label>
                  <select
                    id="wl-interest"
                    value={form.interest}
                    onChange={(e) => set("interest", e.target.value)}
                    className="h-11 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-accent/60 focus:outline-none"
                    data-testid="waitlist-interest-select"
                  >
                    {INTEREST_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-ink/70">Primary reporting channels</Label>
                <div className="flex flex-wrap gap-2">
                  {CHANNEL_OPTIONS.map((c) => {
                    const active = form.channels.includes(c);
                    return (
                      <button
                        type="button"
                        key={c}
                        onClick={() => toggleChannel(c)}
                        aria-pressed={active}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-[border-color,background-color,color] ${
                          active
                            ? "border-accent bg-accent-tint text-accent"
                            : "border-line bg-white text-ink-soft hover:border-black/30 hover:text-ink"
                        }`}
                        data-testid={`waitlist-channel-chip-${c.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

export function WaitlistProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("hero");
  const [interest, setInterest] = useState("Not sure yet");

  const openWaitlist = useCallback((from = "hero", overrides = {}) => {
    setSource(from);
    setInterest(overrides && overrides.interest ? overrides.interest : "Not sure yet");
    setOpen(true);
  }, []);

  const closeWaitlist = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openWaitlist, closeWaitlist }), [openWaitlist, closeWaitlist]);

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-md gap-0 overflow-hidden rounded-2xl border-line bg-page p-0 shadow-[0_60px_120px_-40px_rgba(16,16,20,0.5)]"
          data-testid="waitlist-dialog"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(80%_100%_at_50%_0%,rgba(61,67,232,0.07),transparent_75%)]" aria-hidden="true" />
          <DialogHeader className="relative space-y-0 p-6 pb-4 text-left sm:p-8 sm:pb-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink shadow-[0_12px_24px_-10px_rgba(16,16,20,0.6)]">
              <FluxvexMark size={18} className="[&_svg]:!text-ink" />
            </span>
            <DialogTitle className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
              Join the waitlist
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm leading-relaxed text-ink-soft">
              Be first in line for launch updates and early access.
            </DialogDescription>
          </DialogHeader>
          <div className="relative px-6 pb-6 sm:px-8 sm:pb-8">
            <WaitlistForm source={source} interest={interest} onDone={closeWaitlist} />          </div>
        </DialogContent>
      </Dialog>
    </WaitlistContext.Provider>
  );
}

export default WaitlistProvider;
