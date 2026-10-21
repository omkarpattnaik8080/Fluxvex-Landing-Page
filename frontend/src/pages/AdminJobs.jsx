import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, LogOut, Pencil, Plus, Power, Trash2 } from "lucide-react";
import Seo from "@/components/Seo";
import TapCTA from "@/components/ui/TapCTA";
import { FluxvexLogo } from "@/components/brand/FluxvexLogo";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function formatApiErrorDetail(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).filter(Boolean).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

const EMPTY_FORM = { title: "", team: "Growth", location: "", type: "Unpaid internship · 4 months", ppo: "", desc: "", wants: "" };

function JobForm({ initial, editingId, onSaved, onCancel }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => setForm(initial), [initial]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    const payload = { ...form, wants: form.wants.split("\n").map((w) => w.trim()).filter(Boolean) };
    try {
      if (editingId) await axios.patch(`${API}/careers/jobs/${editingId}`, payload, { withCredentials: true });
      else await axios.post(`${API}/careers/jobs`, payload, { withCredentials: true });
      setStatus("idle");
      onSaved();
    } catch (err) {
      setStatus("idle");
      setError(formatApiErrorDetail(err.response?.data?.detail));
    }
  };

  const field = "w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <form onSubmit={submit} className="space-y-3 rounded-2xl border border-accent/30 bg-accent-tint/30 p-5" data-testid="admin-job-form">
      <p className="font-display text-base font-semibold text-ink">{editingId ? "Edit job" : "Post a new job"}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <input className={field} placeholder="Job title (e.g. SaaS Sales Intern)" value={form.title} onChange={(e) => set("title", e.target.value)} data-testid="admin-job-title-input" />
        <input className={field} placeholder="Team (e.g. Growth)" value={form.team} onChange={(e) => set("team", e.target.value)} data-testid="admin-job-team-input" />
        <input className={field} placeholder="Location (e.g. Remote · USA)" value={form.location} onChange={(e) => set("location", e.target.value)} data-testid="admin-job-location-input" />
        <input className={field} placeholder="Type (e.g. Unpaid internship · 4 months)" value={form.type} onChange={(e) => set("type", e.target.value)} data-testid="admin-job-type-input" />
      </div>
      <input className={field} placeholder="PPO line (e.g. Guaranteed PPO conversion chances—up to ₹6 LPA)" value={form.ppo} onChange={(e) => set("ppo", e.target.value)} data-testid="admin-job-ppo-input" />
      <textarea className={`${field} min-h-[80px] resize-y`} placeholder="Short description of the role" value={form.desc} onChange={(e) => set("desc", e.target.value)} data-testid="admin-job-desc-input" />
      <textarea className={`${field} min-h-[70px] resize-y`} placeholder={"What we look for — one per line"} value={form.wants} onChange={(e) => set("wants", e.target.value)} data-testid="admin-job-wants-input" />
      {error && <p className="text-sm text-[#D64545]" role="alert" data-testid="admin-job-error">{error}</p>}
      <div className="flex flex-wrap gap-2.5">
        <TapCTA
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong disabled:opacity-60"
          testid="admin-save-job-button"
        >
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          {editingId ? "Save changes" : "Post job"}
        </TapCTA>
        {editingId && (
          <TapCTA onClick={onCancel} className="inline-flex h-10 items-center rounded-full border border-line bg-page px-5 text-sm font-semibold text-ink-soft hover:bg-surface" testid="admin-cancel-edit-button">
            Cancel
          </TapCTA>
        )}
      </div>
    </form>
  );
}

