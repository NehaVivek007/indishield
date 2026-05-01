import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAssessment } from "@/hooks/useBackend";
import {
  BrigadeReport,
  DocumentStatus,
  FireCause,
  PolicyStatus,
  ReportingDelay,
  SurveyorStatus,
} from "@/types";
import type { AssessmentInput, ScoreResult } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Gavel,
  Plus,
  Printer,
  Scale,
  Shield,
  XCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DenialRisk {
  risk: string;
  severity: "High" | "Medium" | "Low";
  explanation: string;
  legal: string;
}

interface ClaimStrength {
  strength: string;
  explanation: string;
  counters: string;
}

interface ClaimWeakness {
  weakness: string;
  insurer_argument: string;
  remedy: string;
}

interface LegalCase {
  name: string;
  citation: string;
  application: string;
  indicator: "supports" | "cautions";
}

// ─── Logic helpers ────────────────────────────────────────────────────────────

function computeDenialRisks(input: AssessmentInput): DenialRisk[] {
  const risks: DenialRisk[] = [];
  if (input.policyStatus === PolicyStatus.Inactive) {
    risks.push({
      risk: "Policy Inactive",
      severity: "High",
      explanation:
        "An inactive policy is the single strongest ground for outright repudiation.",
      legal:
        "Insurance Act 1938 — insurer is not obligated to honour claims under lapsed policies.",
    });
  }
  if (input.reportingDelay === ReportingDelay.Over15Days) {
    risks.push({
      risk: "Excessive Reporting Delay",
      severity: "High",
      explanation:
        "Delay of over 15 days creates a presumption of prejudice to the insurer.",
      legal: "Standard fire policy condition — immediate notice required.",
    });
  }
  if (input.reportingDelay === ReportingDelay.Days8To15) {
    risks.push({
      risk: "Significant Reporting Delay",
      severity: "Medium",
      explanation:
        "Delay of 8–15 days may trigger objection from insurer citing prejudice.",
      legal:
        "United India Insurance v. Manubhai — delay is directory not mandatory if no prejudice.",
    });
  }
  if (input.brigadeReport === BrigadeReport.NotAvailable) {
    risks.push({
      risk: "No Fire Brigade Report",
      severity: "High",
      explanation:
        "Absence of fire brigade report removes key corroborating evidence of the fire event.",
      legal:
        "P. Chandramma v. New India — FIR and brigade report are primary evidence of loss.",
    });
  }
  if (input.documentStatus === DocumentStatus.Incomplete) {
    risks.push({
      risk: "Incomplete Documentation",
      severity: "High",
      explanation:
        "Missing critical documents (FIR, bills, inventory, photos) gives insurer grounds to reject.",
      legal:
        "IRDA Regulations 2017 — claimant must submit complete documents within specified time.",
    });
  }
  if (input.documentStatus === DocumentStatus.Partial_) {
    risks.push({
      risk: "Partial Documentation",
      severity: "Medium",
      explanation:
        "Partial documentation may delay or reduce claim; insurer will likely request outstanding items.",
      legal:
        "Pramod Kumar Arora v. United India — insurer must give reasonable opportunity to submit documents.",
    });
  }
  if (input.fireCause === FireCause.Arson) {
    risks.push({
      risk: "Arson Allegation",
      severity: "High",
      explanation:
        "Suspected arson dramatically increases scrutiny; insurer may launch investigation.",
      legal:
        "National Insurance v. Nitin Khandelwal — burden of proof for arson lies entirely on insurer.",
    });
  }
  if (input.surveyorStatus === SurveyorStatus.Unfavourable) {
    risks.push({
      risk: "Unfavourable Surveyor Report",
      severity: "High",
      explanation:
        "Insurer's surveyor has assessed against the claim; likely to be cited for repudiation.",
      legal:
        "New India Assurance v. Pradeep Kumar — surveyor report is not sacrosanct; forums can override.",
    });
  }
  if (input.surveyorStatus === SurveyorStatus.NotAppointed) {
    risks.push({
      risk: "Surveyor Not Appointed",
      severity: "Medium",
      explanation:
        "Failure to appoint surveyor may indicate insurer is preparing repudiation.",
      legal:
        "Star Paper Mills v. Oriental — insurer's failure to appoint surveyor is deficiency of service.",
    });
  }
  return risks;
}

