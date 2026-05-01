module {
  public type PolicyStatus = {
    #Active;
    #Inactive;
    #Unsure;
  };

  public type FireCause = {
    #Electrical;
    #Accidental;
    #Arson;
    #GasExplosion;
    #NaturalCalamity;
    #Other;
  };

  public type BrigadeReport = {
    #Available;
    #NotAvailable;
    #Pending;
  };

  public type ReportingDelay = {
    #SameDay;
    #Within3Days;
    #Days4To7;
    #Days8To15;
    #Over15Days;
  };

  public type DocumentStatus = {
    #Complete;
    #Partial;
    #Incomplete;
  };

  public type SurveyorStatus = {
    #Favourable;
    #Unfavourable;
    #Pending;
    #NotAppointed;
  };

  public type AssessmentInput = {
    policyStatus : PolicyStatus;
    fireCause : FireCause;
    brigadeReport : BrigadeReport;
    reportingDelay : ReportingDelay;
    documentStatus : DocumentStatus;
    surveyorStatus : SurveyorStatus;
    policyStatusText : Text;
    fireCauseText : Text;
    brigadeReportText : Text;
    reportingDelayText : Text;
    documentStatusText : Text;
    surveyorStatusText : Text;
    additionalContext : Text;
  };

  public type ParameterBreakdown = {
    parameter : Text;
    userAnswer : Text;
    pointsScored : Nat;
    maxPoints : Nat;
  };

  public type ScoreResult = {
    totalScore : Int;
    baseScore : Nat;
    freeTextModifier : Int;
    band : Text;
    breakdown : [ParameterBreakdown];
    assessmentId : Text;
  };

  public type Assessment = {
    id : Text;
    owner : Principal;
    input : AssessmentInput;
    result : ScoreResult;
    createdAt : Int;
  };
};
