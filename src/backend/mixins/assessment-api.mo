import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/assessment";
import AssessmentLib "../lib/assessment";

mixin (
  accessControlState : AccessControl.AccessControlState,
  assessments : Map.Map<Text, Types.Assessment>,
  userAssessments : Map.Map<Principal, List.List<Text>>,
  counter : { var count : Nat },
) {
  /// Calculate score server-side, persist assessment, return ScoreResult.
  public shared ({ caller }) func submitAssessment(input : Types.AssessmentInput) : async Types.ScoreResult {
    let baseScore = AssessmentLib.computeBaseScore(input);
    let modifier = AssessmentLib.computeFreeTextModifier(input);
    let rawTotal : Int = baseScore.toInt() + modifier;
    let totalScore = AssessmentLib.clampInt(rawTotal, 0, 100);
    let band = AssessmentLib.scoreBand(totalScore);
    let breakdown = AssessmentLib.buildBreakdown(input);

    counter.count += 1;
    let id = caller.toText() # "-" # counter.count.toText();

    let result : Types.ScoreResult = {
      totalScore;
      baseScore;
      freeTextModifier = modifier;
      band;
      breakdown;
      assessmentId = id;
    };

    let assessment : Types.Assessment = {
      id;
      owner = caller;
      input;
      result;
      createdAt = Time.now();
    };

    assessments.add(id, assessment);

    switch (userAssessments.get(caller)) {
      case null {
        let ids = List.empty<Text>();
        ids.add(id);
        userAssessments.add(caller, ids);
      };
      case (?ids) {
        ids.add(id);
        userAssessments.add(caller, ids);
      };
    };

    result;
  };

  /// Return assessment by ID if caller is the owner.
  public query ({ caller }) func getAssessment(id : Text) : async ?Types.Assessment {
    switch (assessments.get(id)) {
      case null null;
      case (?a) {
        if (Principal.equal(a.owner, caller)) { ?a } else { null };
      };
    };
  };

  /// Return all assessments owned by caller, sorted newest first.
  public query ({ caller }) func listAssessments() : async [Types.Assessment] {
    switch (userAssessments.get(caller)) {
      case null { [] };
      case (?ids) {
        let result = List.empty<Types.Assessment>();
        ids.forEach(func(id : Text) {
          switch (assessments.get(id)) {
            case null {};
            case (?a) { result.add(a) };
          };
        });
        let sorted = result.sort(func(a : Types.Assessment, b : Types.Assessment) : { #less; #equal; #greater } {
          Int.compare(b.createdAt, a.createdAt)
        });
        sorted.toArray();
      };
    };
  };
};
