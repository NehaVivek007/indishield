import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, am as React, b as cn, B as BookOpen, C as Clock, S as Shield } from "./index-BwP1OCSN.js";
import { u as useLayoutEffect2, e as useControllableState, P as Primitive, f as useId, c as composeEventHandlers, a as createContextScope, g as createCollection, b as useDirection, C as ChevronDown } from "./index-BbAUpyCr.js";
import { u as useComposedRefs } from "./index-BvQBMgVo.js";
import { B as Badge } from "./badge-DyNPHko5.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-By8kOJr7.js";
import { S as Scale, a as CircleCheck, C as CircleX } from "./scale-DKnE6FYX.js";
import { F as FileText } from "./file-text-WhKqQ5gu.js";
import { T as TriangleAlert } from "./triangle-alert-BsoyDKI5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var Presence = (props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : reactExports.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? reactExports.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
  const [node, setNode] = reactExports.useState();
  const stylesRef = reactExports.useRef(null);
  const prevPresentRef = reactExports.useRef(present);
  const prevAnimationNameRef = reactExports.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  reactExports.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || (styles == null ? void 0 : styles.display) === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: reactExports.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName(styles) {
  return (styles == null ? void 0 : styles.animationName) || "none";
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext, createCollapsibleScope] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCollapsible,
      open: openProp,
      defaultOpen,
      disabled,
      onOpenChange,
      ...collapsibleProps
    } = props;
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: COLLAPSIBLE_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CollapsibleProvider,
      {
        scope: __scopeCollapsible,
        disabled,
        contentId: useId(),
        open,
        onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            "data-state": getState$1(open),
            "data-disabled": disabled ? "" : void 0,
            ...collapsibleProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Collapsible.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME$1 = "CollapsibleTrigger";
var CollapsibleTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCollapsible, ...triggerProps } = props;
    const context = useCollapsibleContext(TRIGGER_NAME$1, __scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-controls": context.contentId,
        "aria-expanded": context.open || false,
        "data-state": getState$1(context.open),
        "data-disabled": context.disabled ? "" : void 0,
        disabled: context.disabled,
        ...triggerProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
CollapsibleTrigger.displayName = TRIGGER_NAME$1;
var CONTENT_NAME$1 = "CollapsibleContent";
var CollapsibleContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...contentProps } = props;
    const context = useCollapsibleContext(CONTENT_NAME$1, props.__scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContentImpl, { ...contentProps, ref: forwardedRef, present }) });
  }
);
CollapsibleContent.displayName = CONTENT_NAME$1;
var CollapsibleContentImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeCollapsible, present, children, ...contentProps } = props;
  const context = useCollapsibleContext(CONTENT_NAME$1, __scopeCollapsible);
  const [isPresent, setIsPresent] = reactExports.useState(present);
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const heightRef = reactExports.useRef(0);
  const height = heightRef.current;
  const widthRef = reactExports.useRef(0);
  const width = widthRef.current;
  const isOpen = context.open || isPresent;
  const isMountAnimationPreventedRef = reactExports.useRef(isOpen);
  const originalStylesRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
    return () => cancelAnimationFrame(rAF);
  }, []);
  useLayoutEffect2(() => {
    const node = ref.current;
    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration = originalStylesRef.current.transitionDuration;
        node.style.animationName = originalStylesRef.current.animationName;
      }
      setIsPresent(present);
    }
  }, [context.open, present]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-state": getState$1(context.open),
      "data-disabled": context.disabled ? "" : void 0,
      id: context.contentId,
      hidden: !isOpen,
      ...contentProps,
      ref: composedRefs,
      style: {
        [`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
        [`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
        ...props.style
      },
      children: isOpen && children
    }
  );
});
function getState$1(open) {
  return open ? "open" : "closed";
}
var Root = Collapsible;
var Trigger = CollapsibleTrigger;
var Content = CollapsibleContent;
var ACCORDION_NAME = "Accordion";
var ACCORDION_KEYS = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
var [Collection, useCollection, createCollectionScope] = createCollection(ACCORDION_NAME);
var [createAccordionContext] = createContextScope(ACCORDION_NAME, [
  createCollectionScope,
  createCollapsibleScope
]);
var useCollapsibleScope = createCollapsibleScope();
var Accordion$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { type, ...accordionProps } = props;
    const singleProps = accordionProps;
    const multipleProps = accordionProps;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeAccordion, children: type === "multiple" ? /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImplMultiple, { ...multipleProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImplSingle, { ...singleProps, ref: forwardedRef }) });
  }
);
Accordion$1.displayName = ACCORDION_NAME;
var [AccordionValueProvider, useAccordionValueContext] = createAccordionContext(ACCORDION_NAME);
var [AccordionCollapsibleProvider, useAccordionCollapsibleContext] = createAccordionContext(
  ACCORDION_NAME,
  { collapsible: false }
);
var AccordionImplSingle = React.forwardRef(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange = () => {
      },
      collapsible = false,
      ...accordionSingleProps
    } = props;
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? "",
      onChange: onValueChange,
      caller: ACCORDION_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionValueProvider,
      {
        scope: props.__scopeAccordion,
        value: React.useMemo(() => value ? [value] : [], [value]),
        onItemOpen: setValue,
        onItemClose: React.useCallback(() => collapsible && setValue(""), [collapsible, setValue]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImpl, { ...accordionSingleProps, ref: forwardedRef }) })
      }
    );
  }
);
var AccordionImplMultiple = React.forwardRef((props, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange = () => {
    },
    ...accordionMultipleProps
  } = props;
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? [],
    onChange: onValueChange,
    caller: ACCORDION_NAME
  });
  const handleItemOpen = React.useCallback(
    (itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]),
    [setValue]
  );
  const handleItemClose = React.useCallback(
    (itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)),
    [setValue]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AccordionValueProvider,
    {
      scope: props.__scopeAccordion,
      value,
      onItemOpen: handleItemOpen,
      onItemClose: handleItemClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImpl, { ...accordionMultipleProps, ref: forwardedRef }) })
    }
  );
});
var [AccordionImplProvider, useAccordionContext] = createAccordionContext(ACCORDION_NAME);
var AccordionImpl = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, disabled, dir, orientation = "vertical", ...accordionProps } = props;
    const accordionRef = React.useRef(null);
    const composedRefs = useComposedRefs(accordionRef, forwardedRef);
    const getItems = useCollection(__scopeAccordion);
    const direction = useDirection(dir);
    const isDirectionLTR = direction === "ltr";
    const handleKeyDown = composeEventHandlers(props.onKeyDown, (event) => {
      var _a;
      if (!ACCORDION_KEYS.includes(event.key)) return;
      const target = event.target;
      const triggerCollection = getItems().filter((item) => {
        var _a2;
        return !((_a2 = item.ref.current) == null ? void 0 : _a2.disabled);
      });
      const triggerIndex = triggerCollection.findIndex((item) => item.ref.current === target);
      const triggerCount = triggerCollection.length;
      if (triggerIndex === -1) return;
      event.preventDefault();
      let nextIndex = triggerIndex;
      const homeIndex = 0;
      const endIndex = triggerCount - 1;
      const moveNext = () => {
        nextIndex = triggerIndex + 1;
        if (nextIndex > endIndex) {
          nextIndex = homeIndex;
        }
      };
      const movePrev = () => {
        nextIndex = triggerIndex - 1;
        if (nextIndex < homeIndex) {
          nextIndex = endIndex;
        }
      };
      switch (event.key) {
        case "Home":
          nextIndex = homeIndex;
          break;
        case "End":
          nextIndex = endIndex;
          break;
        case "ArrowRight":
          if (orientation === "horizontal") {
            if (isDirectionLTR) {
              moveNext();
            } else {
              movePrev();
            }
          }
          break;
        case "ArrowDown":
          if (orientation === "vertical") {
            moveNext();
          }
          break;
        case "ArrowLeft":
          if (orientation === "horizontal") {
            if (isDirectionLTR) {
              movePrev();
            } else {
              moveNext();
            }
          }
          break;
        case "ArrowUp":
          if (orientation === "vertical") {
            movePrev();
          }
          break;
      }
      const clampedIndex = nextIndex % triggerCount;
      (_a = triggerCollection[clampedIndex].ref.current) == null ? void 0 : _a.focus();
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionImplProvider,
      {
        scope: __scopeAccordion,
        disabled,
        direction: dir,
        orientation,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            ...accordionProps,
            "data-orientation": orientation,
            ref: composedRefs,
            onKeyDown: disabled ? void 0 : handleKeyDown
          }
        ) })
      }
    );
  }
);
var ITEM_NAME = "AccordionItem";
var [AccordionItemProvider, useAccordionItemContext] = createAccordionContext(ITEM_NAME);
var AccordionItem$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, value, ...accordionItemProps } = props;
    const accordionContext = useAccordionContext(ITEM_NAME, __scopeAccordion);
    const valueContext = useAccordionValueContext(ITEM_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    const triggerId = useId();
    const open = value && valueContext.value.includes(value) || false;
    const disabled = accordionContext.disabled || props.disabled;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionItemProvider,
      {
        scope: __scopeAccordion,
        open,
        disabled,
        triggerId,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root,
          {
            "data-orientation": accordionContext.orientation,
            "data-state": getState(open),
            ...collapsibleScope,
            ...accordionItemProps,
            ref: forwardedRef,
            disabled,
            open,
            onOpenChange: (open2) => {
              if (open2) {
                valueContext.onItemOpen(value);
              } else {
                valueContext.onItemClose(value);
              }
            }
          }
        )
      }
    );
  }
);
AccordionItem$1.displayName = ITEM_NAME;
var HEADER_NAME = "AccordionHeader";
var AccordionHeader = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...headerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(HEADER_NAME, __scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.h3,
      {
        "data-orientation": accordionContext.orientation,
        "data-state": getState(itemContext.open),
        "data-disabled": itemContext.disabled ? "" : void 0,
        ...headerProps,
        ref: forwardedRef
      }
    );
  }
);
AccordionHeader.displayName = HEADER_NAME;
var TRIGGER_NAME = "AccordionTrigger";
var AccordionTrigger$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...triggerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleContext = useAccordionCollapsibleContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.ItemSlot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Trigger,
      {
        "aria-disabled": itemContext.open && !collapsibleContext.collapsible || void 0,
        "data-orientation": accordionContext.orientation,
        id: itemContext.triggerId,
        ...collapsibleScope,
        ...triggerProps,
        ref: forwardedRef
      }
    ) });
  }
);
AccordionTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "AccordionContent";
var AccordionContent$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...contentProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(CONTENT_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content,
      {
        role: "region",
        "aria-labelledby": itemContext.triggerId,
        "data-orientation": accordionContext.orientation,
        ...collapsibleScope,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ["--radix-accordion-content-height"]: "var(--radix-collapsible-content-height)",
          ["--radix-accordion-content-width"]: "var(--radix-collapsible-content-width)",
          ...props.style
        }
      }
    );
  }
);
AccordionContent$1.displayName = CONTENT_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var Root2 = Accordion$1;
var Item = AccordionItem$1;
var Header = AccordionHeader;
var Trigger2 = AccordionTrigger$1;
var Content2 = AccordionContent$1;
function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item,
    {
      "data-slot": "accordion-item",
      className: cn("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Trigger2,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      "data-slot": "accordion-content",
      className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}
const scoringRows = [
  {
    parameter: "Policy Status",
    weight: "25 pts",
    description: "Whether the policy was active and valid on the date of loss",
    isTotal: false
  },
  {
    parameter: "Cause of Fire",
    weight: "20 pts",
    description: "The legal classification of the fire's cause and coverage implications",
    isTotal: false
  },
  {
    parameter: "Fire Brigade Report",
    weight: "20 pts",
    description: "Availability of official corroborating evidence",
    isTotal: false
  },
  {
    parameter: "Reporting Delay",
    weight: "15 pts",
    description: "Timeliness of insurer notification per policy conditions",
    isTotal: false
  },
  {
    parameter: "Documents Submitted",
    weight: "10 pts",
    description: "Completeness of claim documentation",
    isTotal: false
  },
  {
    parameter: "Surveyor Report",
    weight: "10 pts",
    description: "Status of the insurer's own loss assessment",
    isTotal: false
  },
  {
    parameter: "Contextual Analysis",
    weight: "±10 pts",
    description: "Based on your detailed free-text descriptions",
    isTotal: false
  },
  {
    parameter: "TOTAL",
    weight: "100 pts",
    description: "",
    isTotal: true
  }
];
const scoreBands = [
  {
    label: "STRONG",
    range: "70–100",
    desc: "High legal viability",
    bgStyle: { background: "oklch(0.97 0.04 142)" },
    borderStyle: { borderColor: "oklch(0.85 0.08 142)" },
    textStyle: { color: "oklch(0.45 0.15 142)" },
    dotStyle: { background: "oklch(0.55 0.18 142)" }
  },
  {
    label: "MODERATE",
    range: "40–69",
    desc: "Improvable with remedial steps",
    bgStyle: { background: "oklch(0.97 0.04 65)" },
    borderStyle: { borderColor: "oklch(0.85 0.08 65)" },
    textStyle: { color: "oklch(0.50 0.14 65)" },
    dotStyle: { background: "oklch(0.60 0.16 65)" }
  },
  {
    label: "WEAK",
    range: "0–39",
    desc: "High denial risk",
    bgStyle: { background: "oklch(0.97 0.04 25)" },
    borderStyle: { borderColor: "oklch(0.85 0.08 25)" },
    textStyle: { color: "oklch(0.45 0.18 25)" },
    dotStyle: { background: "oklch(0.55 0.20 25)" }
  }
];
const cases = [
  {
    id: "case-1",
    cite: "New India Assurance Co. Ltd. v. Pradeep Kumar (2009) 7 SCC 787",
    forum: "Supreme Court",
    relevance: "Surveyor's report is not sacrosanct; consumer forums have power to grant compensation beyond surveyor's assessment when it is found arbitrary or incomplete."
  },
  {
    id: "case-2",
    cite: "United India Insurance Co. v. Manubhai Dharmasinhbhai Gajera (2008) 10 SCC 404",
    forum: "Supreme Court",
    relevance: "Mere delay in intimation does not justify repudiation if the insurer suffered no prejudice from the delay. Condition requiring immediate notice is directory, not mandatory."
  },
  {
    id: "case-3",
    cite: "Oriental Insurance Co. Ltd. v. Sony Cheriyan (1999) 6 SCC 451",
    forum: "Supreme Court",
    relevance: "Repudiation on technical/procedural grounds without genuine investigation constitutes deficiency of service under Consumer Protection Act."
  },
  {
    id: "case-4",
    cite: "Galada Power and Telecommunication Ltd. v. United India Insurance Co. Ltd. (NCDRC 2011)",
    forum: "NCDRC",
    relevance: "Electrical short circuit causing fire is an accidental cause covered under standard fire and special perils policy; insurer cannot classify it as mechanical breakdown exclusion."
  },
  {
    id: "case-5",
    cite: "National Insurance Co. Ltd. v. Nitin Khandelwal (2008) 11 SCC 259",
    forum: "Supreme Court",
    relevance: "In arson claims, burden of proof to establish willful fire by insured lies entirely on the insurer; mere suspicion is insufficient for repudiation."
  },
  {
    id: "case-6",
    cite: "LIC of India v. Consumer Education & Research Centre AIR 1995 SC 1811",
    forum: "Supreme Court",
    relevance: "Suppression of material fact must be judged by materiality test — only facts that would have altered underwriting decision are material; minor non-disclosures cannot void policy."
  },
  {
    id: "case-7",
    cite: "Pramod Kumar Arora v. United India Insurance Co. (NCDRC 2015)",
    forum: "NCDRC",
    relevance: "Insurer cannot repudiate solely on ground of document incompleteness without giving claimant reasonable opportunity to furnish missing documents."
  },
  {
    id: "case-8",
    cite: "Dhanna Lal v. New India Assurance Co. (SCDRC Rajasthan 2016)",
    forum: "SCDRC",
    relevance: "Where cause of fire is unknown/undetermined, insurer cannot repudiate without positive evidence of an exclusion clause applying; doubt must resolve in favour of insured."
  },
  {
    id: "case-9",
    cite: "Star Paper Mills Ltd. v. The Oriental Insurance Co. Ltd. (NCDRC 2018)",
    forum: "NCDRC",
    relevance: "Insurer's failure to appoint surveyor within stipulated time constitutes deficiency of service and cannot be used to delay or defeat the claim."
  },
  {
    id: "case-10",
    cite: "P. Chandramma v. New India Assurance Co. Ltd. (NCDRC 2019)",
    forum: "NCDRC",
    relevance: "FIR and fire brigade report corroboration is sufficient prima facie evidence of loss; insured need not produce forensic expert evidence unless insurer raises specific fraud allegation."
  }
];
const statutes = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 18, className: "text-[#c9a84c]" }),
    name: "Consumer Protection Act 2019",
    badge: "Primary Statute",
    details: [
      "Primary statute for filing consumer disputes against insurers.",
      "Provides District, State (SCDRC), and National (NCDRC) forums based on claim amount.",
      "Limitation period: 2 years from the date of cause of action.",
      "Enables compensation, costs, and punitive damages against deficient insurers."
    ]
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { size: 18, className: "text-[#c9a84c]" }),
    name: "Insurance Act 1938 — Section 45",
    badge: "Policy Law",
    details: [
      "Governs repudiation of policies on grounds of misrepresentation or fraud.",
      "Establishes the materiality test for non-disclosure — only underwriting-relevant facts are material.",
      "Restricts the insurer's right to void policies on non-disclosure after a defined period.",
      "Protects policyholders from arbitrary policy cancellations."
    ]
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 18, className: "text-[#c9a84c]" }),
    name: "IRDA (Protection of Policyholders' Interests) Regulations 2017",
    badge: "Regulatory",
    details: [
      "Mandates acknowledgement of claims within 3 days of receipt.",
      "Requires appointment of surveyor within 72 hours of loss intimation.",
      "Claims must be settled within 30 days of receipt of all required documents.",
      "Non-compliance constitutes deficiency of service cognisable under CPA 2019."
    ]
  }
];
const positiveFactors = [
  "Independent witness or third-party documentation of fire cause",
  "Engineer or forensic certificate confirming accidental cause",
  "Full cooperation demonstrated with insurer's surveyor",
  "FIR filed promptly on or shortly after the date of fire",
  "Cause of fire is consistent across FIR, fire brigade report, and surveyor's record"
];
const negativeFactors = [
  "Contradictions between FIR narrative and fire brigade report findings",
  "Prior arson suspicion or fraud allegation on record against the insured",
  "History of unpaid or lapsed premium before the date of loss",
  "Suspicious or inflated inventory claims unsupported by records",
  "Insurer has already issued a formal repudiation letter citing specific grounds"
];
function SectionDivider() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 my-10", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-[#c9a84c]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" })
  ] });
}
function SectionHeading({
  icon,
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#c9a84c]", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground", children: title })
  ] });
}
function ForumBadge({ forum }) {
  const colors = {
    "Supreme Court": "bg-[#1a2744]/10 text-[#1a2744] border-[#1a2744]/20",
    NCDRC: "bg-[#c9a84c]/10 text-[#8a6a1e] border-[#c9a84c]/30",
    SCDRC: "bg-accent/10 text-accent-foreground border-accent/20"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: `text-[10px] font-semibold px-2 py-0.5 shrink-0 ${colors[forum] ?? ""}`,
      children: forum
    }
  );
}
function ResourcesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 md:p-10 pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", "data-ocid": "resources.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 24, className: "text-[#c9a84c]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-headline-md text-foreground", children: "Methodology & Legal Resources" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-md text-muted-foreground", children: "How IndiShield analyses your fire insurance claim" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "resources.scoring_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeading,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { size: 20 }),
          title: "How Your Claim Score is Calculated"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground mb-5", children: "IndiShield uses a weighted scoring system based on 6 key legal and factual parameters. The base score is out of 90 points. A contextual free-text adjustment of up to ±10 points is applied based on your detailed descriptions, giving a final score out of 100." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg overflow-hidden border border-border mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-[#1a2744]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-white/90 uppercase tracking-wider", children: "Parameter" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 text-xs font-semibold text-white/90 uppercase tracking-wider w-24", children: "Weight" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-white/90 uppercase tracking-wider hidden sm:table-cell", children: "What it measures" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: scoringRows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: row.isTotal ? "bg-[#c9a84c]/10 border-t-2 border-[#c9a84c]/50" : i % 2 === 0 ? "bg-background border-t border-border" : "bg-muted/30 border-t border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  className: `px-4 py-3 ${row.isTotal ? "font-bold text-foreground" : "font-medium text-foreground"}`,
                  children: row.parameter
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-block text-xs font-bold font-mono px-2 py-0.5 rounded ${row.isTotal ? "bg-[#c9a84c] text-[#1a2744]" : row.weight.startsWith("±") ? "bg-accent/20 text-accent-foreground" : "bg-[#1a2744]/10 text-[#1a2744]"}`,
                  children: row.weight
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs hidden sm:table-cell", children: row.description })
            ]
          },
          row.parameter
        )) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: scoreBands.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-lg border px-3 py-3",
          style: { ...b.bgStyle, ...b.borderStyle },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full", style: b.dotStyle }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", style: b.textStyle, children: b.label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", style: b.textStyle, children: b.range }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-[11px] mt-0.5",
                style: { ...b.textStyle, opacity: 0.75 },
                children: b.desc
              }
            )
          ]
        },
        b.label
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionDivider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "resources.freetext_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeading,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 20 }),
          title: "How Contextual Analysis Works"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground mb-5", children: "The free-text modifier (±10 points) is calculated by the IndiShield backend, which analyses your detailed descriptions for specific legal and factual signals. All seven free-text responses are read together to determine whether the circumstances strengthen or weaken your legal position." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg border p-4",
            style: {
              background: "oklch(0.97 0.04 142)",
              borderColor: "oklch(0.85 0.08 142)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleCheck,
                  {
                    size: 15,
                    style: { color: "oklch(0.50 0.15 142)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-bold uppercase tracking-wide",
                    style: { color: "oklch(0.40 0.15 142)" },
                    children: "Positive Factors (+points)"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: positiveFactors.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex gap-2 text-xs",
                  style: { color: "oklch(0.40 0.15 142)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "mt-0.5 shrink-0",
                        style: { color: "oklch(0.55 0.18 142)" },
                        children: "•"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
                  ]
                },
                f
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg border p-4",
            style: {
              background: "oklch(0.97 0.04 25)",
              borderColor: "oklch(0.85 0.08 25)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 15, style: { color: "oklch(0.50 0.18 25)" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-bold uppercase tracking-wide",
                    style: { color: "oklch(0.40 0.18 25)" },
                    children: "Negative Factors (−points)"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: negativeFactors.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex gap-2 text-xs",
                  style: { color: "oklch(0.40 0.18 25)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "mt-0.5 shrink-0",
                        style: { color: "oklch(0.60 0.20 25)" },
                        children: "•"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
                  ]
                },
                f
              )) })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionDivider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "resources.cases_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeading,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { size: 20 }),
          title: "Legal Database — 10 Landmark Cases"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground mb-5", children: "IndiShield matches 2–4 of the most relevant cases from this database to your specific scenario. All cases are sourced from NCDRC, SCDRC public records, and the Supreme Court Cases reporter (SCC)." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Accordion,
        {
          type: "multiple",
          className: "space-y-2",
          "data-ocid": "resources.cases_accordion",
          children: cases.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            AccordionItem,
            {
              value: c.id,
              className: "border border-border rounded-lg px-0 overflow-hidden",
              "data-ocid": `resources.case.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "px-4 py-3 hover:no-underline hover:bg-muted/30 [&[data-state=open]]:bg-[#1a2744]/5 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-left min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-[#1a2744] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5", children: i + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground leading-snug pr-2", children: c.cite }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ForumBadge, { forum: c.forum })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "px-4 pb-4 pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-8 border-l-2 border-[#c9a84c]/40 pl-3 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: c.relevance }) }) })
              ]
            },
            c.id
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionDivider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "resources.statutes_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeading,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 20 }),
          title: "Governing Laws and Regulations"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: statutes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
            s.icon,
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-bold text-foreground leading-snug", children: s.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-[10px] font-semibold shrink-0 border-[#c9a84c]/40 text-[#8a6a1e] bg-[#c9a84c]/5",
              children: s.badge
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: s.details.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex gap-2 text-sm text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#c9a84c] mt-1 shrink-0", children: "›" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: d })
            ]
          },
          d
        )) }) })
      ] }, s.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionDivider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-lg border-2 border-[#c9a84c] bg-[#c9a84c]/8 px-5 py-4 mb-8",
        "data-ocid": "resources.limitation_alert",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 20, className: "text-[#c9a84c] shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-[#1a2744] mb-1", children: "⏰ Time Limit — Do Not Miss the Deadline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground leading-relaxed", children: [
              "Under the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Consumer Protection Act 2019" }),
              ", you have ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "2 years" }),
              " from the date of cause of action — usually the date of repudiation or the date of unreasonable delay — to file a consumer complaint. Missing this deadline will bar your claim and the forum will not entertain it."
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-lg border border-border bg-muted/40 px-5 py-4",
        "data-ocid": "resources.disclaimer",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TriangleAlert,
            {
              size: 16,
              className: "text-muted-foreground shrink-0 mt-0.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Disclaimer: " }),
            "This tool is designed for legal awareness and educational purposes only. The scoring model, case citations, and analysis provided do not constitute formal legal advice. Individual case outcomes depend on specific facts, documentation, and forum discretion. IndiShield strongly recommends consulting a qualified advocate specialising in consumer and insurance law before initiating any formal proceedings."
          ] })
        ] })
      }
    )
  ] }) });
}
export {
  ResourcesPage as default
};
