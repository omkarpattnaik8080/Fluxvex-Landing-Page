import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionShell } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";

export const FAQS = [
  ["What does Fluxvex do?", "Fluxvex is an automated client-reporting platform for digital marketing agencies. It is designed to turn Google Ads, Meta Ads, and GA4 data into consistent, white-label client reports without rebuilding spreadsheets and slides every reporting cycle."],
  ["Which platforms does Fluxvex support at launch?", "Our initial integration focus is Google Ads, Meta Ads, and Google Analytics 4. Additional platforms may follow after launch."],
  ["Can I add my agency’s branding to reports?", "Yes—white-label report styling with your agency’s branding is part of the planned launch scope. Reports are designed to present under your agency’s brand, not ours."],
  ["Does Fluxvex automatically schedule reports?", "Scheduled delivery is planned as part of the reporting workflow. We will confirm the exact scheduling options closer to launch."],
  ["Can ChatGPT or Claude do the same thing?", "General AI assistants can help draft summaries and explore data. A recurring agency reporting workflow also needs dependable data connections, consistent metric definitions, client separation, branding, and delivery—Fluxvex is built to own that workflow."],
  ["How does Fluxvex access connected advertising data?", "Through OAuth-based connections with least-privilege scopes wherever the platform supports them. You authorize access, and you can disconnect an account at any time."],
  ["How can I disconnect an account or request deletion?", "You will be able to disconnect connected platforms from inside the product at any time. For data deletion requests, contact us through the contact page and we will confirm what is removed and when."],
  ["Is Fluxvex GDPR, CCPA/CPRA, or DPDP compliant?", "We do not publish blanket compliance claims. We are building Fluxvex with privacy as a product requirement, and our security page describes the current status of the controls and processes that support applicable obligations."],
  ["Is Fluxvex ISO/IEC 27001 certified or SOC 2 audited?", "No. We do not claim certification or audit status that has not been completed and documented. If that changes, we will state it explicitly, with scope."],
  ["When will pricing be available?", "Pricing will be announced before launch. Plans are shaping up around the number of client accounts each agency manages—join the waitlist to get the announcement."],
  ["How do I join the waitlist?", "Use the Join the waitlist form on this site. You will need a work email; agency name and client count are optional. We will email you when there is a meaningful launch or early-access update."],
];

export default function Faq() {
  return (
    <SectionShell id="faq">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">FAQ</p>
          </Reveal>
          <CinematicText
            as="h2"
            className="mt-4 font-display text-3xl font-semibold leading-[1.04] tracking-tighter2 text-ink sm:text-4xl lg:text-[44px]"
          >
            Asked about Fluxvex, answered plainly.
          </CinematicText>
        </div>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="border-t border-line" data-testid="faq-accordion">
            {FAQS.map(([q, a], i) => (
              <AccordionItem key={q} value={`q-${i}`} className="border-b border-line">
                <AccordionTrigger className="py-5 text-left text-[16px] font-medium text-ink hover:text-accent hover:no-underline" data-testid={`faq-trigger-${i + 1}`}>
                  {q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-ink-soft">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </SectionShell>
  );
}
