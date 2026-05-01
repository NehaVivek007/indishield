import { c as createLucideIcon, e as useParams, j as jsxRuntimeExports, L as Link, S as Shield, B as BookOpen, C as Clock, f as Skeleton } from "./index-BwP1OCSN.js";
import { B as Badge } from "./badge-DyNPHko5.js";
import { B as Button } from "./button-BLTDHQjM.js";
import { C as Card, a as CardContent } from "./card-By8kOJr7.js";
import { a as useGetAssessment, P as PolicyStatus, R as ReportingDelay, B as BrigadeReport, D as DocumentStatus, F as FireCause, S as SurveyorStatus } from "./backend.d-CgzjTK0-.js";
import { C as CircleX, S as Scale, a as CircleCheck } from "./scale-DKnE6FYX.js";
import { P as Plus } from "./plus-Cd9xkWJR.js";
import { T as TriangleAlert } from "./triangle-alert-BsoyDKI5.js";
import { F as FileText } from "./file-text-WhKqQ5gu.js";
import { G as Gavel } from "./gavel-C3Llx7ua.js";
import { C as ChevronRight } from "./chevron-right-BoP1cFM9.js";
import "./index-BvQBMgVo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode);
function computeDenialRisks(input) {
  const risks = [];
  if (input.policyStatus === PolicyStatus.Inactive) {
    risks.push({
      risk: "Policy Inactive",
      severity: "High",
      explanation: "An inactive policy is the single strongest ground for outright repudiation.",
      legal: "Insurance Act 1938 — insurer is not obligated to honour claims under lapsed policies."
    });
  }
  if (input.reportingDelay === ReportingDelay.Over15Days) {
    risks.push({
      risk: "Excessive Reporting Delay",
      severity: "High",
      explanation: "Delay of over 15 days creates a presumption of prejudice to the insurer.",
      legal: "Standard fire policy condition — immediate notice required."
    });
  }
  if (input.reportingDelay === ReportingDelay.Days8To15) {
    risks.push({
      risk: "Significant Reporting Delay",
      severity: "Medium",
      explanation: "Delay of 8–15 days may trigger objection from insurer citing prejudice.",
      legal: "United India Insurance v. Manubhai — delay is directory not mandatory if no prejudice."
    });
  }
  if (input.brigadeReport === BrigadeReport.NotAvailable) {
    risks.push({
      risk: "No Fire Brigade Report",
      severity: "High",
      explanation: "Absence of fire brigade report removes key corroborating evidence of the fire event.",
      legal: "P. Chandramma v. New India — FIR and brigade report are primary evidence of loss."
    });
  }
  if (input.documentStatus === DocumentStatus.Incomplete) {
    risks.push({
      risk: "Incomplete Documentation",
      severity: "High",
      explanation: "Missing critical documents (FIR, bills, inventory, photos) gives insurer grounds to reject.",
      legal: "IRDA Regulations 2017 — claimant must submit complete documents within specified time."
    });
  }
  if (input.documentStatus === DocumentStatus.Partial_) {
    risks.push({
      risk: "Partial Documentation",
      severity: "Medium",
      explanation: "Partial documentation may delay or reduce claim; insurer will likely request outstanding items.",
      legal: "Pramod Kumar Arora v. United India — insurer must give reasonable opportunity to submit documents."
    });
  }
  if (input.fireCause === FireCause.Arson) {
    risks.push({
      risk: "Arson Allegation",
      severity: "High",
      explanation: "Suspected arson dramatically increases scrutiny; insurer may launch investigation.",
      legal: "National Insurance v. Nitin Khandelwal — burden of proof for arson lies entirely on insurer."
    });
  }
  if (input.surveyorStatus === SurveyorStatus.Unfavourable) {
    risks.push({
      risk: "Unfavourable Surveyor Report",
      severity: "High",
      explanation: "Insurer's surveyor has assessed against the claim; likely to be cited for repudiation.",
      legal: "New India Assurance v. Pradeep Kumar — surveyor report is not sacrosanct; forums can override."
    });
  }
  if (input.surveyorStatus === SurveyorStatus.NotAppointed) {
    risks.push({
      risk: "Surveyor Not Appointed",
      severity: "Medium",
      explanation: "Failure to appoint surveyor may indicate insurer is preparing repudiation.",
      legal: "Star Paper Mills v. Oriental — insurer's failure to appoint surveyor is deficiency of service."
    });
  }
  return risks;
}
function computeStrengths(input) {
  const strengths = [];
  if (input.policyStatus === PolicyStatus.Active) {
    strengths.push({
      strength: "Active Policy",
      explanation: "The policy was in force on the date of loss — the most fundamental requirement is met.",
      counters: "Removes the primary insurer objection of policy lapse."
    });
  }
  if (input.brigadeReport === BrigadeReport.Available) {
    strengths.push({
      strength: "Fire Brigade Report Available",
      explanation: "Official fire brigade documentation corroborates the fire event.",
      counters: "Strengthens prima facie evidence; aligns with P. Chandramma v. New India."
    });
  }
  if (input.reportingDelay === ReportingDelay.SameDay || input.reportingDelay === ReportingDelay.Within3Days) {
    strengths.push({
      strength: "Timely Insurer Intimation",
      explanation: "Prompt intimation (within 3 days) negates any prejudice argument by the insurer.",
      counters: "United India v. Manubhai — delay cannot be used to repudiate when insurer suffers no prejudice."
    });
  }
  if (input.documentStatus === DocumentStatus.Complete) {
    strengths.push({
      strength: "Complete Documentation",
      explanation: "All required documents (FIR, bills, inventory, photos) are submitted.",
      counters: "Leaves insurer with no procedural basis for rejection."
    });
  }
  if (input.surveyorStatus === SurveyorStatus.Favourable) {
    strengths.push({
      strength: "Favourable Surveyor Report",
      explanation: "Insurer's own appointed surveyor has acknowledged the loss.",
      counters: "Significantly harder for insurer to repudiate when their own surveyor confirms loss."
    });
  }
  if (input.fireCause === FireCause.Electrical || input.fireCause === FireCause.NaturalCalamity) {
    const isElectrical = input.fireCause === FireCause.Electrical;
    strengths.push({
      strength: "Covered Peril Cause",
      explanation: `${isElectrical ? "Electrical short circuit" : "Natural calamity"} is an explicitly covered peril under standard fire and special perils policies.`,
      counters: isElectrical ? "Galada Power v. United India — electrical fire is accidental, not mechanical breakdown exclusion." : "Natural calamity is a named covered peril."
    });
  }
  return strengths;
}
function computeWeaknesses(input) {
  const weaknesses = [];
  if (input.policyStatus === PolicyStatus.Unsure) {
    weaknesses.push({
      weakness: "Policy Status Uncertain",
      insurer_argument: "Insurer will request policy documents to verify coverage at date of loss.",
      remedy: "Obtain policy certificate from insurer; check premium payment receipts."
    });
  }
  if (input.brigadeReport === BrigadeReport.Pending) {
    weaknesses.push({
      weakness: "Fire Brigade Report Pending",
      insurer_argument: "Insurer may delay settlement pending this document.",
      remedy: "Follow up with fire station urgently; get a written acknowledgment of application."
    });
  }
  if (input.surveyorStatus === SurveyorStatus.Pending) {
    weaknesses.push({
      weakness: "Surveyor Assessment Pending",
      insurer_argument: "Claim cannot be finally assessed without surveyor report.",
      remedy: "Cooperate fully with surveyor; provide all access and documents promptly."
    });
  }
  return weaknesses;
}
function computeLegalCases(input) {
  const cases = [];
  if (input.surveyorStatus === SurveyorStatus.Unfavourable) {
    cases.push({
      name: "New India Assurance Co. Ltd. v. Pradeep Kumar",
      citation: "(2009) 7 SCC 787",
      application: "The insurer's surveyor report is unfavourable in your case. However, this judgment establishes that surveyor reports are not sacrosanct — consumer forums can grant compensation beyond the surveyor's assessment when it is found arbitrary or incomplete.",
      indicator: "supports"
    });
  }
  if (input.reportingDelay === ReportingDelay.Over15Days || input.reportingDelay === ReportingDelay.Days8To15) {
    cases.push({
      name: "United India Insurance Co. v. Manubhai Dharmasinhbhai Gajera",
      citation: "(2008) 10 SCC 404",
      application: "Given the reporting delay in your claim, this case is directly relevant: mere delay in intimation does not justify repudiation if the insurer suffered no actual prejudice. The notice condition is directory, not mandatory.",
      indicator: "supports"
    });
  }
  if (input.documentStatus === DocumentStatus.Incomplete || input.documentStatus === DocumentStatus.Partial_) {
    cases.push({
      name: "Pramod Kumar Arora v. United India Insurance Co.",
      citation: "(NCDRC 2015)",
      application: "Your documentation is incomplete/partial. This NCDRC ruling protects you: the insurer cannot repudiate solely on ground of document incompleteness without first giving you a reasonable opportunity to furnish missing documents.",
      indicator: "supports"
    });
  }
  if (input.fireCause === FireCause.Electrical) {
    cases.push({
      name: "Galada Power and Telecommunication Ltd. v. United India Insurance Co. Ltd.",
      citation: "(NCDRC 2011)",
      application: "Your fire was caused by electrical fault. This case directly establishes that electrical short circuit causing fire is an accidental cause covered under standard fire and special perils policy — the insurer cannot classify it as a mechanical breakdown exclusion.",
      indicator: "supports"
    });
  }
  if (input.fireCause === FireCause.Arson) {
    cases.push({
      name: "National Insurance Co. Ltd. v. Nitin Khandelwal",
      citation: "(2008) 11 SCC 259",
      application: "The reported cause includes suspected arson. This Supreme Court judgment is critical: in arson claims, the entire burden of proof to establish willful fire by the insured lies on the insurer — mere suspicion is wholly insufficient for repudiation.",
      indicator: "supports"
    });
  }
  if (input.fireCause === FireCause.Accidental) {
    cases.push({
      name: "Dhanna Lal v. New India Assurance Co.",
      citation: "(SCDRC Rajasthan 2016)",
      application: "For an accidental/unknown cause of fire, this case establishes that the insurer cannot repudiate without positive evidence that an exclusion clause applies. Any reasonable doubt must resolve in favour of the insured.",
      indicator: "supports"
    });
  }
  if (input.brigadeReport === BrigadeReport.NotAvailable || input.surveyorStatus === SurveyorStatus.NotAppointed) {
    if (input.brigadeReport === BrigadeReport.NotAvailable) {
      cases.push({
        name: "P. Chandramma v. New India Assurance Co. Ltd.",
        citation: "(NCDRC 2019)",
        application: "The absence of a fire brigade report in your claim is a risk factor. However, this case holds that FIR corroboration is sufficient prima facie evidence of loss — the insured need not produce forensic expert evidence unless the insurer raises a specific fraud allegation.",
        indicator: "cautions"
      });
    }
    if (input.surveyorStatus === SurveyorStatus.NotAppointed) {
      cases.push({
        name: "Star Paper Mills Ltd. v. The Oriental Insurance Co. Ltd.",
        citation: "(NCDRC 2018)",
        application: "The insurer has not yet appointed a surveyor. This NCDRC ruling establishes that the insurer's failure to appoint a surveyor within the stipulated time itself constitutes deficiency of service — you can use this to your advantage.",
        indicator: "supports"
      });
    }
  }
  if (cases.length === 0) {
    cases.push(
      {
        name: "Oriental Insurance Co. Ltd. v. Sony Cheriyan",
        citation: "(1999) 6 SCC 451",
        application: "This Supreme Court judgment establishes that repudiation on technical or procedural grounds without genuine investigation constitutes deficiency of service under the Consumer Protection Act — directly applicable if the insurer rejects on technicalities.",
        indicator: "supports"
      },
      {
        name: "P. Chandramma v. New India Assurance Co. Ltd.",
        citation: "(NCDRC 2019)",
        application: "FIR and fire brigade report corroboration is sufficient prima facie evidence of loss. The insured need not produce forensic expert evidence unless the insurer raises a specific fraud allegation.",
        indicator: "supports"
      }
    );
  } else if (cases.length === 1) {
    cases.push({
      name: "Oriental Insurance Co. Ltd. v. Sony Cheriyan",
      citation: "(1999) 6 SCC 451",
      application: "Repudiation on technical or procedural grounds without genuine investigation constitutes deficiency of service under the Consumer Protection Act — applicable as a baseline protection against arbitrary rejection.",
      indicator: "supports"
    });
  }
  return cases.slice(0, 4);
}
function SeverityBadge({ severity }) {
  const classes = severity === "High" ? "bg-destructive/15 text-destructive border border-destructive/30" : severity === "Medium" ? "bg-[oklch(0.78_0.12_60/0.15)] text-[oklch(0.45_0.14_50)] border border-[oklch(0.78_0.12_60/0.30)]" : "bg-[oklch(0.55_0.1_145/0.15)] text-[oklch(0.38_0.12_145)] border border-[oklch(0.55_0.1_145/0.30)]";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${classes}`,
      children: severity
    }
  );
}
function ScoreBandBadge({ band }) {
  const isStrong = band === "STRONG";
  const isModerate = band === "MODERATE";
  const classes = isStrong ? "bg-[oklch(0.55_0.12_145/0.18)] text-[oklch(0.32_0.14_145)] border border-[oklch(0.55_0.12_145/0.35)] text-sm px-4 py-1.5" : isModerate ? "bg-[oklch(0.78_0.12_60/0.18)] text-[oklch(0.40_0.14_50)] border border-[oklch(0.78_0.12_60/0.35)] text-sm px-4 py-1.5" : "bg-destructive/15 text-destructive border border-destructive/30 text-sm px-4 py-1.5";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center rounded-full font-bold tracking-widest uppercase ${classes}`,
      children: band
    }
  );
}
function ScoreBar({ score, band }) {
  const color = band === "STRONG" ? "oklch(0.55 0.12 145)" : band === "MODERATE" ? "oklch(0.72 0.12 50)" : "oklch(0.55 0.22 25)";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-3 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "h-3 rounded-full transition-all duration-700",
      style: { width: `${score}%`, background: color }
    }
  ) });
}
function SectionHeader({
  icon,
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-headline-sm text-foreground", children: title })
  ] });
}
function LoadingSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "assessment_result.loading_state",
      className: "p-8 space-y-6 max-w-4xl",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-xl" })
      ]
    }
  );
}
function AssessmentResultPage() {
  const { assessmentId } = useParams({ from: "/assessment/$assessmentId" });
  const { data: assessment, isLoading, error } = useGetAssessment(assessmentId);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, {});
  if (error || !assessment) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "assessment_result.error_state",
        className: "p-8 md:p-12 max-w-2xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/history",
                className: "text-muted-foreground hover:text-foreground transition-smooth",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-headline-sm text-foreground", children: "Assessment Not Found" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card border-destructive/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "text-destructive shrink-0 mt-0.5", size: 22 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium mb-1", children: "Unable to load assessment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This assessment could not be found or you may not have permission to view it." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/history", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "mt-4",
                  "data-ocid": "assessment_result.back_button",
                  children: "← Back to History"
                }
              ) })
            ] })
          ] }) })
        ]
      }
    );
  }
  const { input, result } = assessment;
  const totalScore = Number(result.totalScore);
  const baseScore = Number(result.baseScore);
  const freeTextModifier = Number(result.freeTextModifier);
  const band = result.band;
  const isInactive = input.policyStatus === PolicyStatus.Inactive;
  const denialRisks = computeDenialRisks(input);
  const strengths = computeStrengths(input);
  const weaknesses = computeWeaknesses(input);
  const legalCases = computeLegalCases(input);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-10 max-w-4xl", "data-ocid": "assessment_result.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/history",
          className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth",
          "data-ocid": "assessment_result.back_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }),
            "Back to History"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "gap-1.5",
            "data-ocid": "assessment_result.print_button",
            onClick: () => window.print(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 14 }),
              "Print"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/assessment", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "gap-1.5",
            "data-ocid": "assessment_result.new_assessment_top_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
              "New Assessment"
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "assessment_result.score_section", children: [
        isInactive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TriangleAlert,
            {
              className: "text-destructive shrink-0 mt-0.5",
              size: 20
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-semibold text-sm", children: "⚠️ INACTIVE POLICY — Potentially Fatal Bar to Claim" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive/80 text-sm mt-1", children: "This is a potentially fatal bar to your claim. This analysis is provided for awareness, but the absence of a valid policy is a critical deficiency." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-elevated overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary px-6 py-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { size: 18, className: "text-primary-foreground/80" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground font-display font-semibold tracking-wide text-sm uppercase", children: "Claim Strength Score" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-7xl font-display font-bold text-foreground leading-none", children: totalScore }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-3xl font-display text-muted-foreground", children: [
                " ",
                "/ 100"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreBandBadge, { band }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-xs mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreBar, { score: totalScore, band }) }),
            freeTextModifier !== 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: `text-xs font-mono mt-2 ${freeTextModifier > 0 ? "text-[oklch(0.38_0.14_145)]" : "text-destructive"}`,
                children: [
                  freeTextModifier > 0 ? `+${freeTextModifier}` : freeTextModifier,
                  " ",
                  "pts contextual ",
                  freeTextModifier > 0 ? "bonus" : "deduction"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "assessment_result.breakdown_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 16 }),
            title: "Parameter Breakdown"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-primary text-primary-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold", children: "Parameter" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold", children: "Your Answer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold", children: "Points" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold", children: "Max" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            result.breakdown.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `assessment_result.breakdown.item.${i + 1}`,
                className: i % 2 === 0 ? "bg-background" : "bg-primary/5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: row.parameter }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: row.userAnswer }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono font-semibold text-foreground", children: String(row.pointsScored) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono text-muted-foreground", children: String(row.maxPoints) })
                ]
              },
              row.parameter
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-primary/5 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-foreground", children: "Total Base Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono font-bold text-foreground", children: baseScore }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono text-muted-foreground", children: "90" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-background border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-foreground", children: "Contextual Adjustment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  className: `px-4 py-3 text-right font-mono font-bold ${freeTextModifier >= 0 ? "text-[oklch(0.38_0.14_145)]" : "text-destructive"}`,
                  children: freeTextModifier >= 0 ? `+${freeTextModifier}` : freeTextModifier
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono text-muted-foreground", children: "±10" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-primary text-primary-foreground border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-bold", children: "Final Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono font-bold text-[oklch(0.78_0.12_49)]", children: totalScore }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono opacity-70", children: "100" })
            ] })
          ] })
        ] }) }) })
      ] }),
      denialRisks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "assessment_result.risks_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 16 }),
            title: "Denial Ground Risks"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: denialRisks.map((risk, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            "data-ocid": `assessment_result.risk.item.${i + 1}`,
            className: "shadow-card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleX,
                    {
                      size: 16,
                      className: "text-destructive shrink-0 mt-0.5"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: risk.risk })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SeverityBadge, { severity: risk.severity })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2 ml-6", children: risk.explanation }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary/70 font-mono ml-6 italic", children: risk.legal })
            ] })
          },
          risk.risk
        )) })
      ] }),
      strengths.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "assessment_result.strengths_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 16 }),
            title: "Claim Strengths"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: strengths.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            "data-ocid": `assessment_result.strength.item.${i + 1}`,
            className: "shadow-card border-l-4 border-l-[oklch(0.55_0.12_145)]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleCheck,
                  {
                    size: 16,
                    className: "text-[oklch(0.38_0.14_145)] shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: s.strength })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2 ml-6", children: s.explanation }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[oklch(0.38_0.14_145)] ml-6 font-medium", children: [
                "↳ ",
                s.counters
              ] })
            ] })
          },
          s.strength
        )) })
      ] }),
      weaknesses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "assessment_result.weaknesses_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 16 }),
            title: "Claim Weaknesses"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: weaknesses.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            "data-ocid": `assessment_result.weakness.item.${i + 1}`,
            className: "shadow-card border-l-4 border-l-[oklch(0.72_0.12_50)]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TriangleAlert,
                  {
                    size: 16,
                    className: "text-[oklch(0.45_0.14_50)] shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: w.weakness })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-1 ml-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground/80", children: [
                  "Insurer may argue:",
                  " "
                ] }),
                w.insurer_argument
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[oklch(0.45_0.14_50)] ml-6 font-medium", children: [
                "✦ Remedy: ",
                w.remedy
              ] })
            ] })
          },
          w.weakness
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "assessment_result.legal_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { size: 16 }), title: "Legal Foundation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: legalCases.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            "data-ocid": `assessment_result.legal.item.${i + 1}`,
            className: "shadow-card border-l-4 border-l-[oklch(0.68_0.12_48)]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-primary text-sm leading-snug", children: c.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground mt-0.5", children: c.citation })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: c.indicator === "supports" ? "secondary" : "outline",
                    className: "shrink-0 text-xs",
                    children: c.indicator === "supports" ? "✓ Supports" : "⚠ Cautions"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: c.application })
            ] })
          },
          `${c.citation}-${i}`
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "assessment_result.steps_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 }),
            title: "Strategic Next Steps"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
          {
            num: 1,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 16 }),
            title: "Gather & Organise Documents",
            body: "Gather and organise all primary documents: FIR copy, fire brigade report (if pending — follow up urgently), surveyor report copy, complete inventory list with valuations, photographs of damaged property, and all premium payment receipts.",
            highlight: false
          },
          {
            num: 2,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 16 }),
            title: "Formal Written Claim Submission",
            body: "Send a formal written claim submission (or follow-up) to the insurer by registered post. Quote your policy number, date of loss, and list all attached documents.",
            highlight: false
          },
          {
            num: 3,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { size: 16 }),
            title: "Forum Approach",
            body: "If the insurer repudiates or delays beyond 30 days without valid reason: File a consumer complaint at the District Consumer Disputes Redressal Commission (under Consumer Protection Act 2019). For claims above ₹1 crore, approach State Consumer Disputes Redressal Commission (SCDRC). Apex cases go to NCDRC.",
            highlight: false
          },
          {
            num: 4,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16 }),
            title: "⏰ Limitation Period — Critical",
            body: "The limitation period under the Consumer Protection Act 2019 is 2 years from the date of cause of action (typically the date of repudiation or unreasonable delay). Do not delay filing.",
            highlight: true
          },
          {
            num: 5,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { size: 16 }),
            title: "Pre-litigation Legal Notice",
            body: "Consider sending a pre-litigation legal notice under Section 2(42) of the Consumer Protection Act 2019 to the insurer before filing. This demonstrates good faith and is sometimes sufficient to prompt settlement.",
            highlight: false
          }
        ].map((step) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            "data-ocid": `assessment_result.step.item.${step.num}`,
            className: `shadow-card ${step.highlight ? "border-[oklch(0.78_0.12_60/0.60)] bg-[oklch(0.78_0.12_60/0.06)]" : ""}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-sm font-bold font-display ${step.highlight ? "bg-[oklch(0.68_0.12_48)] text-white" : "bg-primary text-primary-foreground"}`,
                  children: step.num
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: step.highlight ? "text-[oklch(0.45_0.14_50)]" : "text-primary/70",
                      children: step.icon
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `font-semibold text-sm ${step.highlight ? "text-[oklch(0.40_0.14_50)]" : "text-foreground"}`,
                      children: step.title
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-sm leading-relaxed ${step.highlight ? "text-[oklch(0.40_0.14_50)]/80" : "text-muted-foreground"}`,
                    children: step.body
                  }
                )
              ] })
            ] })
          },
          step.num
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "assessment_result.disclaimer_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed italic", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold not-italic text-foreground/70", children: [
          "Disclaimer:",
          " "
        ] }),
        "This analysis is for legal awareness only and does not constitute formal legal advice. The scoring and case citations are based on publicly reported judgments and established parameters — individual case outcomes depend on specific facts. Consult a qualified advocate specialising in consumer dispute law before initiating formal proceedings."
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 pt-4 pb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/history", "data-ocid": "assessment_result.history_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }),
          "Back to History"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/assessment",
            "data-ocid": "assessment_result.new_assessment_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }),
              "Start New Assessment"
            ] })
          }
        )
      ] })
    ] })
  ] });
}
export {
  AssessmentResultPage as default
};
