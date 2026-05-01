import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import {
  BrigadeReport,
  DocumentStatus,
  FireCause,
  PolicyStatus,
  ReportingDelay,
  SurveyorStatus,
} from "../backend";
import type {
  AssessmentInput as CandidAssessmentInput,
  ScoreResult as CandidScoreResult,
} from "../declarations/backend.did.d.ts";
import type { AssessmentInput, ScoreResult } from "../types";

/**
 * Manually converts our AssessmentInput (with enum string values) into the
 * Candid variant objects expected by the raw ICP actor.
 *
 * This works around a bug in the generated backend.ts serializer where
 * `to_candid_variant_n34` compares against `DocumentStatus.Partial`
 * (which is undefined) instead of `DocumentStatus.Partial_` (= "Partial"),
 * causing the "Partial" value to fall through as a plain string instead of
 * being converted to the required `{ Partial: null }` Candid variant.
 */
function toCandidAssessmentInput(
  input: AssessmentInput,
): CandidAssessmentInput {
  const brigadeReport = (() => {
    switch (input.brigadeReport) {
      case BrigadeReport.Available:
        return { Available: null } as const;
      case BrigadeReport.NotAvailable:
        return { NotAvailable: null } as const;
      default:
        return { Pending: null } as const;
    }
  })();

  const surveyorStatus = (() => {
    switch (input.surveyorStatus) {
      case SurveyorStatus.Favourable:
        return { Favourable: null } as const;
      case SurveyorStatus.Unfavourable:
        return { Unfavourable: null } as const;
      case SurveyorStatus.NotAppointed:
        return { NotAppointed: null } as const;
      default:
        return { Pending: null } as const;
    }
  })();

  const fireCause = (() => {
    switch (input.fireCause) {
      case FireCause.NaturalCalamity:
        return { NaturalCalamity: null } as const;
      case FireCause.GasExplosion:
        return { GasExplosion: null } as const;
      case FireCause.Arson:
        return { Arson: null } as const;
      case FireCause.Electrical:
        return { Electrical: null } as const;
      case FireCause.Accidental:
        return { Accidental: null } as const;
      default:
        return { Other: null } as const;
    }
  })();

  const policyStatus = (() => {
    switch (input.policyStatus) {
      case PolicyStatus.Active:
        return { Active: null } as const;
      case PolicyStatus.Inactive:
        return { Inactive: null } as const;
      default:
        return { Unsure: null } as const;
    }
  })();

  const documentStatus = (() => {
    switch (input.documentStatus) {
      case DocumentStatus.Complete:
        return { Complete: null } as const;
      case DocumentStatus.Partial_:
        return { Partial: null } as const;
      default:
        return { Incomplete: null } as const;
    }
  })();

  const reportingDelay = (() => {
    switch (input.reportingDelay) {
      case ReportingDelay.SameDay:
        return { SameDay: null } as const;
      case ReportingDelay.Within3Days:
        return { Within3Days: null } as const;
      case ReportingDelay.Days4To7:
        return { Days4To7: null } as const;
      case ReportingDelay.Days8To15:
        return { Days8To15: null } as const;
      default:
        return { Over15Days: null } as const;
    }
  })();

  return {
    brigadeReport,
    surveyorStatus,
    fireCause,
    fireCauseText: input.fireCauseText,
    policyStatus,
    documentStatus,
    reportingDelayText: input.reportingDelayText,
    policyStatusText: input.policyStatusText,
    additionalContext: input.additionalContext,
    brigadeReportText: input.brigadeReportText,
    documentStatusText: input.documentStatusText,
    surveyorStatusText: input.surveyorStatusText,
    reportingDelay,
  };
}

export function useBackendActor() {
  return useActor(createActor);
}

export function useListAssessments() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["assessments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAssessments();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetAssessment(id: string | undefined) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["assessment", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getAssessment(id);
    },
    enabled: !!actor && !actorFetching && !!id,
  });
}

export function useSubmitAssessment() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<ScoreResult, Error, AssessmentInput>({
    mutationFn: async (input: AssessmentInput) => {
      if (!actor) throw new Error("Backend not available");
      // Bypass the broken Backend serializer (which has a bug for DocumentStatus.Partial_)
      // by manually building the Candid variant objects and calling the raw underlying actor.
      const candidInput = toCandidAssessmentInput(input);
      const rawActor = (
        actor as unknown as {
          actor: {
            submitAssessment: (
              i: CandidAssessmentInput,
            ) => Promise<CandidScoreResult>;
          };
        }
      ).actor;
      return rawActor.submitAssessment(candidInput) as Promise<ScoreResult>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessments"] });
    },
  });
}
