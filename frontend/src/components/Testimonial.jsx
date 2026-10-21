import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";

function PressTile({ children, className = "" }) {
  return (
    <div
      className={`relative flex h-28 items-center justify-center overflow-hidden rounded-lg border border-black/[0.05] bg-[#F3F2EE] shadow-[inset_0_2px_6px_rgba(0,0,0,0.06)] ${className}`}
      aria-hidden="true"
    >
      <span
        className="absolute right-0 top-0 h-5 w-5 bg-[#E7E5DE]"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      />
      <span
        className="absolute right-0 top-0 h-5 w-5 bg-[#F3F2EE]"
        style={{ clipPath: "polygon(100% 0, 100% 100%, calc(100% - 5px) calc(100% - 5px), 5px 5px)" }}
      />
      {children}
    </div>
  );
}

export default function Testimonial() {
  return (
    <section className="bg-page px-5 pb-4 pt-2 sm:px-2.5" data-testid="section-promise">
      <Reveal>
        <div className="mx-auto max-w-[1280px] rounded-xl border border-accent-border bg-[#FDFDFA]">
          <div className="grid lg:grid-cols-2">
            {/* quote */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Our promise</p>
              <blockquote className="mt-6">
                <CinematicText
                  as="p"
                  className="font-display text-xl font-medium leading-[1.45] tracking-tight text-ink sm:text-2xl"
                >
                  {[
                    "Reporting shouldn’t be the heaviest lift of the month.",
                    "Fluxvex assembles the numbers and the structure—",
                    "your team keeps the judgment calls.",
                  ]}
                </CinematicText>
              </blockquote>
              <div className="mt-8 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-tint">
                  <FluxvexMark size={20} />
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-ink">The Fluxvex team</p>
                  <p className="text-xs text-ink-soft">Building the reporting workflow</p>
                </div>
              </div>
            </div>

            {/* pressed tile grid */}
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <PressTile key={i}>
                    {i === 4 ? (
                      <span className="flex items-center gap-2">
                        <FluxvexMark size={22} />
                        <span className="font-display text-xl font-semibold tracking-tight text-ink">Fluxvex</span>
                      </span>
                    ) : null}
                  </PressTile>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
