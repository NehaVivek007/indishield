import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle,
  FileText,
  Fingerprint,
  Gavel,
  Shield,
  Target,
} from "lucide-react";

const features = [
  {
    id: "score",
    icon: CheckCircle,
    title: "Claim Strength Score (0–100)",
    desc: "Get an official weighted score based on 6 key parameters of your claim's legal viability.",
  },
  {
    id: "risk",
    icon: AlertTriangle,
    title: "Denial Ground Risk Matrix",
    desc: "Identify exactly which aspects of your claim create repudiation risks, with severity ratings.",
  },
  {
    id: "caselaw",
    icon: BookOpen,
    title: "Case Law Matching",
    desc: "Receive citations from 10 landmark NCDRC/SCDRC judgments directly relevant to your situation.",
  },
  {
    id: "nextsteps",
    icon: Target,
    title: "Strategic Next Steps",
    desc: "Get a prioritised action plan: what to gather, whom to approach, and what legal provisions apply.",
  },
];

const statutes = [
  "Consumer Protection Act 2019",
  "Insurance Act 1938 — Section 45",
  "IRDA Policyholders' Interests Regulations 2017",
];

export default function HomePage() {
  const { isAuthenticated, isInitializing, login, isLoggingIn } = useAuth();

  return (
    <div className="min-h-full flex flex-col" data-ocid="home.page">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-[#1a2744] px-8 py-16 md:px-12 md:py-24">
        <div className="max-w-3xl">
          {/* Logo + brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#c9a84c]/20 border border-[#c9a84c]/40 flex items-center justify-center shadow-lg">
              <Shield size={24} className="text-[#c9a84c]" />
            </div>
            <div>
              <span className="block text-xl font-display font-bold text-white tracking-tight leading-none">
                IndiShield
              </span>
              <span className="block text-[#c9a84c] text-[10px] font-semibold uppercase tracking-[0.15em] mt-0.5">
                Fire Insurance Claim Analyser
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-5 max-w-2xl">
            Know your claim's legal strength{" "}
            <span className="text-[#c9a84c]">before submitting.</span>
          </h1>

          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl">
            IndiShield analyses your fire insurance claim against established
            Indian consumer dispute law and NCDRC/SCDRC judgment patterns to
            give you a legally-grounded strength score, denial risk breakdown,
            and strategic next steps.
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            {isAuthenticated ? (
              <Link to="/assessment" data-ocid="home.start_assessment_button">
                <Button
                  size="lg"
                  className="bg-[#c9a84c] text-[#1a2744] hover:bg-[#d4b060] font-semibold px-8 h-12 transition-smooth shadow-lg hover:shadow-xl"
                >
                  Start New Assessment
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                onClick={login}
                disabled={isInitializing || isLoggingIn}
                data-ocid="home.login_button"
                className="bg-[#c9a84c] text-[#1a2744] hover:bg-[#d4b060] font-semibold px-8 h-12 transition-smooth shadow-lg hover:shadow-xl disabled:opacity-60"
              >
                {isLoggingIn ? (
                  "Connecting…"
                ) : (
                  <>
                    <Fingerprint size={18} className="mr-2" />
                    Log in to Start Assessment
                  </>
                )}
              </Button>
            )}
            <Link to="/resources" data-ocid="home.view_methodology_button">
              <Button
                variant="outline"
                size="lg"
                className="border-white/25 text-white/80 hover:bg-white/10 hover:text-white bg-transparent px-6 h-12 transition-smooth"
              >
                <BookOpen size={16} className="mr-2" />
                View Methodology
              </Button>
            </Link>
          </div>

          {/* Auth hint */}
          {!isAuthenticated && !isInitializing && (
            <p
              className="mt-5 text-white/45 text-sm"
              data-ocid="home.auth_hint"
            >
              Log in with Internet Identity to save and review your assessments
              securely.
            </p>
          )}
        </div>
      </section>

      {/* ── Feature cards ────────────────────────────────────── */}
      <section
        className="bg-background px-8 py-14 md:px-12"
        data-ocid="home.features_section"
      >
        <div className="max-w-4xl">
          <p className="text-label text-muted-foreground mb-7">What you get</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Card
                  key={f.id}
                  className="shadow-card border-border hover:shadow-elevated transition-smooth group"
                  data-ocid={`home.feature_card.${i + 1}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1a2744]/6 border border-[#1a2744]/10 flex items-center justify-center group-hover:bg-[#c9a84c]/12 group-hover:border-[#c9a84c]/25 transition-smooth">
                        <Icon
                          size={20}
                          className="text-[#c9a84c] group-hover:scale-110 transition-smooth"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-foreground mb-1.5 leading-snug">
                          {f.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────── */}
      <section className="bg-[#1a2744]/5 border-t border-[#1a2744]/10 px-8 py-12 md:px-12">
        <div className="max-w-4xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-display font-semibold text-foreground mb-1">
              Ready to assess your claim?
            </h2>
            <p className="text-muted-foreground text-sm">
              Takes about 5 minutes. All answers are stored securely on the
              Internet Computer blockchain.
            </p>
          </div>
          {isAuthenticated ? (
            <Link to="/assessment" data-ocid="home.cta_start_button">
              <Button
                size="lg"
                className="bg-[#1a2744] text-white hover:bg-[#1a2744]/90 font-semibold px-8 h-12 transition-smooth shrink-0"
              >
                Start New Assessment
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          ) : (
            <Button
              size="lg"
              onClick={login}
              disabled={isInitializing || isLoggingIn}
              data-ocid="home.cta_login_button"
              className="bg-[#1a2744] text-white hover:bg-[#1a2744]/90 font-semibold px-8 h-12 transition-smooth shrink-0 disabled:opacity-60"
            >
              <Fingerprint size={16} className="mr-2" />
              {isLoggingIn ? "Connecting…" : "Log in with Internet Identity"}
            </Button>
          )}
        </div>
      </section>

      {/* ── Legal basis strip ────────────────────────────────── */}
      <section className="bg-muted/40 border-t border-border px-8 py-7 md:px-12 mt-auto">
        <div className="max-w-4xl flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 flex-shrink-0">
            <FileText size={14} className="text-[#c9a84c]" />
            <span className="text-label text-muted-foreground">
              Grounded in
            </span>
          </div>
          {statutes.map((s) => (
            <span
              key={s}
              className="text-xs bg-[#1a2744]/8 text-[#1a2744] border border-[#1a2744]/15 px-3 py-1 rounded-full font-medium"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── Disclaimer ───────────────────────────────────────── */}
      <div className="bg-muted/20 border-t border-border px-8 py-4 md:px-12">
        <div className="max-w-4xl">
          <p className="text-muted-foreground text-xs leading-relaxed flex items-start gap-2">
            <Gavel size={13} className="mt-0.5 flex-shrink-0 text-[#c9a84c]" />
            <span>
              <strong className="text-foreground">Disclaimer:</strong>{" "}
              IndiShield is for legal awareness only and does not constitute
              formal legal advice. Consult a qualified advocate for formal
              proceedings.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