function computeStrengths(input: AssessmentInput): ClaimStrength[] {
  const strengths: ClaimStrength[] = [];
  if (input.policyStatus === PolicyStatus.Active) {
    strengths.push({
      strength: "Active Policy",
      explanation:
        "The policy was in force on the date of loss — the most fundamental requirement is met.",
      counters: "Removes the primary insurer objection of policy lapse.",
    });
  }
  if (input.brigadeReport === BrigadeReport.Available) {
    strengths.push({
      strength: "Fire Brigade Report Available",
      explanation:
        "Official fire brigade documentation corroborates the fire event.",
      counters:
        "Strengthens prima facie evidence; aligns with P. Chandramma v. New India.",
    });
  }
  if (
    input.reportingDelay === ReportingDelay.SameDay ||
    input.reportingDelay === ReportingDelay.Within3Days
  ) {
    strengths.push({
      strength: "Timely Insurer Intimation",
      explanation:
        "Prompt intimation (within 3 days) negates any prejudice argument by the insurer.",
      counters:
        "United India v. Manubhai — delay cannot be used to repudiate when insurer suffers no prejudice.",
    });
  }
  if (input.documentStatus === DocumentStatus.Complete) {
    strengths.push({
      strength: "Complete Documentation",
      explanation:
        "All required documents (FIR, bills, inventory, photos) are submitted.",
      counters: "Leaves insurer with no procedural basis for rejection.",
    });
  }
  if (input.surveyorStatus === SurveyorStatus.Favourable) {
    strengths.push({
      strength: "Favourable Surveyor Report",
      explanation:
        "Insurer's own appointed surveyor has acknowledged the loss.",
      counters:
        "Significantly harder for insurer to repudiate when their own surveyor confirms loss.",
    });
  }
  if (
    input.fireCause === FireCause.Electrical ||
    input.fireCause === FireCause.NaturalCalamity
  ) {
    const isElectrical = input.fireCause === FireCause.Electrical;
    strengths.push({
      strength: "Covered Peril Cause",
      explanation: `${isElectrical ? "Electrical short circuit" : "Natural calamity"} is an explicitly covered peril under standard fire and special perils policies.`,
      counters: isElectrical
        ? "Galada Power v. United India — electrical fire is accidental, not mechanical breakdown exclusion."
        : "Natural calamity is a named covered peril.",
    });
  }
  return strengths;
}

function computeWeaknesses(input: AssessmentInput): ClaimWeakness[] {
  const weaknesses: ClaimWeakness[] = [];
  if (input.policyStatus === PolicyStatus.Unsure) {
    weaknesses.push({
      weakness: "Policy Status Uncertain",
      insurer_argument:
        "Insurer will request policy documents to verify coverage at date of loss.",
      remedy:
        "Obtain policy certificate from insurer; check premium payment receipts.",
    });
  }
  if (input.brigadeReport === BrigadeReport.Pending) {
    weaknesses.push({
      weakness: "Fire Brigade Report Pending",
      insurer_argument: "Insurer may delay settlement pending this document.",
      remedy:
        "Follow up with fire station urgently; get a written acknowledgment of application.",
    });
  }
  if (input.surveyorStatus === SurveyorStatus.Pending) {
    weaknesses.push({
      weakness: "Surveyor Assessment Pending",
      insurer_argument:
        "Claim cannot be finally assessed without surveyor report.",
      remedy:
        "Cooperate fully with surveyor; provide all access and documents promptly.",
    });
  }
  return weaknesses;
}

