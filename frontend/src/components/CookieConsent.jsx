import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import TapCTA from "@/components/ui/TapCTA";

const KEY = "fluxvex-consent-v1";

function readConsent() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [consent, setConsent] = useState({ essential: true, analytics: false, marketing: false });

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      const t = setTimeout(() => setBannerOpen(true), 1200);
      return () => clearTimeout(t);
    }
    setConsent(existing);
  }, []);

  useEffect(() => {
    const open = () => {
      setBannerOpen(false);
      setPrefsOpen(true);
    };
    window.addEventListener("open-cookie-preferences", open);
    return () => window.removeEventListener("open-cookie-preferences", open);
  }, []);

  const save = (value) => {
    const record = { ...value, savedAt: new Date().toISOString() };
    setConsent(record);
    localStorage.setItem(KEY, JSON.stringify(record));
    setBannerOpen(false);
    setPrefsOpen(false);
  };

  return (
    <>
      {bannerOpen && !prefsOpen && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-4 z-[70] rounded-xl border border-line bg-page p-5 shadow-[0_30px_70px_-20px_rgba(16,16,20,0.35)] sm:left-1/2 sm:right-auto sm:w-[520px] sm:-translate-x-1/2"
          data-testid="cookie-banner"
        >
          <h2 className="font-display text-base font-semibold text-ink">Your privacy choices</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
            We use essential cookies to operate this site. With your permission, we may also use analytics or
            marketing cookies to understand usage and improve our outreach. You can change your choices at any time.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <TapCTA onClick={() => save({ essential: true, analytics: true, marketing: true })} className="h-9 rounded-full bg-accent px-4 text-xs font-semibold text-white hover:bg-accent-strong" testid="cookie-accept-all-button">
              Accept all
            </TapCTA>
            <TapCTA onClick={() => save({ essential: true, analytics: false, marketing: false })} className="h-9 rounded-full border border-line bg-page px-4 text-xs font-semibold text-ink hover:bg-surface" testid="cookie-reject-optional-button">
              Reject optional
            </TapCTA>
            <TapCTA onClick={() => { setBannerOpen(false); setPrefsOpen(true); }} className="h-9 rounded-full px-4 text-xs font-semibold text-ink-soft hover:bg-surface hover:text-ink" testid="cookie-customize-button">
              Customize
            </TapCTA>
          </div>
          <p className="mt-3 text-[11px] text-black/40">
            Read the{" "}
            <Link to="/privacy-policy" className="font-medium text-accent underline-offset-2 hover:underline" data-testid="cookie-privacy-link">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      )}

      <Dialog open={prefsOpen} onOpenChange={setPrefsOpen}>
        <DialogContent className="max-w-md rounded-2xl border-line bg-page p-6 sm:p-8" data-testid="cookie-preferences-dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-semibold tracking-tight text-ink">
              Cookie preferences
            </DialogTitle>
            <DialogDescription className="sr-only">
              Manage which cookies Fluxvex may use.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 space-y-4">
            {[
              { key: "essential", label: "Essential cookies", desc: "Required to operate the site. Always on.", locked: true },
              { key: "analytics", label: "Analytics", desc: "Understand usage so we can improve the product story.", locked: false },
              { key: "marketing", label: "Marketing", desc: "Measure outreach campaigns. Off until you allow it.", locked: false },
            ].map((c) => (
              <div key={c.key} className="flex items-start justify-between gap-4 rounded-xl border border-line bg-surface p-4" data-testid={`cookie-pref-${c.key}`}>
                <div>
                  <p className="text-sm font-semibold text-ink">{c.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">{c.desc}</p>
                </div>
                <Switch
                  checked={consent[c.key]}
                  disabled={c.locked}
                  onCheckedChange={(v) => setConsent((s) => ({ ...s, [c.key]: v }))}
                  className="data-[state=checked]:bg-accent"
                  data-testid={`cookie-switch-${c.key}`}
                />
              </div>
            ))}
          </div>
          <TapCTA onClick={() => save(consent)} className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-white hover:bg-accent-strong" testid="cookie-save-button">
            Save choices
          </TapCTA>
        </DialogContent>
      </Dialog>
    </>
  );
}
