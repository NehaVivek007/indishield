import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  Info,
  Scale,
  Shield,
  XCircle,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const scoringRows = [
  {
    parameter: "Policy Status",
    weight: "25 pts",
    description: "Whether the policy was active and valid on the date of loss",
    isTotal: false,
  },
  {
    parameter: "Cause of Fire",
    weight: "20 pts",
    description:
      "The legal classification of the fire's cause and coverage implications",
    isTotal: false,
  },
  {
    parameter: "Fire Brigade Report",
    weight: "20 pts",
    description: "Availability of official corroborating evidence",
    isTotal: false,
  },
  {
    parameter: "Reporting Delay",
    weight: "15 pts",
    description: "Timeliness of insurer notification per policy conditions",
    isTotal: false,
  },
  {
    parameter: "Documents Submitted",
    weight: "10 pts",
    description: "Completeness of claim documentation",
    isTotal: false,
  },
  {
    parameter: "Surveyor Report",
    weight: "10 pts",
    description: "Status of the insurer's own loss assessment",
    isTotal: false,
  },
  {
    parameter: "Contextual Analysis",
    weight: "±10 pts",
    description: "Based on your detailed free-text descriptions",
    isTotal: false,
  },
  {
    parameter: "TOTAL",
    weight: "100 pts",
    description: "",
    isTotal: true,
  },
];

const scoreBands = [
  {
    label: "STRONG",
    range: "70–100",
    desc: "High legal viability",
    bgStyle: { background: "oklch(0.97 0.04 142)" },
    borderStyle: { borderColor: "oklch(0.85 0.08 142)" },
    textStyle: { color: "oklch(0.45 0.15 142)" },
    dotStyle: { background: "oklch(0.55 0.18 142)" },
  },
  {
    label: "MODERATE",
    range: "40–69",
    desc: "Improvable with remedial steps",
    bgStyle: { background: "oklch(0.97 0.04 65)" },
    borderStyle: { borderColor: "oklch(0.85 0.08 65)" },
    textStyle: { color: "oklch(0.50 0.14 65)" },
    dotStyle: { background: "oklch(0.60 0.16 65)" },
  },
  {
    label: "WEAK",
    range: "0–39",
    desc: "High denial risk",
    bgStyle: { background: "oklch(0.97 0.04 25)" },
    borderStyle: { borderColor: "oklch(0.85 0.08 25)" },
    textStyle: { color: "oklch(0.45 0.18 25)" },
    dotStyle: { background: "oklch(0.55 0.20 25)" },
  },
];

const cases = [
  {
    id: "case-1",
    cite: "New India Assurance Co. Ltd. v. Pradeep Kumar (2009) 7 SCC 787",
    forum: "Supreme Court",
    relevance:
      "Surveyor's report is not sacrosanct; consumer forums have power to grant compensation beyond surveyor's assessment when it is found arbitrary or incomplete.",
  },
  {
    id: "case-2",
    cite: "United India Insurance Co. v. Manubhai Dharmasinhbhai Gajera (2008) 10 SCC 404",
    forum: "Supreme Court",
    relevance:
      "Mere delay in intimation does not justify repudiation if the insurer suffered no prejudice from the delay. Condition requiring immediate notice is directory, not mandatory.",
  },
  {
    id: "case-3",
    cite: "Oriental Insurance Co. Ltd. v. Sony Cheriyan (1999) 6 SCC 451",
    forum: "Supreme Court",
    relevance:
      "Repudiation on technical/procedural grounds without genuine investigation constitutes deficiency of service under Consumer Protection Act.",
  },
  {
    id: "case-4",
    cite: "Galada Power and Telecommunication Ltd. v. United India Insurance Co. Ltd. (NCDRC 2011)",
    forum: "NCDRC",
    relevance:
      "Electrical short circuit causing fire is an accidental cause covered under standard fire and special perils policy; insurer cannot classify it as mechanical breakdown exclusion.",
  },
  {
    id: "case-5",
    cite: "National Insurance Co. Ltd. v. Nitin Khandelwal (2008) 11 SCC 259",
    forum: "Supreme Court",
    relevance:
      "In arson claims, burden of proof to establish willful fire by insured lies entirely on the insurer; mere suspicion is insufficient for repudiation.",
  },
  {
    id: "case-6",
    cite: "LIC of India v. Consumer Education & Research Centre AIR 1995 SC 1811",
    forum: "Supreme Court",
    relevance:
      "Suppression of material fact must be judged by materiality test — only facts that would have altered underwriting decision are material; minor non-disclosures cannot void policy.",
  },
  {
    id: "case-7",
    cite: "Pramod Kumar Arora v. United India Insurance Co. (NCDRC 2015)",
    forum: "NCDRC",
    relevance:
      "Insurer cannot repudiate solely on ground of document incompleteness without giving claimant reasonable opportunity to furnish missing documents.",
  },
  {
    id: "case-8",
    cite: "Dhanna Lal v. New India Assurance Co. (SCDRC Rajasthan 2016)",
    forum: "SCDRC",
    relevance:
      "Where cause of fire is unknown/undetermined, insurer cannot repudiate without positive evidence of an exclusion clause applying; doubt must resolve in favour of insured.",
  },
  {
    id: "case-9",
    cite: "Star Paper Mills Ltd. v. The Oriental Insurance Co. Ltd. (NCDRC 2018)",
    forum: "NCDRC",
    relevance:
      "Insurer's failure to appoint surveyor within stipulated time constitutes deficiency of service and cannot be used to delay or defeat the claim.",
  },
  {
    id: "case-10",
    cite: "P. Chandramma v. New India Assurance Co. Ltd. (NCDRC 2019)",
    forum: "NCDRC",
    relevance:
      "FIR and fire brigade report corroboration is sufficient prima facie evidence of loss; insured need not produce forensic expert evidence unless insurer raises specific fraud allegation.",
  },
];

