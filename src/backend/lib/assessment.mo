import Types "../types/assessment";

module {
  /// Compute the base weighted score (max 100) from dropdown selections.
  public func computeBaseScore(input : Types.AssessmentInput) : Nat {
    let policyPoints : Nat = switch (input.policyStatus) {
      case (#Active) 25;
      case (#Unsure) 10;
      case (#Inactive) 0;
    };

    let causePoints : Nat = switch (input.fireCause) {
      case (#Electrical) 20;
      case (#NaturalCalamity) 18;
      case (#GasExplosion) 15;
      case (#Accidental) 10;
      case (#Other) 8;
      case (#Arson) 0;
    };

    let brigadePoints : Nat = switch (input.brigadeReport) {
      case (#Available) 20;
      case (#Pending) 12;
      case (#NotAvailable) 5;
    };

    let delayPoints : Nat = switch (input.reportingDelay) {
      case (#SameDay) 15;
      case (#Within3Days) 13;
      case (#Days4To7) 9;
      case (#Days8To15) 4;
      case (#Over15Days) 0;
    };

    let docPoints : Nat = switch (input.documentStatus) {
      case (#Complete) 10;
      case (#Partial) 4;
      case (#Incomplete) 1;
    };

    let surveyorPoints : Nat = switch (input.surveyorStatus) {
      case (#Favourable) 10;
      case (#Pending) 5;
      case (#NotAppointed) 4;
      case (#Unfavourable) 2;
    };

    policyPoints + causePoints + brigadePoints + delayPoints + docPoints + surveyorPoints;
  };

  /// Compute the free-text modifier in the range [-10, +10].
  public func computeFreeTextModifier(input : Types.AssessmentInput) : Int {
    let combined = (
      input.policyStatusText # " " #
      input.fireCauseText # " " #
      input.brigadeReportText # " " #
      input.reportingDelayText # " " #
      input.documentStatusText # " " #
      input.surveyorStatusText # " " #
      input.additionalContext
    ).toLower();

    var modifier : Int = 0;

    // Positive modifiers
    if (combined.contains(#text "third party") or combined.contains(#text "independent witness")) {
      modifier := modifier + 2;
    };
    if (combined.contains(#text "engineer certificate") or combined.contains(#text "forensic") or combined.contains(#text "expert certificate")) {
      modifier := modifier + 2;
    };
    if (combined.contains(#text "cooperated") or combined.contains(#text "full cooperation")) {
      modifier := modifier + 1;
    };
    if (combined.contains(#text "fir same day") or combined.contains(#text "immediately filed") or combined.contains(#text "prompt fir")) {
      modifier := modifier + 2;
    };
    if (combined.contains(#text "consistent across") or combined.contains(#text "consistent with")) {
      modifier := modifier + 1;
    };

    // Negative modifiers
    if (combined.contains(#text "contradiction") or combined.contains(#text "discrepancy") or combined.contains(#text "inconsistent")) {
      modifier := modifier - 2;
    };
    if (combined.contains(#text "arson") or combined.contains(#text "suspicious fire") or combined.contains(#text "suspected arson")) {
      modifier := modifier - 2;
    };
    if (combined.contains(#text "unpaid premium") or combined.contains(#text "lapsed premium")) {
      modifier := modifier - 3;
    };
    if (combined.contains(#text "inflation") or combined.contains(#text "inflated claim") or combined.contains(#text "exaggerated")) {
      modifier := modifier - 2;
    };
    if (combined.contains(#text "repudiation letter") or combined.contains(#text "formally repudiated") or combined.contains(#text "claim rejected")) {
      modifier := modifier - 2;
    };

    clampInt(modifier, -10, 10);
  };

  /// Build the per-parameter breakdown for display.
  public func buildBreakdown(input : Types.AssessmentInput) : [Types.ParameterBreakdown] {
    let policyAnswer : Text = switch (input.policyStatus) {
      case (#Active) "Yes, active";
      case (#Unsure) "Not sure";
      case (#Inactive) "No, not active";
    };
    let policyPoints : Nat = switch (input.policyStatus) {
      case (#Active) 25;
      case (#Unsure) 10;
      case (#Inactive) 0;
    };

    let causeAnswer : Text = switch (input.fireCause) {
      case (#Electrical) "Electrical fault / Short circuit";
      case (#Accidental) "Accidental / Unknown cause";
      case (#Arson) "Suspected arson";
      case (#GasExplosion) "Gas / Explosion";
      case (#NaturalCalamity) "Natural calamity";
      case (#Other) "Other";
    };
    let causePoints : Nat = switch (input.fireCause) {
      case (#Electrical) 20;
      case (#NaturalCalamity) 18;
      case (#GasExplosion) 15;
      case (#Accidental) 10;
      case (#Other) 8;
      case (#Arson) 0;
    };

    let brigadeAnswer : Text = switch (input.brigadeReport) {
      case (#Available) "Yes, available";
      case (#Pending) "Applied for, pending";
      case (#NotAvailable) "No, not available";
    };
    let brigadePoints : Nat = switch (input.brigadeReport) {
      case (#Available) 20;
      case (#Pending) 12;
      case (#NotAvailable) 5;
    };

    let delayAnswer : Text = switch (input.reportingDelay) {
      case (#SameDay) "Same day (0–1 days)";
      case (#Within3Days) "Within 3 days";
      case (#Days4To7) "4–7 days";
      case (#Days8To15) "8–15 days";
      case (#Over15Days) "More than 15 days";
    };
    let delayPoints : Nat = switch (input.reportingDelay) {
      case (#SameDay) 15;
      case (#Within3Days) 13;
      case (#Days4To7) 9;
      case (#Days8To15) 4;
      case (#Over15Days) 0;
    };

    let docAnswer : Text = switch (input.documentStatus) {
      case (#Complete) "Complete (FIR, bills, inventory, photos)";
      case (#Partial) "Partially complete";
      case (#Incomplete) "Incomplete / not yet submitted";
    };
    let docPoints : Nat = switch (input.documentStatus) {
      case (#Complete) 10;
      case (#Partial) 4;
      case (#Incomplete) 1;
    };

    let surveyorAnswer : Text = switch (input.surveyorStatus) {
      case (#Favourable) "Favourable (full/partial loss acknowledged)";
      case (#Unfavourable) "Unfavourable (loss denied/minimised)";
      case (#Pending) "Pending / not yet done";
      case (#NotAppointed) "Not appointed";
    };
    let surveyorPoints : Nat = switch (input.surveyorStatus) {
      case (#Favourable) 10;
      case (#Pending) 5;
      case (#NotAppointed) 4;
      case (#Unfavourable) 2;
    };

    [
      { parameter = "Policy Active"; userAnswer = policyAnswer; pointsScored = policyPoints; maxPoints = 25 },
      { parameter = "Cause of Fire"; userAnswer = causeAnswer; pointsScored = causePoints; maxPoints = 20 },
      { parameter = "Fire Brigade Report"; userAnswer = brigadeAnswer; pointsScored = brigadePoints; maxPoints = 20 },
      { parameter = "Reporting Delay"; userAnswer = delayAnswer; pointsScored = delayPoints; maxPoints = 15 },
      { parameter = "Documents Submitted"; userAnswer = docAnswer; pointsScored = docPoints; maxPoints = 10 },
      { parameter = "Surveyor Report"; userAnswer = surveyorAnswer; pointsScored = surveyorPoints; maxPoints = 10 },
    ];
  };

  /// Determine the score band label from total score.
  public func scoreBand(totalScore : Int) : Text {
    if (totalScore >= 70) { "STRONG" }
    else if (totalScore >= 40) { "MODERATE" }
    else { "WEAK" };
  };

  /// Clamp a value between lo and hi (inclusive).
  public func clampInt(value : Int, lo : Int, hi : Int) : Int {
    if (value < lo) { lo }
    else if (value > hi) { hi }
    else { value };
  };
};
