import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Facebook, Linkedin, Twitter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Seo from "@/components/Seo";

/* Team members — drop `photo` URLs in when the portraits are ready; until then
   the cards render gradient monogram blocks in the same layout. */
const TEAM = [
  { name: "Aarav Shah", role: "Founder", init: "AS", grad: "from-[#3D43E8] to-[#7B5CFF]", photo: null },
  { name: "Meera Kapoor", role: "Head of Product", init: "MK", grad: "from-[#7B5CFF] to-[#C084FC]", photo: null },
  { name: "Rohan Iyer", role: "Engineering Lead", init: "RI", grad: "from-[#0E8A3E] to-[#43D675]", photo: null },
  { name: "Sana Qureshi", role: "Design Lead", init: "SQ", grad: "from-[#F2997E] to-[#F5C59F]", photo: null },
  { name: "Dev Patel", role: "AI Engineer", init: "DP", grad: "from-[#0F2E33] to-[#3D43E8]", photo: null },
  { name: "Nikita Rao", role: "Customer Success", init: "NR", grad: "from-[#F5C518] to-[#F2997E]", photo: null },
];

const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function Team() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const hoverRef = useRef(null);

  const go = (dir) => setActive((v) => (v + dir + TEAM.length) % TEAM.length);

  useEffect(() => {
    if (reduce || paused) return undefined;
    const id = setInterval(() => setActive((v) => (v + 1) % TEAM.length), 4200);
    return () => clearInterval(id);
  }, [reduce, paused]);

  /* five visible slots, active always centered */
  const visible = [0, 1, 2, 3, 4].map((off) => TEAM[(active - 2 + off + TEAM.length * 2) % TEAM.length]);

  return (
    <>
      <Seo
        title="Our Team — The People Behind Fluxvex | Fluxvex"
        description="Meet the team building Fluxvex — the automated client-reporting workflow for marketing agencies."
        path="/team"
      />
      <Navbar />
      <main className="bg-[#0B0B0D] pb-20 pt-[76px]" data-testid="team-page">
        <div className="fine-grid pointer-events-none absolute" aria-hidden="true" />
        <div className="mx-auto max-w-[1100px] px-5 pt-14 lg:px-8 lg:pt-20">
          <div
            className="relative overflow-hidden rounded-[32px] bg-white px-6 py-12 shadow-[0_80px_160px_-60px_rgba(0,0,0,0.8)] sm:px-10 lg:px-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            ref={hoverRef}
          >
            {/* header */}
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                <span className="text-accent">001</span>
                <span className="h-2.5 w-px bg-line" aria-hidden="true" /> Team
              </span>
              <h1 className="mt-5 font-display text-[32px] font-bold tracking-tight text-ink sm:text-[40px]">
                Meet the Fluxvex Minds
              </h1>
            </div>

            {/* carousel */}
            <div className="mt-12 flex items-end justify-center gap-3 sm:gap-4">
              {visible.map((m, slot) => {
                const isActive = slot === 2;
                return (
                  <motion.button
                    key={m.name}
                    type="button"
                    onClick={() => setActive(TEAM.indexOf(m))}
                    initial={false}
                    animate={{
                      width: isActive ? 196 : 148,
                      opacity: isActive ? 1 : 0.55,
                    }}
                    transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                    className={`hidden shrink-0 flex-col text-left md:flex ${slot === 0 || slot === 4 ? "lg:flex" : ""} ${slot === 0 || slot === 4 ? "hidden lg:flex" : ""}`}
                    data-testid={`team-card-${slug(m.name)}`}
                    aria-label={`${m.name}, ${m.role}`}
                  >
                    <span
                      className={`relative block w-full overflow-hidden rounded-2xl transition-all duration-500 ${
                        isActive ? "h-[240px] shadow-[0_40px_80px_-32px_rgba(16,16,20,0.55)]" : "h-[190px] grayscale"
                      }`}
                    >
                      {m.photo ? (
                        <img src={m.photo} alt={m.name} className={`h-full w-full object-cover ${isActive ? "" : "grayscale"}`} />
                      ) : (
                        <span className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${m.grad}`}>
                          <span className="font-display text-4xl font-bold text-white/90">{m.init}</span>
                        </span>
                      )}
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                          className="absolute inset-x-0 bottom-3 flex justify-center gap-2"
                        >
                          {[Facebook, Linkedin, Twitter].map((Icon, i) => (
                            <span
                              key={i}
                              className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/85 text-white backdrop-blur transition-colors hover:bg-ink"
                            >
                              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                            </span>
                          ))}
                        </motion.span>
                      )}
                    </span>
                    <span className={`mt-3 block truncate text-[14px] font-semibold ${isActive ? "text-ink" : "text-ink/60"}`}>
                      {m.name}
                    </span>
                    {isActive && <span className="mt-0.5 block truncate text-[11.5px] text-black/45">({m.role})</span>}
                  </motion.button>
                );
              })}
            </div>

            {/* active member — mobile */}
            <div className="mt-8 text-center md:hidden">
              <p className="font-display text-xl font-bold text-ink">{TEAM[active].name}</p>
              <p className="mt-1 text-xs text-black/45">{TEAM[active].role}</p>
            </div>

            {/* controls: progress line + arrows */}
            <div className="mt-10 flex items-center gap-6">
              <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-black/[0.08]" data-testid="team-progress" aria-hidden="true">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#43D675] via-[#3D43E8] to-[#7B5CFF]"
                  animate={{ width: `${((active + 1) / TEAM.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                />
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition-transform duration-200 hover:scale-105"
                  data-testid="team-prev"
                  aria-label="Previous team member"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition-transform duration-200 hover:scale-105"
                  data-testid="team-next"
                  aria-label="Next team member"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
