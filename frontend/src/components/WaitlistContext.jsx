import { createContext, useCallback, useContext, useMemo, useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";

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
      <div className="py-6 text-center" data-testid="waitlist-success">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-white">
          You’re on the list.
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/60">
          We’ll email you when there is a meaningful Fluxvex launch or early-access update.
        </p>
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
        <Label htmlFor="wl-email" className="text-xs font-medium text-white/70">
          Work email <span className="text-accent">*</span>
        </Label>
        <Input
          id="wl-email"
          type="email"
          required
          placeholder="you@agency.com"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          className="border-line bg-elevated text-white placeholder:text-white/30 focus-visible:ring-accent"
          data-testid="waitlist-email-input"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="wl-agency" className="text-xs font-medium text-white/70">
          Agency name <span className="text-white/35">(optional)</span>
        </Label>
        <Input
          id="wl-agency"
          type="text"
          placeholder="Northbeam Media"
          value={form.agency_name}
          onChange={(e) => set("agency_name", e.target.value)}
          className="border-line bg-elevated text-white placeholder:text-white/30"
          data-testid="waitlist-agency-input"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="wl-clients" className="text-xs font-medium text-white/70">
            Number of clients
          </Label>
          <select
            id="wl-clients"
            value={form.clients}
            onChange={(e) => set("clients", e.target.value)}
            className="h-10 w-full rounded-md border border-line bg-elevated px-3 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
          <Label htmlFor="wl-interest" className="text-xs font-medium text-white/70">
            Plan interest
          </Label>
          <select
            id="wl-interest"
            value={form.interest}
            onChange={(e) => set("interest", e.target.value)}
            className="h-10 w-full rounded-md border border-line bg-elevated px-3 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
        <Label className="text-xs font-medium text-white/70">Primary reporting channels</Label>
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
                    ? "border-accent bg-accent/15 text-accent-soft"
                    : "border-line bg-elevated text-white/60 hover:border-white/30 hover:text-white"
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
        <p className="text-sm text-[#FF4D4F]" role="alert" data-testid="waitlist-error">
          {error}
        </p>
      )}
      <Button
        type="submit"
        disabled={status === "loading"}
        className="h-11 w-full rounded-full bg-accent text-sm font-semibold text-white hover:bg-accent-strong"
        data-testid="waitlist-submit-button"
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join the waitlist"}
      </Button>
      <p className="text-center text-xs leading-relaxed text-white/40">
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
        <DialogContent className="max-w-md rounded-2xl border-line bg-surface p-6 sm:p-8" data-testid="waitlist-dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-semibold tracking-tight text-white">
              Join the waitlist
            </DialogTitle>
            <p className="mt-1 text-sm text-white/55">
              Get product updates and early-access details.
            </p>
          </DialogHeader>
          <WaitlistForm source={source} />
        </DialogContent>
      </Dialog>
    </WaitlistContext.Provider>
  );
}

export default WaitlistProvider;