export default function AdminJobs() {
  const [checking, setChecking] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [actionError, setActionError] = useState("");

  const loadJobs = () =>
    axios
      .get(`${API}/careers/jobs?all=true`, { withCredentials: true })
      .then((res) => setJobs(Array.isArray(res.data) ? res.data : []))
      .catch(() => setJobs([]));

  useEffect(() => {
    axios
      .get(`${API}/auth/me`, { withCredentials: true })
      .then((res) => {
        setAdmin(res.data);
        return loadJobs();
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  const login = async (e) => {
    e.preventDefault();
    if (loginLoading) return;
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await axios.post(`${API}/auth/login`, creds, { withCredentials: true });
      setAdmin({ email: res.data.email });
      await loadJobs();
    } catch (err) {
      setLoginError(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = async () => {
    await axios.post(`${API}/auth/logout`, {}, { withCredentials: true }).catch(() => {});
    setAdmin(null);
    setJobs([]);
  };

  const toggleActive = async (job) => {
    await axios.patch(`${API}/careers/jobs/${job.id}`, { active: !job.active }, { withCredentials: true }).catch(() => {});
    loadJobs();
  };

  const remove = async (job) => {
    setActionError("");
    try {
      await axios.delete(`${API}/careers/jobs/${job.id}`, { withCredentials: true });
      loadJobs();
    } catch (err) {
      setActionError(formatApiErrorDetail(err.response?.data?.detail));
    }
  };

  const startEdit = (job) =>
    setEditing({
      id: job.id,
      form: { title: job.title, team: job.team, location: job.location, type: job.type, ppo: job.ppo, desc: job.desc, wants: (job.wants || []).join("\n") },
    });

  const field = "h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm text-ink placeholder:text-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <div className="min-h-screen bg-page px-5 pb-20 pt-[110px] lg:px-8" data-testid="admin-jobs-page">
      <Seo title="Job postings admin — Fluxvex" description="Fluxvex admin area." path="/admin/jobs" noindex />
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <FluxvexLogo tone="ink" size={20} />
          {admin && (
            <TapCTA onClick={logout} className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-page px-4 text-xs font-semibold text-ink-soft hover:bg-surface" testid="admin-logout-button">
              <LogOut className="h-3.5 w-3.5" /> Log out
            </TapCTA>
          )}
        </div>

        {checking ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-accent" />
          </div>
        ) : !admin ? (
          <form onSubmit={login} className="mx-auto mt-16 max-w-sm space-y-3 rounded-2xl border border-line bg-page p-7 shadow-[0_30px_70px_-30px_rgba(16,16,20,0.35)]" data-testid="admin-login-form">
            <h1 className="font-display text-xl font-semibold tracking-tight text-ink">Admin sign in</h1>
            <p className="text-xs leading-relaxed text-ink-soft">Manage the job openings shown on the careers page.</p>
            <input type="email" className={field} placeholder="Admin email" value={creds.email} onChange={(e) => setCreds((c) => ({ ...c, email: e.target.value }))} data-testid="admin-email-input" />
            <input type="password" className={field} placeholder="Password" value={creds.password} onChange={(e) => setCreds((c) => ({ ...c, password: e.target.value }))} data-testid="admin-password-input" />
            {loginError && <p className="text-sm text-[#D64545]" role="alert" data-testid="admin-login-error">{loginError}</p>}
            <TapCTA type="submit" disabled={loginLoading} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-white transition-colors hover:bg-accent-strong disabled:opacity-60" testid="admin-login-button">
              {loginLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
            </TapCTA>
          </form>
        ) : (
          <div className="mt-10 space-y-8" data-testid="admin-dashboard">
            <div>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Job postings</h1>
              <p className="mt-1 text-sm text-ink-soft">Everything here appears on the careers page the moment you save.</p>
            </div>

            {editing ? (
              <JobForm
                initial={editing.form}
                editingId={editing.id}
                onSaved={() => {
                  setEditing(null);
                  loadJobs();
                }}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <JobForm initial={EMPTY_FORM} editingId={null} onSaved={loadJobs} onCancel={() => {}} />
            )}

            <div className="space-y-3">
              {actionError && (
                <p className="rounded-xl border border-[#D64545]/30 bg-[#D64545]/[0.06] px-4 py-2.5 text-sm text-[#D64545]" role="alert" data-testid="admin-action-error">
                  {actionError}
                </p>
              )}
              {jobs.length === 0 && <p className="text-sm text-ink-soft">No job postings yet—post the first one above.</p>}
              {jobs.map((job) => (
                <div key={job.id} className={`flex flex-col gap-4 rounded-2xl border border-line bg-page p-5 sm:flex-row sm:items-center ${job.deleted ? "opacity-55" : ""}`} data-testid={`admin-job-card-${job.slug}`}>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display text-base font-semibold text-ink">{job.title}</p>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${job.deleted ? "bg-black/[0.06] text-black/40 line-through" : job.active ? "bg-mint/15 text-[#0E8A3E]" : "bg-black/[0.06] text-black/45"}`} data-testid={`admin-job-status-${job.slug}`}>
                        {job.deleted ? "Removed" : job.active ? "Live" : "Hidden"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-ink-soft">
                      {job.team} · {job.location} · {job.type}
                    </p>
                    <p className="mt-1 text-xs text-ink-soft">{job.ppo}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {!job.deleted ? (
                      <>
                        <TapCTA onClick={() => toggleActive(job)} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 text-xs font-semibold text-ink hover:border-accent/40 hover:text-accent" testid={`admin-job-toggle-${job.slug}`}>
                          <Power className="h-3.5 w-3.5" /> {job.active ? "Hide" : "Show"}
                        </TapCTA>
                        <TapCTA onClick={() => startEdit(job)} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 text-xs font-semibold text-ink hover:border-accent/40 hover:text-accent" testid={`admin-job-edit-${job.slug}`}>
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </TapCTA>
                        <TapCTA onClick={() => remove(job)} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#D64545]/30 bg-[#D64545]/[0.06] px-3.5 text-xs font-semibold text-[#D64545] hover:bg-[#D64545]/10" testid={`admin-job-delete-${job.slug}`}>
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </TapCTA>
                      </>
                    ) : (
                      <span className="text-xs text-black/40">No longer listed on the careers page</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
