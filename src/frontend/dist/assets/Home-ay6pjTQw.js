import { c as createLucideIcon, u as useAuth, j as jsxRuntimeExports, S as Shield, L as Link, B as BookOpen } from "./index-BwP1OCSN.js";
import { B as Button } from "./button-BLTDHQjM.js";
import { C as Card, a as CardContent } from "./card-By8kOJr7.js";
import { A as ArrowRight } from "./arrow-right-Cc-EbvdI.js";
import { T as TriangleAlert } from "./triangle-alert-BsoyDKI5.js";
import { F as FileText } from "./file-text-WhKqQ5gu.js";
import { G as Gavel } from "./gavel-C3Llx7ua.js";
import "./index-BvQBMgVo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4", key: "1nerag" }],
  ["path", { d: "M14 13.12c0 2.38 0 6.38-1 8.88", key: "o46ks0" }],
  ["path", { d: "M17.29 21.02c.12-.6.43-2.3.5-3.02", key: "ptglia" }],
  ["path", { d: "M2 12a10 10 0 0 1 18-6", key: "ydlgp0" }],
  ["path", { d: "M2 16h.01", key: "1gqxmh" }],
  ["path", { d: "M21.8 16c.2-2 .131-5.354 0-6", key: "drycrb" }],
  ["path", { d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2", key: "1tidbn" }],
  ["path", { d: "M8.65 22c.21-.66.45-1.32.57-2", key: "13wd9y" }],
  ["path", { d: "M9 6.8a6 6 0 0 1 9 5.2v2", key: "1fr1j5" }]
];
const Fingerprint = createLucideIcon("fingerprint", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
const features = [
  {
    id: "score",
    icon: CircleCheckBig,
    title: "Claim Strength Score (0–100)",
    desc: "Get an official weighted score based on 6 key parameters of your claim's legal viability."
  },
  {
    id: "risk",
    icon: TriangleAlert,
    title: "Denial Ground Risk Matrix",
    desc: "Identify exactly which aspects of your claim create repudiation risks, with severity ratings."
  },
  {
    id: "caselaw",
    icon: BookOpen,
    title: "Case Law Matching",
    desc: "Receive citations from 10 landmark NCDRC/SCDRC judgments directly relevant to your situation."
  },
  {
    id: "nextsteps",
    icon: Target,
    title: "Strategic Next Steps",
    desc: "Get a prioritised action plan: what to gather, whom to approach, and what legal provisions apply."
  }
];
const statutes = [
  "Consumer Protection Act 2019",
  "Insurance Act 1938 — Section 45",
  "IRDA Policyholders' Interests Regulations 2017"
];
function HomePage() {
  const { isAuthenticated, isInitializing, login, isLoggingIn } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-full flex flex-col", "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-[#1a2744] px-8 py-16 md:px-12 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-[#c9a84c]/20 border border-[#c9a84c]/40 flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 24, className: "text-[#c9a84c]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xl font-display font-bold text-white tracking-tight leading-none", children: "IndiShield" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[#c9a84c] text-[10px] font-semibold uppercase tracking-[0.15em] mt-0.5", children: "Fire Insurance Claim Analyser" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-5 max-w-2xl", children: [
        "Know your claim's legal strength",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#c9a84c]", children: "before submitting." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-lg leading-relaxed mb-10 max-w-xl", children: "IndiShield analyses your fire insurance claim against established Indian consumer dispute law and NCDRC/SCDRC judgment patterns to give you a legally-grounded strength score, denial risk breakdown, and strategic next steps." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
        isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/assessment", "data-ocid": "home.start_assessment_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            className: "bg-[#c9a84c] text-[#1a2744] hover:bg-[#d4b060] font-semibold px-8 h-12 transition-smooth shadow-lg hover:shadow-xl",
            children: [
              "Start New Assessment",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18, className: "ml-2" })
            ]
          }
        ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "lg",
            onClick: login,
            disabled: isInitializing || isLoggingIn,
            "data-ocid": "home.login_button",
            className: "bg-[#c9a84c] text-[#1a2744] hover:bg-[#d4b060] font-semibold px-8 h-12 transition-smooth shadow-lg hover:shadow-xl disabled:opacity-60",
            children: isLoggingIn ? "Connecting…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { size: 18, className: "mr-2" }),
              "Log in to Start Assessment"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/resources", "data-ocid": "home.view_methodology_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "lg",
            className: "border-white/25 text-white/80 hover:bg-white/10 hover:text-white bg-transparent px-6 h-12 transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 16, className: "mr-2" }),
              "View Methodology"
            ]
          }
        ) })
      ] }),
      !isAuthenticated && !isInitializing && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "mt-5 text-white/45 text-sm",
          "data-ocid": "home.auth_hint",
          children: "Log in with Internet Identity to save and review your assessments securely."
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background px-8 py-14 md:px-12",
        "data-ocid": "home.features_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground mb-7", children: "What you get" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: features.map((f, i) => {
            const Icon = f.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "shadow-card border-border hover:shadow-elevated transition-smooth group",
                "data-ocid": `home.feature_card.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-xl bg-[#1a2744]/6 border border-[#1a2744]/10 flex items-center justify-center group-hover:bg-[#c9a84c]/12 group-hover:border-[#c9a84c]/25 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Icon,
                    {
                      size: 20,
                      className: "text-[#c9a84c] group-hover:scale-110 transition-smooth"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-1.5 leading-snug", children: f.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: f.desc })
                  ] })
                ] }) })
              },
              f.id
            );
          }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-[#1a2744]/5 border-t border-[#1a2744]/10 px-8 py-12 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground mb-1", children: "Ready to assess your claim?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Takes about 5 minutes. All answers are stored securely on the Internet Computer blockchain." })
      ] }),
      isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/assessment", "data-ocid": "home.cta_start_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          className: "bg-[#1a2744] text-white hover:bg-[#1a2744]/90 font-semibold px-8 h-12 transition-smooth shrink-0",
          children: [
            "Start New Assessment",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16, className: "ml-2" })
          ]
        }
      ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          onClick: login,
          disabled: isInitializing || isLoggingIn,
          "data-ocid": "home.cta_login_button",
          className: "bg-[#1a2744] text-white hover:bg-[#1a2744]/90 font-semibold px-8 h-12 transition-smooth shrink-0 disabled:opacity-60",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { size: 16, className: "mr-2" }),
            isLoggingIn ? "Connecting…" : "Log in with Internet Identity"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 border-t border-border px-8 py-7 md:px-12 mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 14, className: "text-[#c9a84c]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-label text-muted-foreground", children: "Grounded in" })
      ] }),
      statutes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-xs bg-[#1a2744]/8 text-[#1a2744] border border-[#1a2744]/15 px-3 py-1 rounded-full font-medium",
          children: s
        },
        s
      ))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/20 border-t border-border px-8 py-4 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs leading-relaxed flex items-start gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { size: 13, className: "mt-0.5 flex-shrink-0 text-[#c9a84c]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Disclaimer:" }),
        " ",
        "IndiShield is for legal awareness only and does not constitute formal legal advice. Consult a qualified advocate for formal proceedings."
      ] })
    ] }) }) })
  ] });
}
export {
  HomePage as default
};
