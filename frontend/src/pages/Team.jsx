import { motion } from "framer-motion";
import { Sparkles, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Seo from "@/components/Seo";

/* Team members — sarcastic "status" lines carry the role; `photo` fills the
   portrait block (members without a photo render a gradient monogram). */
const TEAM = [
  { name: "Omkar Pattnaik", handle: "@omkarpattnaik", ago: "2m ago", status: "Handling everything", init: "OP", grad: "from-[#3D43E8] to-[#7B5CFF]", photo: "/team/omkar.jpg", title: "Founder & CEO", linkedin: "https://www.linkedin.com/in/omkar-pattnaik/" },
  { name: "Sneha Pradhan", handle: "@sneha.pradhan", ago: "12m ago", status: "Also handling everything", init: "SP", grad: "from-[#7B5CFF] to-[#C084FC]", photo: "/team/sneha.jpg", title: "Product Manager & Co-founder", linkedin: "https://www.linkedin.com/in/sneha-pradhan-4a8832221/" },
  { name: "Sakti Swarupa Mallick", handle: "@sakti.swarupa", ago: "1h ago", status: "Making the tech behave", init: "SM", grad: "from-[#0E8A3E] to-[#43D675]", photo: null, title: "CTO", linkedin: "https://www.linkedin.com/in/sakti-swarupa-mallick/" },
  { name: "Srestha", handle: "@srestha", ago: "3h ago", status: "Shipping the details", init: "SR", grad: "from-[#F2997E] to-[#F5C59F]", photo: null, title: "Team", linkedin: "https://www.linkedin.com/in/srestha735/" },
  { name: "Saswat Mohanty", handle: "@saswat.mohanty", ago: "5h ago", status: "Turning coffee into commits", init: "SM2", grad: "from-[#0F2E33] to-[#3D43E8]", photo: null, title: "Team", linkedin: "https://www.linkedin.com/in/saswat-mohanty-0a570a3a2/" },
  { name: "Nikhil Kumar Rana", handle: "@nikhil.rana", ago: "1d ago", status: "Teaching the AI manners", init: "NR", grad: "from-[#F5C518] to-[#F2997E]", photo: null, title: "Founding Engineer · AI", linkedin: "https://www.linkedin.com/in/nikhal-kumar-rana-88871828b/" },
];

const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/* One member card — exact copy of the "Sienna Brooks" reference */
function MemberCard({ m, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -6 }}
      className="rounded-[24px] bg-white p-3 shadow-[0_36px_72px_-40px_rgba(16,16,20,0.35)]"
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
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2} /> {m.status}
        </p>
        <div className="mt-4 h-[250px] overflow-hidden rounded-t-xl">
          {m.photo ? (
            <img src={m.photo} alt={m.name} className="h-full w-full object-cover object-top" loading="lazy" />
          ) : (
            <span className={`flex h-full w-full items-center justify-center bg-gradient-to-b ${m.grad}`}>
              <span className="font-display text-5xl font-bold text-white/90">{m.init}</span>
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
        <a
          href="/careers"
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[12px] font-semibold text-white transition-colors duration-200 hover:bg-black/85"
          aria-label={`Join the team like ${m.name}`}
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} /> Add member
        </a>
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
      <main className="bg-[#F1F2F1] pb-24 pt-[76px]" data-testid="team-page">
        <div className="mx-auto max-w-[1100px] px-5 pt-14 lg:pt-20">
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
