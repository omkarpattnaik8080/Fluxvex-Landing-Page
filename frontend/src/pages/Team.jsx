import { motion } from "framer-motion";
import { Sparkles, Linkedin, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Seo from "@/components/Seo";

/* Team members — sarcastic "status" lines carry the role; `photo` fills the
   portrait block (members without a photo render a gradient monogram). */
const TEAM = [
  { name: "Omkar Pattnaik", handle: "@omkarpattnaik", ago: "2m ago", status: "Handling everything", init: "OP", grad: "from-[#3D43E8] to-[#7B5CFF]", photo: "/team/omkar.jpg", title: "Instigator · roadmap", linkedin: "https://www.linkedin.com/in/omkar-pattnaik/" },
  { name: "Sneha Pradhan", handle: "@sneha.pradhan", ago: "12m ago", status: "Also handling everything", init: "SP", grad: "from-[#7B5CFF] to-[#C084FC]", photo: "/team/sneha.jpg", title: "Product & priorities", linkedin: "https://www.linkedin.com/in/sneha-pradhan-4a8832221/" },
  { name: "Sakti Swarupa Mallick", handle: "@sakti.swarupa", ago: "1h ago", status: "Making the tech behave", init: "SM", grad: "from-[#0E8A3E] to-[#43D675]", photo: null, title: "Architecture", linkedin: "https://www.linkedin.com/in/sakti-swarupa-mallick/" },
  { name: "Srestha", handle: "@srestha", ago: "3h ago", status: "Shipping the details", init: "SR", grad: "from-[#F2997E] to-[#F5C59F]", photo: null, title: "Distribution + strategy", linkedin: "https://www.linkedin.com/in/srestha735/" },
  { name: "Saswat Mohanty", handle: "@saswat.mohanty", ago: "5h ago", status: "Turning coffee into commits", init: "SM2", grad: "from-[#0F2E33] to-[#3D43E8]", photo: null, title: "Drawing — UI & UX", linkedin: "https://www.linkedin.com/in/saswat-mohanty-0a570a3a2/" },
  { name: "Nikhil Kumar Rana", handle: "@nikhil.rana", ago: "1d ago", status: "Teaching the AI manners", init: "NR", grad: "from-[#F5C518] to-[#F2997E]", photo: null, title: "Architecture · AI", linkedin: "https://www.linkedin.com/in/nikhal-kumar-rana-88871828b/" },
  { name: "Ankit Swain", handle: "@ankit.swain", ago: "2d ago", status: "Fixing things before they break", init: "AS", grad: "from-[#3B82F6] to-[#8B5CF6]", photo: null, title: "Distribution + strategy", linkedin: null },
  { name: "Jigisha Bhatnagar", handle: "@jigisha.b", ago: "3d ago", status: "Building the quiet parts", init: "JB", grad: "from-[#F472B6] to-[#FB923C]", photo: null, title: "Distribution + strategy", linkedin: null },
];

const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/* One member card — exact copy of the "Sienna Brooks" reference */
function MemberCard({ m, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.65, delay: (i % 3) * 0.1, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -8 }}
      className="group rounded-[24px] bg-white p-3 shadow-[0_36px_72px_-40px_rgba(16,16,20,0.35)] transition-shadow duration-500 hover:shadow-[0_54px_100px_-44px_rgba(61,67,232,0.45)]"
      data-testid={`team-card-${slug(m.name)}`}
    >
      {/* inner panel */}
      <div className="rounded-[18px] bg-[#E9E9E7] px-4 pb-0 pt-5">
        <a
          href={m.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center font-display text-[22px] font-semibold tracking-tight text-ink transition-colors duration-200 hover:text-accent"
          title={`${m.name} — ${m.title}`}
          data-testid={`team-link-${slug(m.name)}`}
        >
          {m.name}
        </a>
        <p className="mt-1 flex items-center justify-center gap-1.5 text-[12px] font-medium text-black/50">
          <Sparkles className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180" strokeWidth={2} /> {m.status}
        </p>
        <div className="mt-4 h-[250px] overflow-hidden rounded-t-xl">
          {m.photo ? (
            <img src={m.photo} alt={m.name} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" loading="lazy" />
          ) : (
            <span className={`flex h-full w-full items-center justify-center bg-gradient-to-b ${m.grad}`}>
              <span className="font-display text-5xl font-bold text-white/90 transition-transform duration-700 group-hover:scale-110">{m.init}</span>
            </span>
          )}
        </div>
      </div>
      {/* footer row */}
      <div className="flex items-center justify-between gap-3 px-2 py-3.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${m.grad} font-display text-[11px] font-bold text-white`}>
            {m.photo ? <img src={m.photo} alt="" className="h-full w-full object-cover object-top" loading="lazy" /> : m.init}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold leading-tight text-ink">{m.handle}</p>
            <p className="truncate text-[11px] leading-tight text-black/45">{m.title}</p>
          </div>
        </div>
        {m.linkedin ? (
          <a
            href={m.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[12px] font-semibold text-white transition-colors duration-200 hover:bg-accent"
            aria-label={`${m.name} on LinkedIn`}
            data-testid={`team-linkedin-${slug(m.name)}`}
          >
            <Linkedin className="h-3.5 w-3.5" strokeWidth={2} /> LinkedIn
          </a>
        ) : (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-[12px] font-semibold text-black/40">
            LinkedIn soon
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <>
      <Seo
        title="Our Team — The People Behind Fluxvex | Fluxvex"
        description="Meet the team building Fluxvex — the automated client-reporting workflow for marketing agencies."
        path="/team"
      />
      <Navbar />
      <main className="relative overflow-hidden bg-[#F1F2F1] pb-24 pt-[76px]" data-testid="team-page">
      {/* soft ambient color — the stage behind the cards */}
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(61,67,232,0.08),transparent_70%)] blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(67,214,117,0.1),transparent_70%)] blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,153,126,0.08),transparent_70%)] blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1100px] px-5 pt-14 lg:pt-20">
          {/* header */}
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft shadow-sm">
              <span className="text-accent">001</span>
              <span className="h-2.5 w-px bg-line" aria-hidden="true" /> Team
            </span>
            <h1 className="mt-5 font-display text-[32px] font-bold tracking-tight text-ink sm:text-[40px]">
              Meet the Fluxvex Minds
            </h1>
            <p className="mt-3.5 max-w-md text-[13.5px] leading-relaxed text-black/55">
              The people assembling the reporting workflow — small team, deep agency roots.
            </p>
          </div>

          {/* member cards */}
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m, i) => (
              <MemberCard key={m.name} m={m} i={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
