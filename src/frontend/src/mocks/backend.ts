import type { backendInterface } from "../backend";
import {
  BrigadeReport,
  DocumentStatus,
  FireCause,
  PolicyStatus,
  ReportingDelay,
  SurveyorStatus,
  UserRole,
} from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const sampleAssessmentInput = {
  brigadeReport: BrigadeReport.Available,
  surveyorStatus: SurveyorStatus.Favourable,
  fireCause: FireCause.Electrical,
  fireCauseText: "Short circuit in the main electrical panel caused the fire.",
  policyStatus: PolicyStatus.Active,
  documentStatus: DocumentStatus.Complete,
  reportingDelayText: "Reported same day, within hours of the incident.",
  policyStatusText: "Policy was active and premiums were up to date.",
  additionalContext: "FIR filed promptly, fire brigade report available, surveyor cooperated.",
  brigadeReportText: "Fire brigade NOC obtained from local station.",
  documentStatusText: "FIR, inventory list, photographs, and bills submitted.",
  surveyorStatusText: "Surveyor acknowledged full loss in written report.",
  reportingDelay: ReportingDelay.SameDay,
};

const sampleScoreResult = {
  freeTextModifier: BigInt(8),
  band: "STRONG",
  breakdown: [
    { parameter: "Policy Active", userAnswer: "Yes", pointsScored: BigInt(25), maxPoints: BigInt(25) },
    { parameter: "Cause of Fire", userAnswer: "Electrical/Short circuit", pointsScored: BigInt(20), maxPoints: BigInt(20) },
    { parameter: "Fire Brigade Report", userAnswer: "Available", pointsScored: BigInt(20), maxPoints: BigInt(20) },
    { parameter: "Reporting Delay", userAnswer: "Same day (0–1 days)", pointsScored: BigInt(15), maxPoints: BigInt(15) },
    { parameter: "Documents Submitted", userAnswer: "Complete", pointsScored: BigInt(10), maxPoints: BigInt(10) },
    { parameter: "Surveyor Report", userAnswer: "Favourable", pointsScored: BigInt(10), maxPoints: BigInt(10) },
  ],
  totalScore: BigInt(88),
  baseScore: BigInt(80),
  assessmentId: "assessment-001",
};

const sampleAssessment = {
  id: "assessment-001",
  result: sampleScoreResult,
  owner: { toText: () => "aaaaa-aa" } as unknown as Principal,
  createdAt: BigInt(Date.now() * 1_000_000),
  input: sampleAssessmentInput,
};

export const mockBackend: backendInterface = {
  _initializeAccessControl: async (): Promise<void> => undefined,
  assignCallerUserRole: async (_user: Principal, _role: UserRole): Promise<void> => undefined,
  getAssessment: async (_id: string) => sampleAssessment,
  getCallerUserRole: async () => UserRole.user,
  isCallerAdmin: async () => false,
  listAssessments: async () => [sampleAssessment],
  submitAssessment: async (_input) => sampleScoreResult,
};
