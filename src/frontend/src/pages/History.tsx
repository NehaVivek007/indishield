import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowRight, ClipboardList, LogIn, Plus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useListAssessments } from "../hooks/useBackend";
import type { Assessment } from "../types";
import { FireCause } from "../types";

// ── helpers ──────────────────────────────────────────────────────────────────

function bandColors(band: string) {
  switch (band) {
    case "STRONG":
      return {
        text: "",
        panel: "",
        border: "",
        badge: "",
        textStyle: { color: "oklch(0.45 0.15 142)" },
        panelStyle: { background: "oklch(0.97 0.04 142)" },
        borderStyle: { borderColor: "oklch(0.85 0.08 142)" },
        badgeStyle: {
          background: "oklch(0.97 0.04 142)",
          color: "oklch(0.45 0.15 142)",
          borderColor: "oklch(0.85 0.08 142)",
        },
      };
    case "MODERATE":
      return {
        text: "",
        panel: "",
        border: "",
        badge: "",
        textStyle: { color: "oklch(0.50 0.14 65)" },
        panelStyle: { background: "oklch(0.97 0.04 65)" },
        borderStyle: { borderColor: "oklch(0.85 0.08 65)" },
        badgeStyle: {
          background: "oklch(0.97 0.04 65)",
          color: "oklch(0.50 0.14 65)",
          borderColor: "oklch(0.85 0.08 65)",
        },
      };
    default: // WEAK
      return {
        text: "",
        panel: "",
        border: "",
        badge: "",
        textStyle: { color: "oklch(0.45 0.18 25)" },
        panelStyle: { background: "oklch(0.97 0.04 25)" },
        borderStyle: { borderColor: "oklch(0.85 0.08 25)" },
        badgeStyle: {
          background: "oklch(0.97 0.04 25)",
          color: "oklch(0.45 0.18 25)",
          borderColor: "oklch(0.85 0.08 25)",
        },
      };
  }
}

const FIRE_CAUSE_LABELS: Record<FireCause, string> = {
  [FireCause.Electrical]: "Electrical fault",
  [FireCause.Accidental]: "Accidental / Unknown",
  [FireCause.Arson]: "Suspected arson",
  [FireCause.GasExplosion]: "Gas / Explosion",
  [FireCause.NaturalCalamity]: "Natural calamity",
  [FireCause.Other]: "Other",
};

function formatDate(ts: bigint): string {
  return format(new Date(Number(ts / 1_000_000n)), "dd MMM yyyy");
}

// ── sub-components ───────────────────────────────────────────────────────────

function AssessmentCard({
  assessment,
  index,
}: {
  assessment: Assessment;
  index: number;
}) {
  const score = Number(assessment.result.totalScore);
  const band = assessment.result.band;
  const c = bandColors(band);
  const causeLabel =
    FIRE_CAUSE_LABELS[assessment.input.fireCause] ?? assessment.input.fireCause;
  const dateStr = formatDate(assessment.createdAt);
  const pos = index + 1;

  return (
    <Card
      data-ocid={`history.item.${pos}`}
      className="border transition-smooth hover:shadow-elevated group overflow-hidden"
      style={c.borderStyle}
    >
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row items-stretch">
          {/* Score panel */}
          <div
            className="flex flex-col items-center justify-center px-6 py-5 min-w-[116px] border-b sm:border-b-0 sm:border-r"
            style={{ ...c.panelStyle, ...c.borderStyle }}
          >
            <span
              className="text-4xl font-display font-bold tabular-nums leading-none"
              style={c.textStyle}
            >
              {score}
            </span>
            <span className="text-xs text-muted-foreground mt-0.5">/ 100</span>
            <Badge
              data-ocid={`history.band_badge.${pos}`}
              variant="outline"
              className="mt-2 text-[10px] font-semibold tracking-widest uppercase border"
              style={c.badgeStyle}
            >
              {band}
            </Badge>
          </div>

          {/* Details */}
          <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4">
            <div className="space-y-0.5 min-w-0">
              <p className="text-label text-muted-foreground">{dateStr}</p>
              <p className="text-body-md font-medium text-foreground truncate">
                {causeLabel}
              </p>
              <p className="text-body-sm text-muted-foreground font-mono">
                #{assessment.id.slice(0, 8)}…
              </p>
            </div>

            <Link
              to="/assessment/$assessmentId"
              params={{ assessmentId: assessment.id }}
              data-ocid={`history.view_link.${pos}`}
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 shrink-0 border-accent/40 text-accent-foreground hover:bg-accent/10 transition-smooth"
              >
                View Full Analysis
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SkeletonRows() {
  return (
    <div className="space-y-3" data-ocid="history.loading_state">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border border-border overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="bg-muted flex flex-col items-center justify-center px-6 py-5 min-w-[116px] gap-2 border-b sm:border-b-0 sm:border-r border-border">
                <Skeleton className="h-10 w-12 rounded" />
                <Skeleton className="h-4 w-16 rounded-full" />
              </div>
              <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-4">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-44" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-8 w-38 rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ── page ─────────────────────────────────────────────────────────────────────

export default function History() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const { data: assessments, isLoading, error } = useListAssessments();

  // Not authenticated
  if (!isInitializing && !isAuthenticated) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4"
        data-ocid="history.unauthenticated_state"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
          <ClipboardList className="w-7 h-7 text-primary" />
        </div>
        <div className="space-y-2 max-w-sm">
          <h2 className="text-headline-sm text-foreground">
            Log in to view your assessment history
          </h2>
          <p className="text-body-sm text-muted-foreground">
            Your assessments are private and tied to your Internet Identity.
            Sign in to access your saved results.
          </p>
        </div>
        <Button
          onClick={login}
          data-ocid="history.login_button"
          className="gap-2"
        >
          <LogIn className="w-4 h-4" />
          Log In with Internet Identity
        </Button>
      </div>
    );
  }

  return (
    <div
      className="max-w-3xl mx-auto px-4 py-8 space-y-6"
      data-ocid="history.page"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-headline-md text-primary">My Assessments</h1>
          <p className="text-body-sm text-muted-foreground mt-1">
            Your fire insurance claim analyses, sorted newest first.
          </p>
        </div>
        <Link to="/assessment" data-ocid="history.new_assessment_button">
          <Button className="gap-2 shrink-0">
            <Plus className="w-4 h-4" />
            New Assessment
          </Button>
        </Link>
      </div>

      <div className="border-t border-border" />

      {/* States */}
      {isLoading || isInitializing ? (
        <SkeletonRows />
      ) : error ? (
        <div
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-5 py-4 text-sm text-destructive"
          data-ocid="history.error_state"
        >
          Failed to load assessments. Please try refreshing the page.
        </div>
      ) : !assessments || assessments.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 gap-5 text-center border border-dashed border-border rounded-xl bg-muted/30"
          data-ocid="history.empty_state"
        >
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
            <ClipboardList className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="space-y-1 max-w-xs">
            <p className="text-body-md font-medium text-foreground">
              No assessments yet
            </p>
            <p className="text-body-sm text-muted-foreground">
              Start your first assessment to see results here.
            </p>
          </div>
          <Link to="/assessment" data-ocid="history.start_assessment_button">
            <Button variant="outline" className="gap-2">
              Start New Assessment
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3" data-ocid="history.list">
          {assessments.map((assessment, i) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}
