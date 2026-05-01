import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitAssessment } from "@/hooks/useBackend";
import {
  BrigadeReport,
  DocumentStatus,
  FireCause,
  PolicyStatus,
  ReportingDelay,
  SurveyorStatus,
} from "@/types";
import type { AssessmentInput } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Shield,
} from "lucide-react";
import { useState } from "react";

interface FormState {
  step1: { selection: string; text: string };
  step2: { selection: string; text: string };
  step3: { selection: string; text: string };
  step4: { selection: string; text: string };
  step5: { selection: string; text: string };
  step6: { selection: string; text: string };
  step7: { text: string };
}

const INITIAL_FORM: FormState = {
  step1: { selection: "", text: "" },
  step2: { selection: "", text: "" },
  step3: { selection: "", text: "" },
  step4: { selection: "", text: "" },
  step5: { selection: "", text: "" },
  step6: { selection: "", text: "" },
  step7: { text: "" },
};

const STEP_NAMES = [
  "Policy Status",
  "Cause of Fire",
  "Fire Brigade Report",
  "Reporting Delay",
  "Documents Submitted",
  "Surveyor Report",
  "Additional Context",
];

function mapToAssessmentInput(form: FormState): AssessmentInput {
  const policyStatusMap: Record<string, PolicyStatus> = {
    yes: PolicyStatus.Active,
    unsure: PolicyStatus.Unsure,
    no: PolicyStatus.Inactive,
  };
  const fireCauseMap: Record<string, FireCause> = {
    electrical: FireCause.Electrical,
    accidental: FireCause.Accidental,
    arson: FireCause.Arson,
    gas: FireCause.GasExplosion,
    natural: FireCause.NaturalCalamity,
    other: FireCause.Other,
  };
  const brigadeMap: Record<string, BrigadeReport> = {
    available: BrigadeReport.Available,
    pending: BrigadeReport.Pending,
    none: BrigadeReport.NotAvailable,
  };
  const delayMap: Record<string, ReportingDelay> = {
    same_day: ReportingDelay.SameDay,
    within3: ReportingDelay.Within3Days,
    days4to7: ReportingDelay.Days4To7,
    days8to15: ReportingDelay.Days8To15,
    over15: ReportingDelay.Over15Days,
  };
  const docMap: Record<string, DocumentStatus> = {
    complete: DocumentStatus.Complete,
    partial: DocumentStatus.Partial_,
    incomplete: DocumentStatus.Incomplete,
  };
  const surveyorMap: Record<string, SurveyorStatus> = {
    favourable: SurveyorStatus.Favourable,
    unfavourable: SurveyorStatus.Unfavourable,
    pending: SurveyorStatus.Pending,
    not_appointed: SurveyorStatus.NotAppointed,
  };

  return {
    policyStatus: policyStatusMap[form.step1.selection],
    policyStatusText: form.step1.text,
    fireCause: fireCauseMap[form.step2.selection],
    fireCauseText: form.step2.text,
    brigadeReport: brigadeMap[form.step3.selection],
    brigadeReportText: form.step3.text,
    reportingDelay: delayMap[form.step4.selection],
    reportingDelayText: form.step4.text,
    documentStatus: docMap[form.step5.selection],
    documentStatusText: form.step5.text,
    surveyorStatus: surveyorMap[form.step6.selection],
    surveyorStatusText: form.step6.text,
    additionalContext: form.step7.text,
  };
}

// ─── Step components ─────────────────────────────────────────────────────────

interface StepSelectProps {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

function StepSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
}: StepSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        data-ocid="assessment.select"
        className="w-full border-primary/40 focus:ring-2 focus:ring-secondary bg-card text-foreground"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-card border-border">
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className="cursor-pointer"
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface StepTextareaProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}

function StepTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: StepTextareaProps) {
  return (
    <div className="space-y-1.5">
      {label && <p className="text-body-sm text-muted-foreground">{label}</p>}
      <Textarea
        data-ocid="assessment.textarea"
        aria-label={label || "Additional context"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="border-primary/30 focus-visible:ring-secondary resize-none bg-card text-foreground placeholder:text-muted-foreground/60"
      />
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { mutateAsync: submitAssessment, isPending } = useSubmitAssessment();

  const updateStep = (
    step: keyof FormState,
    field: "selection" | "text",
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [step]: { ...(prev[step] as Record<string, string>), [field]: value },
    }));
  };

  const stepKey = `step${currentStep}` as keyof FormState;
  const stepData = form[stepKey] as { selection?: string; text: string };
  const hasSelection = currentStep === 7 || !!stepData.selection;

  const handleNext = () => {
    if (currentStep < 7) setCurrentStep((s) => s + 1);
  };
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    try {
      const input = mapToAssessmentInput(form);
      const result = await submitAssessment(input);
      await navigate({
        to: "/assessment/$assessmentId",
        params: { assessmentId: result.assessmentId },
      });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Submission failed. Please try again.",
      );
    }
  };

  const progressPct = (currentStep / 7) * 100;

  return (
    <div className="p-6 md:p-10 flex flex-col items-center min-h-full">
      {/* Header */}
      <div className="w-full max-w-2xl mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Shield size={18} className="text-secondary" />
          <h1 className="text-headline-sm text-primary">New Assessment</h1>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Answer each question and add context. Your responses are sent to the
          server for official scoring.
        </p>
      </div>

      {/* Progress */}
      <div className="w-full max-w-2xl mb-6" data-ocid="assessment.progress">
        <div className="flex items-center justify-between mb-2">
          <span className="text-label text-muted-foreground">
            Step {currentStep} of 7 — {STEP_NAMES[currentStep - 1]}
          </span>
          <span className="text-body-sm text-secondary font-semibold">
            {Math.round(progressPct)}%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-primary/20 overflow-hidden">
          <div
            className="h-full rounded-full bg-secondary transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-elevated p-6 md:p-8 space-y-6">
        {/* Step 1 — Policy Status */}
        {currentStep === 1 && (
          <div className="space-y-5" data-ocid="assessment.step1">
            <div>
              <h2 className="text-headline-sm text-primary mb-1">
                Was the fire insurance policy active on the date of loss?
              </h2>
              <p className="text-body-sm text-muted-foreground">
                Policy validity is the primary determinant of claim viability.
              </p>
            </div>
            <StepSelect
              value={form.step1.selection}
              onChange={(v) => updateStep("step1", "selection", v)}
              options={[
                { value: "yes", label: "Active" },
                { value: "unsure", label: "Not sure" },
                { value: "no", label: "No — Inactive" },
              ]}
            />
            {form.step1.selection === "no" && (
              <div
                data-ocid="assessment.inactive_policy_warning"
                className="flex gap-3 p-4 rounded-lg border border-destructive/50 bg-destructive/10"
              >
                <AlertTriangle
                  size={18}
                  className="text-destructive mt-0.5 shrink-0"
                />
                <div>
                  <p className="text-body-sm font-semibold text-destructive mb-1">
                    ⚠️ Inactive Policy — Potentially Fatal Bar
                  </p>
                  <p className="text-body-sm text-destructive/80">
                    An inactive policy is a potentially fatal bar to your claim.
                    Please describe the circumstances below — we will still
                    analyse your full case and identify any available arguments.
                  </p>
                </div>
              </div>
            )}
            <StepTextarea
              label="Anything to add? Describe circumstances, policy number, premium status, etc."
              value={form.step1.text}
              onChange={(v) => updateStep("step1", "text", v)}
              placeholder="e.g. Policy number ABC123, last premium paid March 2024, renewal was due April 1st..."
            />
          </div>
        )}

        {/* Step 2 — Cause of Fire */}
        {currentStep === 2 && (
          <div className="space-y-5" data-ocid="assessment.step2">
            <div>
              <h2 className="text-headline-sm text-primary mb-1">
                What was the reported cause of fire?
              </h2>
              <p className="text-body-sm text-muted-foreground">
                The stated cause affects coverage eligibility and insurer
                defences.
              </p>
            </div>
            <StepSelect
              value={form.step2.selection}
              onChange={(v) => updateStep("step2", "selection", v)}
              options={[
                {
                  value: "electrical",
                  label: "Electrical fault / Short circuit",
                },
                { value: "accidental", label: "Accidental / Unknown cause" },
                { value: "arson", label: "Suspected arson" },
                { value: "gas", label: "Gas / Explosion" },
                { value: "natural", label: "Natural calamity" },
                { value: "other", label: "Other" },
              ]}
            />
            <StepTextarea
              label="Describe what happened in detail — include FIR details, date, time, and any witnesses."
              value={form.step2.text}
              onChange={(v) => updateStep("step2", "text", v)}
              placeholder="e.g. Fire broke out at 11 PM on 15 Jan 2024 due to short circuit in meter box. FIR no. 45/2024 filed at XYZ Police Station. Witnesses: neighbour Mr. Sharma..."
            />
          </div>
        )}

        {/* Step 3 — Fire Brigade Report */}
        {currentStep === 3 && (
          <div className="space-y-5" data-ocid="assessment.step3">
            <div>
              <h2 className="text-headline-sm text-primary mb-1">
                Is a fire brigade report (NOC / fire report) available?
              </h2>
              <p className="text-body-sm text-muted-foreground">
                The fire brigade report is important corroborating evidence for
                your claim.
              </p>
            </div>
            <StepSelect
              value={form.step3.selection}
              onChange={(v) => updateStep("step3", "selection", v)}
              options={[
                { value: "available", label: "Yes, available" },
                { value: "pending", label: "Applied for, pending" },
                { value: "none", label: "No, not available" },
              ]}
            />
            <StepTextarea
              label="Describe the report's findings, reference number, or reason it's unavailable."
              value={form.step3.text}
              onChange={(v) => updateStep("step3", "text", v)}
              placeholder="e.g. Fire Brigade Report No. 12/2024 from XYZ Fire Station confirming electrical cause. Report received 5 days after incident..."
            />
          </div>
        )}

        {/* Step 4 — Reporting Delay */}
        {currentStep === 4 && (
          <div className="space-y-5" data-ocid="assessment.step4">
            <div>
              <h2 className="text-headline-sm text-primary mb-1">
                How many days after the fire was the insurer intimated?
              </h2>
              <p className="text-body-sm text-muted-foreground">
                Delay in intimation is a common ground for repudiation, though
                courts allow reasonable explanation.
              </p>
            </div>
            <StepSelect
              value={form.step4.selection}
              onChange={(v) => updateStep("step4", "selection", v)}
              options={[
                { value: "same_day", label: "Same day — 0 to 1 days" },
                { value: "within3", label: "Within 3 days" },
                { value: "days4to7", label: "4 to 7 days" },
                { value: "days8to15", label: "8 to 15 days" },
                { value: "over15", label: "More than 15 days" },
              ]}
            />
            <StepTextarea
              label="If there was a delay, explain the reason. Include any insurer communications."
              value={form.step4.text}
              onChange={(v) => updateStep("step4", "text", v)}
              placeholder="e.g. Intimation was delayed because the claimant was hospitalised due to injuries from the fire. Insurer's toll-free number notified on 20 Jan 2024..."
            />
          </div>
        )}

        {/* Step 5 — Documents Submitted */}
        {currentStep === 5 && (
          <div className="space-y-5" data-ocid="assessment.step5">
            <div>
              <h2 className="text-headline-sm text-primary mb-1">
                Are all required claim documents submitted?
              </h2>
              <p className="text-body-sm text-muted-foreground">
                Complete documentation significantly reduces the insurer's
                ability to reject on procedural grounds.
              </p>
            </div>
            <StepSelect
              value={form.step5.selection}
              onChange={(v) => updateStep("step5", "selection", v)}
              options={[
                {
                  value: "complete",
                  label: "Complete — FIR, bills, inventory, photos",
                },
                { value: "partial", label: "Partially complete" },
                {
                  value: "incomplete",
                  label: "Incomplete / not yet submitted",
                },
              ]}
            />
            <StepTextarea
              label="List documents submitted and any that are missing or pending."
              value={form.step5.text}
              onChange={(v) => updateStep("step5", "text", v)}
              placeholder="e.g. Submitted: FIR copy, fire brigade report, claim form, photographs. Pending: purchase bills for damaged equipment (approx. ₹2.5L), stock inventory..."
            />
          </div>
        )}

        {/* Step 6 — Surveyor Report */}
        {currentStep === 6 && (
          <div className="space-y-5" data-ocid="assessment.step6">
            <div>
              <h2 className="text-headline-sm text-primary mb-1">
                What is the status of the insurer's surveyor report?
              </h2>
              <p className="text-body-sm text-muted-foreground">
                The surveyor's findings heavily influence the insurer's
                decision, though courts can override arbitrary assessments.
              </p>
            </div>
            <StepSelect
              value={form.step6.selection}
              onChange={(v) => updateStep("step6", "selection", v)}
              options={[
                {
                  value: "favourable",
                  label: "Favourable — full or partial loss acknowledged",
                },
                {
                  value: "unfavourable",
                  label: "Unfavourable — loss denied or minimised",
                },
                { value: "pending", label: "Pending / not yet done" },
                { value: "not_appointed", label: "Surveyor not appointed" },
              ]}
            />
            <StepTextarea
              label="Describe the surveyor's findings, any objections raised, or reason for non-appointment."
              value={form.step6.text}
              onChange={(v) => updateStep("step6", "text", v)}
              placeholder="e.g. Surveyor assessed loss at ₹3.2L against claimed ₹8.5L. Objected to stock valuation claiming over-estimation. Report dated 10 Feb 2024..."
            />
          </div>
        )}

        {/* Step 7 — Additional Context */}
        {currentStep === 7 && (
          <div className="space-y-5" data-ocid="assessment.step7">
            <div>
              <h2 className="text-headline-sm text-primary mb-1">
                Any other relevant information about your claim or the insurer's
                response?
              </h2>
              <p className="text-body-sm text-muted-foreground">
                Provide any additional context — repudiation reasons, legal
                communications, prior history, etc.
              </p>
            </div>
            <StepTextarea
              label=""
              value={form.step7.text}
              onChange={(v) => updateStep("step7", "text", v)}
              placeholder="Enter insurer's repudiation reasons, communications received, prior claim history, any legal notices sent, policy clause disputes, or anything else relevant..."
              rows={7}
            />
            <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/15">
              <Shield size={14} className="text-secondary mt-0.5 shrink-0" />
              <p className="text-body-sm text-muted-foreground">
                This context is used by the scoring engine to apply a contextual
                adjustment (±10 points) to your final score based on positive
                and negative factors identified in your narrative.
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {submitError && (
          <div
            data-ocid="assessment.error_state"
            className="flex gap-2 p-3 rounded-lg border border-destructive/40 bg-destructive/10"
          >
            <AlertTriangle
              size={16}
              className="text-destructive mt-0.5 shrink-0"
            />
            <p className="text-body-sm text-destructive">{submitError}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          {currentStep > 1 ? (
            <Button
              data-ocid="assessment.back_button"
              variant="outline"
              onClick={handleBack}
              disabled={isPending}
              className="border-primary/30 text-primary hover:bg-primary/5 gap-1"
            >
              <ChevronLeft size={16} />
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 7 ? (
            <Button
              data-ocid="assessment.next_button"
              onClick={handleNext}
              disabled={!hasSelection}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1 disabled:opacity-40"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          ) : (
            <Button
              data-ocid="assessment.submit_button"
              onClick={handleSubmit}
              disabled={isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90 border border-secondary/50 gap-2 px-6"
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Analysing…
                </>
              ) : (
                <>
                  Submit Assessment
                  <ChevronRight size={16} />
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Loading overlay */}
      {isPending && (
        <div
          data-ocid="assessment.loading_state"
          className="fixed inset-0 bg-background/70 backdrop-blur-sm flex flex-col items-center justify-center z-50"
        >
          <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center gap-4 shadow-elevated max-w-sm mx-4 text-center">
            <div className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-secondary animate-spin" />
            <div>
              <p className="text-body-lg font-semibold text-primary mb-1">
                Analysing Your Claim
              </p>
              <p className="text-body-sm text-muted-foreground">
                The scoring engine is evaluating your inputs against established
                case law and legal parameters…
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