const statutes = [
  {
    icon: <Shield size={18} className="text-[#c9a84c]" />,
    name: "Consumer Protection Act 2019",
    badge: "Primary Statute",
    details: [
      "Primary statute for filing consumer disputes against insurers.",
      "Provides District, State (SCDRC), and National (NCDRC) forums based on claim amount.",
      "Limitation period: 2 years from the date of cause of action.",
      "Enables compensation, costs, and punitive damages against deficient insurers.",
    ],
  },
  {
    icon: <Scale size={18} className="text-[#c9a84c]" />,
    name: "Insurance Act 1938 — Section 45",
    badge: "Policy Law",
    details: [
      "Governs repudiation of policies on grounds of misrepresentation or fraud.",
      "Establishes the materiality test for non-disclosure — only underwriting-relevant facts are material.",
      "Restricts the insurer's right to void policies on non-disclosure after a defined period.",
      "Protects policyholders from arbitrary policy cancellations.",
    ],
  },
  {
    icon: <FileText size={18} className="text-[#c9a84c]" />,
    name: "IRDA (Protection of Policyholders' Interests) Regulations 2017",
    badge: "Regulatory",
    details: [
      "Mandates acknowledgement of claims within 3 days of receipt.",
      "Requires appointment of surveyor within 72 hours of loss intimation.",
      "Claims must be settled within 30 days of receipt of all required documents.",
      "Non-compliance constitutes deficiency of service cognisable under CPA 2019.",
    ],
  },
];

const positiveFactors = [
  "Independent witness or third-party documentation of fire cause",
  "Engineer or forensic certificate confirming accidental cause",
  "Full cooperation demonstrated with insurer's surveyor",
  "FIR filed promptly on or shortly after the date of fire",
  "Cause of fire is consistent across FIR, fire brigade report, and surveyor's record",
];

const negativeFactors = [
  "Contradictions between FIR narrative and fire brigade report findings",
  "Prior arson suspicion or fraud allegation on record against the insured",
  "History of unpaid or lapsed premium before the date of loss",
  "Suspicious or inflated inventory claims unsupported by records",
  "Insurer has already issued a formal repudiation letter citing specific grounds",
];

// ─── Section Divider ─────────────────────────────────────────────────────────

