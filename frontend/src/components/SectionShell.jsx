import CinematicText from "@/components/ui/CinematicText";
import { Reveal } from "@/components/Reveal";

export const SectionShell = ({ id, children, className = "" }) => (
  <section id={id} className={`border-t border-hairline ${className}`} data-testid={`section-${id || "unnamed"}`}>
    <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-28">{children}</div>
  </section>
);

export const Overline = ({ children }) => (
  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{children}</p>
);

export const SectionHeader = ({ overline, title, copy, align = "split" }) => (
  <div
    className={`mb-14 gap-10 lg:mb-20 ${
      align === "split"
        ? "flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        : "mx-auto max-w-3xl text-center"
    }`}
  >
    <div className="max-w-2xl">
      <Reveal>
        <Overline>{overline}</Overline>
      </Reveal>
      <CinematicText
        as="h2"
        className="mt-4 font-display text-3xl font-semibold leading-[1.04] tracking-tighter2 text-white sm:text-4xl lg:text-[44px]"
      >
        {title}
      </CinematicText>
    </div>
    {copy && (
      <Reveal delay={0.15} className={align === "split" ? "max-w-sm lg:pb-2" : "mx-auto mt-5 max-w-xl"}>
        <p className="text-[15px] leading-[1.7] text-white/55">{copy}</p>
      </Reveal>
    )}
  </div>
);
