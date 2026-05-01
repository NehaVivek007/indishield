import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import AssessmentTypes "types/assessment";
import AssessmentApi "mixins/assessment-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let assessments = Map.empty<Text, AssessmentTypes.Assessment>();
  let userAssessments = Map.empty<Principal, List.List<Text>>();
  let counter = { var count : Nat = 0 };

  include AssessmentApi(accessControlState, assessments, userAssessments, counter);
};
