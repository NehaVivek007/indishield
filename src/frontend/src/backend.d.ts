import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Assessment {
    id: string;
    result: ScoreResult;
    owner: Principal;
    createdAt: bigint;
    input: AssessmentInput;
}
export interface ScoreResult {
    freeTextModifier: bigint;
    band: string;
    breakdown: Array<ParameterBreakdown>;
    totalScore: bigint;
    baseScore: bigint;
    assessmentId: string;
}
export interface AssessmentInput {
    brigadeReport: BrigadeReport;
    surveyorStatus: SurveyorStatus;
    fireCause: FireCause;
    fireCauseText: string;
    policyStatus: PolicyStatus;
    documentStatus: DocumentStatus;
    reportingDelayText: string;
    policyStatusText: string;
    additionalContext: string;
    brigadeReportText: string;
    documentStatusText: string;
    surveyorStatusText: string;
    reportingDelay: ReportingDelay;
}
export interface ParameterBreakdown {
    maxPoints: bigint;
    pointsScored: bigint;
    parameter: string;
    userAnswer: string;
}
export enum BrigadeReport {
    Available = "Available",
    NotAvailable = "NotAvailable",
    Pending = "Pending"
}
export enum DocumentStatus {
    Complete = "Complete",
    Partial_ = "Partial",
    Incomplete = "Incomplete"
}
export enum FireCause {
    NaturalCalamity = "NaturalCalamity",
    GasExplosion = "GasExplosion",
    Arson = "Arson",
    Electrical = "Electrical",
    Other = "Other",
    Accidental = "Accidental"
}
export enum PolicyStatus {
    Inactive = "Inactive",
    Active = "Active",
    Unsure = "Unsure"
}
export enum ReportingDelay {
    Within3Days = "Within3Days",
    SameDay = "SameDay",
    Days4To7 = "Days4To7",
    Days8To15 = "Days8To15",
    Over15Days = "Over15Days"
}
export enum SurveyorStatus {
    Favourable = "Favourable",
    Unfavourable = "Unfavourable",
    NotAppointed = "NotAppointed",
    Pending = "Pending"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAssessment(id: string): Promise<Assessment | null>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
    listAssessments(): Promise<Array<Assessment>>;
    submitAssessment(input: AssessmentInput): Promise<ScoreResult>;
}
