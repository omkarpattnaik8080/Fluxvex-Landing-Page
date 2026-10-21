import { createContext, useCallback, useContext, useMemo, useState } from "react";
import axios from "axios";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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

/* UPI-style success animation: spring pop + tick draw + particle burst + ripples */
function SuccessBurst() {
  const reduce = useReducedMotion();
  const particles = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return {
      x: Math.cos(a) * 54,
      y: Math.sin(a) * 54,
      c: ["#43D675", "#3D43E8", "#F5D748"][i % 3],
    };
  });

  return (
    <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center" data-testid="waitlist-success-animation">
      {!reduce &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border-2 border-mint"
            initial={{ scale: 0.7, opacity: 0.7 }}
            animate={{ scale: 2.05, opacity: 0 }}
            transition={{ duration: 1.3, delay: 0.3 + i * 0.4, repeat: Infinity, repeatDelay: 0.8, ease: "easeOut" }}
            aria-hidden="true"
          />
        ))}
      {!reduce &&
        particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: p.c }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            aria-hidden="true"
          />
        ))}
      <motion.span
        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-mint to-[#2BBE5C] shadow-[0_20px_45px_-14px_rgba(67,214,117,0.65)]"
        initial={reduce ? false : { scale: 0 }}
        animate={reduce ? {} : { scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 15 }}
      >
        <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true">
          <motion.path
            d="M11 21l6 6 12-13"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={reduce ? {} : { pathLength: 1 }}
            transition={{ duration: 0.45, delay: 0.3, ease: "easeOut" }}
          />
        </svg>
      </motion.span>
    </div>
  );
}

function WaitlistForm({ source }) {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const toggleChannel = (c) =>
    setForm((f) => ({
      ...f,
      channels: f.channels.includes(c) ? f.channels.filter((x) => x !== c) : [...f.channels, c],
    }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await axios.post(`${API}/waitlist`, { ...form, source });
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
      <div className="py-4 text-center" data-testid="waitlist-success">
        <SuccessBurst />
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
          We’ll email you when there is a meaningful Fluxvex launch or early-access update.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-4 py-1.5 text-[12px] font-medium text-[#0E8A3E]"
        >
          <Check className="h-3.5 w-3.5" /> Signup confirmed
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
      <div className="space-y-1.5">
        <Label htmlFor="wl-email" className="text-xs font-medium text-ink/70">
          Work email <span className="text-accent">*</span>
        </Label>
        <Input
          id="wl-email"
          type="email"
          required
          placeholder="you@agency.com"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          className="border-line bg-surface text-ink placeholder:text-black/30 focus-visible:ring-accent"
          data-testid="waitlist-email-input"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="wl-agency" className="text-xs font-medium text-ink/70">
          Agency name <span className="text-ink/35">(optional)</span>
        </Label>
        <Input
          id="wl-agency"
          type="text"
          placeholder="Northbeam Media"
          value={form.agency_name}
          onChange={(e) => set("agency_name", e.target.value)}
          className="border-line bg-surface text-ink placeholder:text-black/30"
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
            className="h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
            className="h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-accent bg-accent-tint text-accent"
                    : "border-line bg-surface text-ink-soft hover:border-black/30 hover:text-ink"
                }`}
                data-testid={`waitlist-channel-chip-${c.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
      {error && (
        <p className="text-sm text-[#D64545]" role="alert" data-testid="waitlist-error">
          {error}
        </p>
      )}
      <Button
        type="submit"
        disabled={status === "loading"}
        className="h-11 w-full rounded-full bg-accent font-display text-sm font-semibold text-white hover:bg-accent-strong"
        data-testid="waitlist-submit-button"
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join the waitlist"}
      </Button>
      <p className="text-center text-xs leading-relaxed text-ink-soft/80">
        We’ll only email you about Fluxvex launch and early-access updates.
      </p>
    </form>
  );
}

export function WaitlistProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("hero");

  const openWaitlist = useCallback((from = "hero") => {
    setSource(from);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openWaitlist }), [openWaitlist]);

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-2xl border-line bg-page p-6 sm:p-8" data-testid="waitlist-dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-semibold tracking-tight text-ink">
              Join the waitlist
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-ink-soft">
              Get product updates and early-access details.
            </DialogDescription>
          </DialogHeader>
          <WaitlistForm source={source} />
        </DialogContent>
      </Dialog>
    </WaitlistContext.Provider>
  );
}

export default WaitlistProvider;