function SectionDivider() {
  return (
    <div className="flex items-center gap-3 my-10" aria-hidden="true">
      <div className="h-px flex-1 bg-border" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

// ─── Section Heading ─────────────────────────────────────────────────────────

function SectionHeading({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className="text-[#c9a84c]">{icon}</span>
      <h2 className="text-xl font-display font-semibold text-foreground">
        {title}
      </h2>
    </div>
  );
}

// ─── Forum Badge ─────────────────────────────────────────────────────────────

function ForumBadge({ forum }: { forum: string }) {
  const colors: Record<string, string> = {
    "Supreme Court": "bg-[#1a2744]/10 text-[#1a2744] border-[#1a2744]/20",
    NCDRC: "bg-[#c9a84c]/10 text-[#8a6a1e] border-[#c9a84c]/30",
    SCDRC: "bg-accent/10 text-accent-foreground border-accent/20",
  };
  return (
    <Badge
      variant="outline"
      className={`text-[10px] font-semibold px-2 py-0.5 shrink-0 ${colors[forum] ?? ""}`}
    >
      {forum}
    </Badge>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResourcesPage() {
  return (
    <div className="p-6 md:p-10 pb-16">
      <div className="max-w-3xl">
        {/* ── Page Header ── */}
        <div className="mb-10" data-ocid="resources.page">
          <div className="flex items-center gap-2.5 mb-2">
            <BookOpen size={24} className="text-[#c9a84c]" />
            <h1 className="text-headline-md text-foreground">
              Methodology &amp; Legal Resources
            </h1>
          </div>
          <p className="text-body-md text-muted-foreground">
            How IndiShield analyses your fire insurance claim
          </p>
        </div>

        {/* ── 1. Scoring Model ── */}
        <section data-ocid="resources.scoring_section">
          <SectionHeading
            icon={<Scale size={20} />}
            title="How Your Claim Score is Calculated"
          />
          <p className="text-body-sm text-muted-foreground mb-5">
            IndiShield uses a weighted scoring system based on 6 key legal and
            factual parameters. The base score is out of 90 points. A contextual
            free-text adjustment of up to ±10 points is applied based on your
            detailed descriptions, giving a final score out of 100.
          </p>

          {/* Scoring table */}
          <div className="rounded-lg overflow-hidden border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1a2744]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/90 uppercase tracking-wider">
                    Parameter
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-white/90 uppercase tracking-wider w-24">
                    Weight
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/90 uppercase tracking-wider hidden sm:table-cell">
                    What it measures
                  </th>
                </tr>
              </thead>
              <tbody>
                {scoringRows.map((row, i) => (
                  <tr
                    key={row.parameter}
                    className={
                      row.isTotal
                        ? "bg-[#c9a84c]/10 border-t-2 border-[#c9a84c]/50"
                        : i % 2 === 0
                          ? "bg-background border-t border-border"
                          : "bg-muted/30 border-t border-border"
                    }
                  >
                    <td
                      className={`px-4 py-3 ${row.isTotal ? "font-bold text-foreground" : "font-medium text-foreground"}`}
                    >
                      {row.parameter}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block text-xs font-bold font-mono px-2 py-0.5 rounded ${
                          row.isTotal
                            ? "bg-[#c9a84c] text-[#1a2744]"
                            : row.weight.startsWith("±")
                              ? "bg-accent/20 text-accent-foreground"
                              : "bg-[#1a2744]/10 text-[#1a2744]"
                        }`}
                      >
                        {row.weight}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs hidden sm:table-cell">
                      {row.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Score bands */}
          <div className="grid grid-cols-3 gap-3">
            {scoreBands.map((b) => (
              <div
                key={b.label}
                className="rounded-lg border px-3 py-3"
                style={{ ...b.bgStyle, ...b.borderStyle }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full" style={b.dotStyle} />
                  <span className="text-xs font-bold" style={b.textStyle}>
                    {b.label}
                  </span>
                </div>
                <div className="text-sm font-semibold" style={b.textStyle}>
                  {b.range}
                </div>
                <div
                  className="text-[11px] mt-0.5"
                  style={{ ...b.textStyle, opacity: 0.75 }}
                >
                  {b.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ── 2. Free-Text Analysis ── */}
        <section data-ocid="resources.freetext_section">
          <SectionHeading
            icon={<Info size={20} />}
            title="How Contextual Analysis Works"
          />
          <p className="text-body-sm text-muted-foreground mb-5">
            The free-text modifier (±10 points) is calculated by the IndiShield
            backend, which analyses your detailed descriptions for specific
            legal and factual signals. All seven free-text responses are read
            together to determine whether the circumstances strengthen or weaken
            your legal position.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div
              className="rounded-lg border p-4"
              style={{
                background: "oklch(0.97 0.04 142)",
                borderColor: "oklch(0.85 0.08 142)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2
                  size={15}
                  style={{ color: "oklch(0.50 0.15 142)" }}
                />
                <p
                  className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: "oklch(0.40 0.15 142)" }}
                >
                  Positive Factors (+points)
                </p>
              </div>
              <ul className="space-y-2">
                {positiveFactors.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2 text-xs"
                    style={{ color: "oklch(0.40 0.15 142)" }}
                  >
                    <span
                      className="mt-0.5 shrink-0"
                      style={{ color: "oklch(0.55 0.18 142)" }}
                    >
                      •
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-lg border p-4"
              style={{
                background: "oklch(0.97 0.04 25)",
                borderColor: "oklch(0.85 0.08 25)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <XCircle size={15} style={{ color: "oklch(0.50 0.18 25)" }} />
                <p
                  className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: "oklch(0.40 0.18 25)" }}
                >
                  Negative Factors (−points)
                </p>
              </div>
              <ul className="space-y-2">
                {negativeFactors.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2 text-xs"
                    style={{ color: "oklch(0.40 0.18 25)" }}
                  >
                    <span
                      className="mt-0.5 shrink-0"
                      style={{ color: "oklch(0.60 0.20 25)" }}
                    >
                      •
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ── 3. Case Database ── */}
        <section data-ocid="resources.cases_section">
          <SectionHeading
            icon={<Scale size={20} />}
            title="Legal Database — 10 Landmark Cases"
          />
          <p className="text-body-sm text-muted-foreground mb-5">
            IndiShield matches 2–4 of the most relevant cases from this database
            to your specific scenario. All cases are sourced from NCDRC, SCDRC
            public records, and the Supreme Court Cases reporter (SCC).
          </p>
          <Accordion
            type="multiple"
            className="space-y-2"
            data-ocid="resources.cases_accordion"
          >
            {cases.map((c, i) => (
              <AccordionItem
                key={c.id}
                value={c.id}
                className="border border-border rounded-lg px-0 overflow-hidden"
                data-ocid={`resources.case.${i + 1}`}
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30 [&[data-state=open]]:bg-[#1a2744]/5 transition-smooth">
                  <div className="flex items-start gap-3 text-left min-w-0">
                    <span className="w-5 h-5 rounded-full bg-[#1a2744] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground leading-snug pr-2">
                        {c.cite}
                      </p>
                    </div>
                    <ForumBadge forum={c.forum} />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <div className="ml-8 border-l-2 border-[#c9a84c]/40 pl-3 mt-2">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {c.relevance}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <SectionDivider />

        {/* ── 4. Governing Laws ── */}
        <section data-ocid="resources.statutes_section">
          <SectionHeading
            icon={<FileText size={20} />}
            title="Governing Laws and Regulations"
          />
          <div className="space-y-4">
            {statutes.map((s) => (
              <Card key={s.name} className="shadow-card border-border">
                <CardHeader className="pb-2 pt-4 px-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {s.icon}
                      <CardTitle className="text-sm font-bold text-foreground leading-snug">
                        {s.name}
                      </CardTitle>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-semibold shrink-0 border-[#c9a84c]/40 text-[#8a6a1e] bg-[#c9a84c]/5"
                    >
                      {s.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-4">
                  <ul className="space-y-1.5">
                    {s.details.map((d) => (
                      <li
                        key={d}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-[#c9a84c] mt-1 shrink-0">›</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ── 5. Limitation Period Alert ── */}
        <div
          className="rounded-lg border-2 border-[#c9a84c] bg-[#c9a84c]/8 px-5 py-4 mb-8"
          data-ocid="resources.limitation_alert"
        >
          <div className="flex items-start gap-3">
            <Clock size={20} className="text-[#c9a84c] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-[#1a2744] mb-1">
                ⏰ Time Limit — Do Not Miss the Deadline
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                Under the <strong>Consumer Protection Act 2019</strong>, you
                have <strong>2 years</strong> from the date of cause of action —
                usually the date of repudiation or the date of unreasonable
                delay — to file a consumer complaint. Missing this deadline will
                bar your claim and the forum will not entertain it.
              </p>
            </div>
          </div>
        </div>

        {/* ── 6. Disclaimer ── */}
        <div
          className="rounded-lg border border-border bg-muted/40 px-5 py-4"
          data-ocid="resources.disclaimer"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle
              size={16}
              className="text-muted-foreground shrink-0 mt-0.5"
            />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Disclaimer: </strong>
              This tool is designed for legal awareness and educational purposes
              only. The scoring model, case citations, and analysis provided do
              not constitute formal legal advice. Individual case outcomes
              depend on specific facts, documentation, and forum discretion.
              IndiShield strongly recommends consulting a qualified advocate
              specialising in consumer and insurance law before initiating any
              formal proceedings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
