// Shared frontend types for IndiShield
// Re-export backend enums and interfaces for use throughout the app
export type {
  Assessment,
  AssessmentInput,
  ScoreResult,
  ParameterBreakdown,
} from "../backend.d";

export {
  PolicyStatus,
  FireCause,
  BrigadeReport,
  ReportingDelay,
  DocumentStatus,
  SurveyorStatus,
  UserRole,
} from "../backend.d";

// Form state for the multi-step assessment wizard
export interface AssessmentFormState {
  // Step 1
  policyStatus: string;
  policyStatusText: string;
  // Step 2
  fireCause: string;
  fireCauseText: string;
  // Step 3
  brigadeReport: string;
  brigadeReportText: string;
  // Step 4
  reportingDelay: string;
  reportingDelayText: string;
  // Step 5
  documentStatus: string;
  documentStatusText: string;
  // Step 6
  surveyorStatus: string;
  surveyorStatusText: string;
  // Step 7
  additionalContext: string;
}

export type AssessmentStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export type ScoreBand = "STRONG" | "MODERATE" | "WEAK";
