import { useState } from "react";
import { Check, Loader2, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Seo from "@/components/Seo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", agency: "", message: "", trap: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      await axios.post(`${API}/contact`, form);
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

  return (
    <>
      <Seo
        title="Contact Fluxvex — Questions About Agency Reporting"
        description="Questions about Fluxvex, integrations, or early access? Send a short inquiry and the team will reply by email."
      />
      <Navbar />
      <main className="border-t border-hairline">
        <div className="mx-auto grid max-w-[1280px] gap-14 px-5 py-16 lg:grid-cols-2 lg:gap-24 lg:px-8 lg:py-24">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Contact</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-5xl">
              Questions about Fluxvex?
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-white/55">
              Tell us about your agency and reporting workflow. We read every message and reply by email—usually
              within a couple of business days.
            </p>
            <div className="mt-10 space-y-4 border-t border-hairline pt-8 text-sm text-white/55">
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" /> Waitlist questions are answered fastest through the
                waitlist form—join from any “Join the waitlist” button.
              </p>
              <p>Integration, security, and partnership questions are all welcome here.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-7 sm:p-9" data-testid="contact-form-card">
            {status === "success" ? (
              <div className="py-10 text-center" data-testid="contact-success">
                <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-6 w-6" />
                </span>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-white">Message received.</h2>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/60">
                  Thanks for reaching out—we’ll reply to the email you provided.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4" noValidate>
                <input type="text" name="trap" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="ct-name" className="text-xs font-medium text-white/70">
                      Name <span className="text-accent">*</span>
                    </Label>
                    <Input id="ct-name" required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Alex Rivera" className="border-line bg-elevated text-white placeholder:text-white/30" data-testid="contact-name-input" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ct-email" className="text-xs font-medium text-white/70">
                      Work email <span className="text-accent">*</span>
                    </Label>
                    <Input id="ct-email" type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@agency.com" className="border-line bg-elevated text-white placeholder:text-white/30" data-testid="contact-email-input" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ct-agency" className="text-xs font-medium text-white/70">
                    Agency <span className="text-white/35">(optional)</span>
                  </Label>
                  <Input id="ct-agency" value={form.agency} onChange={(e) => set("agency", e.target.value)} placeholder="Northbeam Media" className="border-line bg-elevated text-white placeholder:text-white/30" data-testid="contact-agency-input" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ct-message" className="text-xs font-medium text-white/70">
                    Message <span className="text-accent">*</span>
                  </Label>
                  <textarea
                    id="ct-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="What would you like to know?"
                    className="w-full rounded-md border border-line bg-elevated px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    data-testid="contact-message-input"
                  />
                </div>
                {error && (
                  <p className="text-sm text-[#FF4D4F]" role="alert" data-testid="contact-error">
                    {error}
                  </p>
                )}
                <Button type="submit" disabled={status === "loading"} className="h-11 w-full rounded-full bg-accent text-sm font-semibold hover:bg-accent-strong" data-testid="contact-submit-button">
                  {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