function computeLegalCases(input: AssessmentInput): LegalCase[] {
  const cases: LegalCase[] = [];

  if (input.surveyorStatus === SurveyorStatus.Unfavourable) {
    cases.push({
      name: "New India Assurance Co. Ltd. v. Pradeep Kumar",
      citation: "(2009) 7 SCC 787",
      application:
        "The insurer's surveyor report is unfavourable in your case. However, this judgment establishes that surveyor reports are not sacrosanct — consumer forums can grant compensation beyond the surveyor's assessment when it is found arbitrary or incomplete.",
      indicator: "supports",
    });
  }
  if (
    input.reportingDelay === ReportingDelay.Over15Days ||
    input.reportingDelay === ReportingDelay.Days8To15
  ) {
    cases.push({
      name: "United India Insurance Co. v. Manubhai Dharmasinhbhai Gajera",
      citation: "(2008) 10 SCC 404",
      application:
        "Given the reporting delay in your claim, this case is directly relevant: mere delay in intimation does not justify repudiation if the insurer suffered no actual prejudice. The notice condition is directory, not mandatory.",
      indicator: "supports",
    });
  }
  if (
    input.documentStatus === DocumentStatus.Incomplete ||
    input.documentStatus === DocumentStatus.Partial_
  ) {
    cases.push({
      name: "Pramod Kumar Arora v. United India Insurance Co.",
      citation: "(NCDRC 2015)",
      application:
        "Your documentation is incomplete/partial. This NCDRC ruling protects you: the insurer cannot repudiate solely on ground of document incompleteness without first giving you a reasonable opportunity to furnish missing documents.",
      indicator: "supports",
    });
  }
  if (input.fireCause === FireCause.Electrical) {
    cases.push({
      name: "Galada Power and Telecommunication Ltd. v. United India Insurance Co. Ltd.",
      citation: "(NCDRC 2011)",
      application:
        "Your fire was caused by electrical fault. This case directly establishes that electrical short circuit causing fire is an accidental cause covered under standard fire and special perils policy — the insurer cannot classify it as a mechanical breakdown exclusion.",
      indicator: "supports",
    });
  }
  if (input.fireCause === FireCause.Arson) {
    cases.push({
      name: "National Insurance Co. Ltd. v. Nitin Khandelwal",
      citation: "(2008) 11 SCC 259",
      application:
        "The reported cause includes suspected arson. This Supreme Court judgment is critical: in arson claims, the entire burden of proof to establish willful fire by the insured lies on the insurer — mere suspicion is wholly insufficient for repudiation.",
      indicator: "supports",
    });
  }
  if (input.fireCause === FireCause.Accidental) {
    cases.push({
      name: "Dhanna Lal v. New India Assurance Co.",
      citation: "(SCDRC Rajasthan 2016)",
      application:
        "For an accidental/unknown cause of fire, this case establishes that the insurer cannot repudiate without positive evidence that an exclusion clause applies. Any reasonable doubt must resolve in favour of the insured.",
      indicator: "supports",
    });
  }
  if (
    input.brigadeReport === BrigadeReport.NotAvailable ||
    input.surveyorStatus === SurveyorStatus.NotAppointed
  ) {
    if (input.brigadeReport === BrigadeReport.NotAvailable) {
      cases.push({
        name: "P. Chandramma v. New India Assurance Co. Ltd.",
        citation: "(NCDRC 2019)",
        application:
          "The absence of a fire brigade report in your claim is a risk factor. However, this case holds that FIR corroboration is sufficient prima facie evidence of loss — the insured need not produce forensic expert evidence unless the insurer raises a specific fraud allegation.",
        indicator: "cautions",
      });
    }
    if (input.surveyorStatus === SurveyorStatus.NotAppointed) {
      cases.push({
        name: "Star Paper Mills Ltd. v. The Oriental Insurance Co. Ltd.",
        citation: "(NCDRC 2018)",
        application:
          "The insurer has not yet appointed a surveyor. This NCDRC ruling establishes that the insurer's failure to appoint a surveyor within the stipulated time itself constitutes deficiency of service — you can use this to your advantage.",
        indicator: "supports",
      });
    }
  }

  // Ensure at least 2 cases — fallback defaults
  if (cases.length === 0) {
    cases.push(
      {
        name: "Oriental Insurance Co. Ltd. v. Sony Cheriyan",
        citation: "(1999) 6 SCC 451",
        application:
          "This Supreme Court judgment establishes that repudiation on technical or procedural grounds without genuine investigation constitutes deficiency of service under the Consumer Protection Act — directly applicable if the insurer rejects on technicalities.",
        indicator: "supports",
      },
      {
        name: "P. Chandramma v. New India Assurance Co. Ltd.",
        citation: "(NCDRC 2019)",
        application:
          "FIR and fire brigade report corroboration is sufficient prima facie evidence of loss. The insured need not produce forensic expert evidence unless the insurer raises a specific fraud allegation.",
        indicator: "supports",
      },
    );
  } else if (cases.length === 1) {
    cases.push({
      name: "Oriental Insurance Co. Ltd. v. Sony Cheriyan",
      citation: "(1999) 6 SCC 451",
      application:
        "Repudiation on technical or procedural grounds without genuine investigation constitutes deficiency of service under the Consumer Protection Act — applicable as a baseline protection against arbitrary rejection.",
      indicator: "supports",
    });
  }

  return cases.slice(0, 4);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SeverityBadge({ severity }: { severity: "High" | "Medium" | "Low" }) {
  const classes =
    severity === "High"
      ? "bg-destructive/15 text-destructive border border-destructive/30"
      : severity === "Medium"
        ? "bg-[oklch(0.78_0.12_60/0.15)] text-[oklch(0.45_0.14_50)] border border-[oklch(0.78_0.12_60/0.30)]"
        : "bg-[oklch(0.55_0.1_145/0.15)] text-[oklch(0.38_0.12_145)] border border-[oklch(0.55_0.1_145/0.30)]";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${classes}`}
    >
      {severity}
    </span>
  );
}

function ScoreBandBadge({ band }: { band: string }) {
  const isStrong = band === "STRONG";
  const isModerate = band === "MODERATE";
  const classes = isStrong
    ? "bg-[oklch(0.55_0.12_145/0.18)] text-[oklch(0.32_0.14_145)] border border-[oklch(0.55_0.12_145/0.35)] text-sm px-4 py-1.5"
    : isModerate
      ? "bg-[oklch(0.78_0.12_60/0.18)] text-[oklch(0.40_0.14_50)] border border-[oklch(0.78_0.12_60/0.35)] text-sm px-4 py-1.5"
      : "bg-destructive/15 text-destructive border border-destructive/30 text-sm px-4 py-1.5";
  return (
    <span
      className={`inline-flex items-center rounded-full font-bold tracking-widest uppercase ${classes}`}
    >
      {band}
    </span>
  );
}

function ScoreBar({ score, band }: { score: number; band: string }) {
  const color =
    band === "STRONG"
      ? "oklch(0.55 0.12 145)"
      : band === "MODERATE"
        ? "oklch(0.72 0.12 50)"
        : "oklch(0.55 0.22 25)";
  return (
    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
      <div
        className="h-3 rounded-full transition-all duration-700"
        style={{ width: `${score}%`, background: color }}
      />
    </div>
  );
}

function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h2 className="text-headline-sm text-foreground">{title}</h2>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div
      data-ocid="assessment_result.loading_state"
      className="p-8 space-y-6 max-w-4xl"
    >
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-64 w-full rounded-xl" />
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AssessmentResultPage() {
  const { assessmentId } = useParams({ from: "/assessment/$assessmentId" });
  const { data: assessment, isLoading, error } = useGetAssessment(assessmentId);

  if (isLoading) return <LoadingSkeleton />;

  if (error || !assessment) {
    return (
      <div
        data-ocid="assessment_result.error_state"
        className="p-8 md:p-12 max-w-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/history"
            className="text-muted-foreground hover:text-foreground transition-smooth"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-headline-sm text-foreground">
            Assessment Not Found
          </h1>
        </div>
        <Card className="shadow-card border-destructive/30">
          <CardContent className="p-6 flex items-start gap-4">
            <XCircle className="text-destructive shrink-0 mt-0.5" size={22} />
            <div>
              <p className="text-foreground font-medium mb-1">
                Unable to load assessment
              </p>
              <p className="text-muted-foreground text-sm">
                This assessment could not be found or you may not have
                permission to view it.
              </p>
              <Link to="/history">
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  data-ocid="assessment_result.back_button"
                >
                  ← Back to History
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { input, result }: { input: AssessmentInput; result: ScoreResult } =
    assessment;
  const totalScore = Number(result.totalScore);
  const baseScore = Number(result.baseScore);
  const freeTextModifier = Number(result.freeTextModifier);
  const band = result.band as "STRONG" | "MODERATE" | "WEAK";
  const isInactive = input.policyStatus === PolicyStatus.Inactive;

  const denialRisks = computeDenialRisks(input);
  const strengths = computeStrengths(input);
  const weaknesses = computeWeaknesses(input);
  const legalCases = computeLegalCases(input);

  return (
    <div className="p-6 md:p-10 max-w-4xl" data-ocid="assessment_result.page">
      {/* Top nav */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/history"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth"
          data-ocid="assessment_result.back_link"
        >
          <ArrowLeft size={15} />
          Back to History
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            data-ocid="assessment_result.print_button"
            onClick={() => window.print()}
          >
            <Printer size={14} />
            Print
          </Button>
          <Link to="/assessment">
            <Button
              size="sm"
              className="gap-1.5"
              data-ocid="assessment_result.new_assessment_top_button"
            >
              <Plus size={14} />
              New Assessment
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        {/* ── SECTION 1: CLAIM STRENGTH SCORE ── */}
        <section data-ocid="assessment_result.score_section">
          {isInactive && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 mb-5">
              <AlertTriangle
                className="text-destructive shrink-0 mt-0.5"
                size={20}
              />
              <div>
                <p className="text-destructive font-semibold text-sm">
                  ⚠️ INACTIVE POLICY — Potentially Fatal Bar to Claim
                </p>
                <p className="text-destructive/80 text-sm mt-1">
                  This is a potentially fatal bar to your claim. This analysis
                  is provided for awareness, but the absence of a valid policy
                  is a critical deficiency.
                </p>
              </div>
            </div>
          )}

          <Card className="shadow-elevated overflow-hidden">
            <div className="bg-primary px-6 py-4 flex items-center gap-2">
              <Scale size={18} className="text-primary-foreground/80" />
              <span className="text-primary-foreground font-display font-semibold tracking-wide text-sm uppercase">
                Claim Strength Score
              </span>
            </div>
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <span className="text-7xl font-display font-bold text-foreground leading-none">
                  {totalScore}
                </span>
                <span className="text-3xl font-display text-muted-foreground">
                  {" "}
                  / 100
                </span>
              </div>
              <div className="flex justify-center mb-5">
                <ScoreBandBadge band={band} />
              </div>
              <div className="max-w-xs mx-auto mb-3">
                <ScoreBar score={totalScore} band={band} />
              </div>
              {freeTextModifier !== 0 && (
                <p
                  className={`text-xs font-mono mt-2 ${freeTextModifier > 0 ? "text-[oklch(0.38_0.14_145)]" : "text-destructive"}`}
                >
                  {freeTextModifier > 0
                    ? `+${freeTextModifier}`
                    : freeTextModifier}{" "}
                  pts contextual {freeTextModifier > 0 ? "bonus" : "deduction"}
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* ── SECTION 2: PARAMETER BREAKDOWN ── */}
        <section data-ocid="assessment_result.breakdown_section">
          <SectionHeader
            icon={<FileText size={16} />}
            title="Parameter Breakdown"
          />
          <Card className="shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="text-left px-4 py-3 font-semibold">
                      Parameter
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Your Answer
                    </th>
                    <th className="text-right px-4 py-3 font-semibold">
                      Points
                    </th>
                    <th className="text-right px-4 py-3 font-semibold">Max</th>
                  </tr>
                </thead>
                <tbody>
                  {result.breakdown.map((row, i) => (
                    <tr
                      key={row.parameter}
                      data-ocid={`assessment_result.breakdown.item.${i + 1}`}
                      className={i % 2 === 0 ? "bg-background" : "bg-primary/5"}
                    >
                      <td className="px-4 py-3 font-medium text-foreground">
                        {row.parameter}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.userAnswer}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-semibold text-foreground">
                        {String(row.pointsScored)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                        {String(row.maxPoints)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-primary/5 border-t border-border">
                    <td className="px-4 py-3 font-semibold text-foreground">
                      Total Base Score
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">—</td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-foreground">
                      {baseScore}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                      90
                    </td>
                  </tr>
                  <tr className="bg-background border-t border-border">
                    <td className="px-4 py-3 font-semibold text-foreground">
                      Contextual Adjustment
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">—</td>
                    <td
                      className={`px-4 py-3 text-right font-mono font-bold ${freeTextModifier >= 0 ? "text-[oklch(0.38_0.14_145)]" : "text-destructive"}`}
                    >
                      {freeTextModifier >= 0
                        ? `+${freeTextModifier}`
                        : freeTextModifier}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                      ±10
                    </td>
                  </tr>
                  <tr className="bg-primary text-primary-foreground border-t border-border">
                    <td className="px-4 py-3 font-bold">Final Score</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-[oklch(0.78_0.12_49)]">
                      {totalScore}
                    </td>
                    <td className="px-4 py-3 text-right font-mono opacity-70">
                      100
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* ── SECTION 3: DENIAL GROUND RISKS ── */}
        {denialRisks.length > 0 && (
          <section data-ocid="assessment_result.risks_section">
            <SectionHeader
              icon={<AlertTriangle size={16} />}
              title="Denial Ground Risks"
            />
            <div className="space-y-3">
              {denialRisks.map((risk, i) => (
                <Card
                  key={risk.risk}
                  data-ocid={`assessment_result.risk.item.${i + 1}`}
                  className="shadow-card"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <XCircle
                          size={16}
                          className="text-destructive shrink-0 mt-0.5"
                        />
                        <span className="font-semibold text-foreground">
                          {risk.risk}
                        </span>
                      </div>
                      <SeverityBadge severity={risk.severity} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 ml-6">
                      {risk.explanation}
                    </p>
                    <p className="text-xs text-primary/70 font-mono ml-6 italic">
                      {risk.legal}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* ── SECTION 4: CLAIM STRENGTHS ── */}
        {strengths.length > 0 && (
          <section data-ocid="assessment_result.strengths_section">
            <SectionHeader
              icon={<Shield size={16} />}
              title="Claim Strengths"
            />
            <div className="space-y-3">
              {strengths.map((s, i) => (
                <Card
                  key={s.strength}
                  data-ocid={`assessment_result.strength.item.${i + 1}`}
                  className="shadow-card border-l-4 border-l-[oklch(0.55_0.12_145)]"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2
                        size={16}
                        className="text-[oklch(0.38_0.14_145)] shrink-0"
                      />
                      <span className="font-semibold text-foreground">
                        {s.strength}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 ml-6">
                      {s.explanation}
                    </p>
                    <p className="text-xs text-[oklch(0.38_0.14_145)] ml-6 font-medium">
                      ↳ {s.counters}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* ── SECTION 5: CLAIM WEAKNESSES ── */}
        {weaknesses.length > 0 && (
          <section data-ocid="assessment_result.weaknesses_section">
            <SectionHeader
              icon={<AlertTriangle size={16} />}
              title="Claim Weaknesses"
            />
            <div className="space-y-3">
              {weaknesses.map((w, i) => (
                <Card
                  key={w.weakness}
                  data-ocid={`assessment_result.weakness.item.${i + 1}`}
                  className="shadow-card border-l-4 border-l-[oklch(0.72_0.12_50)]"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle
                        size={16}
                        className="text-[oklch(0.45_0.14_50)] shrink-0"
                      />
                      <span className="font-semibold text-foreground">
                        {w.weakness}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1 ml-6">
                      <span className="font-medium text-foreground/80">
                        Insurer may argue:{" "}
                      </span>
                      {w.insurer_argument}
                    </p>
                    <p className="text-sm text-[oklch(0.45_0.14_50)] ml-6 font-medium">
                      ✦ Remedy: {w.remedy}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* ── SECTION 6: LEGAL FOUNDATION ── */}
        <section data-ocid="assessment_result.legal_section">
          <SectionHeader icon={<Gavel size={16} />} title="Legal Foundation" />
          <div className="space-y-4">
            {legalCases.map((c, i) => (
              <Card
                key={`${c.citation}-${i}`}
                data-ocid={`assessment_result.legal.item.${i + 1}`}
                className="shadow-card border-l-4 border-l-[oklch(0.68_0.12_48)]"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="font-display font-semibold text-primary text-sm leading-snug">
                        {c.name}
                      </p>
                      <p className="text-xs font-mono text-muted-foreground mt-0.5">
                        {c.citation}
                      </p>
                    </div>
                    <Badge
                      variant={
                        c.indicator === "supports" ? "secondary" : "outline"
                      }
                      className="shrink-0 text-xs"
                    >
                      {c.indicator === "supports" ? "✓ Supports" : "⚠ Cautions"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.application}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── SECTION 7: STRATEGIC NEXT STEPS ── */}
        <section data-ocid="assessment_result.steps_section">
          <SectionHeader
            icon={<ChevronRight size={16} />}
            title="Strategic Next Steps"
          />
          <div className="space-y-3">
            {[
              {
                num: 1,
                icon: <FileText size={16} />,
                title: "Gather & Organise Documents",
                body: "Gather and organise all primary documents: FIR copy, fire brigade report (if pending — follow up urgently), surveyor report copy, complete inventory list with valuations, photographs of damaged property, and all premium payment receipts.",
                highlight: false,
              },
              {
                num: 2,
                icon: <BookOpen size={16} />,
                title: "Formal Written Claim Submission",
                body: "Send a formal written claim submission (or follow-up) to the insurer by registered post. Quote your policy number, date of loss, and list all attached documents.",
                highlight: false,
              },
              {
                num: 3,
                icon: <Scale size={16} />,
                title: "Forum Approach",
                body: "If the insurer repudiates or delays beyond 30 days without valid reason: File a consumer complaint at the District Consumer Disputes Redressal Commission (under Consumer Protection Act 2019). For claims above ₹1 crore, approach State Consumer Disputes Redressal Commission (SCDRC). Apex cases go to NCDRC.",
                highlight: false,
              },
              {
                num: 4,
                icon: <Clock size={16} />,
                title: "⏰ Limitation Period — Critical",
                body: "The limitation period under the Consumer Protection Act 2019 is 2 years from the date of cause of action (typically the date of repudiation or unreasonable delay). Do not delay filing.",
                highlight: true,
              },
              {
                num: 5,
                icon: <Gavel size={16} />,
                title: "Pre-litigation Legal Notice",
                body: "Consider sending a pre-litigation legal notice under Section 2(42) of the Consumer Protection Act 2019 to the insurer before filing. This demonstrates good faith and is sometimes sufficient to prompt settlement.",
                highlight: false,
              },
            ].map((step) => (
              <Card
                key={step.num}
                data-ocid={`assessment_result.step.item.${step.num}`}
                className={`shadow-card ${step.highlight ? "border-[oklch(0.78_0.12_60/0.60)] bg-[oklch(0.78_0.12_60/0.06)]" : ""}`}
              >
                <CardContent className="p-4 flex items-start gap-4">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-sm font-bold font-display ${
                      step.highlight
                        ? "bg-[oklch(0.68_0.12_48)] text-white"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {step.num}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={
                          step.highlight
                            ? "text-[oklch(0.45_0.14_50)]"
                            : "text-primary/70"
                        }
                      >
                        {step.icon}
                      </span>
                      <p
                        className={`font-semibold text-sm ${step.highlight ? "text-[oklch(0.40_0.14_50)]" : "text-foreground"}`}
                      >
                        {step.title}
                      </p>
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${step.highlight ? "text-[oklch(0.40_0.14_50)]/80" : "text-muted-foreground"}`}
                    >
                      {step.body}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── DISCLAIMER ── */}
        <section data-ocid="assessment_result.disclaimer_section">
          <Card className="shadow-card bg-muted/30">
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                <span className="font-semibold not-italic text-foreground/70">
                  Disclaimer:{" "}
                </span>
                This analysis is for legal awareness only and does not
                constitute formal legal advice. The scoring and case citations
                are based on publicly reported judgments and established
                parameters — individual case outcomes depend on specific facts.
                Consult a qualified advocate specialising in consumer dispute
                law before initiating formal proceedings.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ── BOTTOM CTA ── */}
        <div className="flex items-center gap-4 pt-4 pb-8">
          <Link to="/history" data-ocid="assessment_result.history_link">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={15} />
              Back to History
            </Button>
          </Link>
          <Link
            to="/assessment"
            data-ocid="assessment_result.new_assessment_button"
          >
            <Button className="gap-2">
              <Plus size={15} />
              Start New Assessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
