import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";

// Lazy load pages
const HomePage = lazy(() => import("./pages/Home"));
const AssessmentPage = lazy(() => import("./pages/Assessment"));
const AssessmentResultPage = lazy(() => import("./pages/AssessmentResult"));
const HistoryPage = lazy(() => import("./pages/History"));
const ResourcesPage = lazy(() => import("./pages/Resources"));

function PageLoader() {
  return (
    <div className="p-8 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
      <Skeleton className="h-4 w-80" />
    </div>
  );
}

// Root layout route
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <HomePage />,
});

const assessmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/assessment",
  component: () => <AssessmentPage />,
});

const assessmentResultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/assessment/$assessmentId",
  component: () => <AssessmentResultPage />,
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: () => <HistoryPage />,
});

const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resources",
  component: () => <ResourcesPage />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  assessmentRoute,
  assessmentResultRoute,
  historyRoute,
  resourcesRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
