import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import { PWAInstallProvider } from "./context/PWAInstallProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./components/Loader";
import ErrorBoundary from "./components/ErrorBoundry";

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Subject = lazy(() => import("./pages/Subject"));
const LoginVerify = lazy(() => import("./pages/LoginVerify"));
const ProtectedRoutes = lazy(() => import("./components/ProtectedRoutes"));
const AdminProtected = lazy(() => import("./components/AdminProtected"));
const PdfViewer = lazy(() => import("./pages/PdfViewer"));
const Profile = lazy(() => import("./pages/Profile"));
const DownloadSubject = lazy(() => import("./pages/DownloadSubject"));
const DownloadPdfViewer = lazy(() => import("./pages/DownloadPdfViewer"));
const Search = lazy(() => import("./pages/Search"));
const Admin = lazy(() => import("./pages/Admin"));
const AllSubject = lazy(() => import("./pages/AllSubject"));

const queryClient = new QueryClient();

function App() {
  // Setup Routes

  const routes = createBrowserRouter([
    {
      path: "*",
      element: <Navigate to={"/home"} replace />,
    },
    {
      element: (
        <Suspense
          fallback={
            <div className="h-dvh w-full justify-center items-center flex">
              <Loader />
            </div>
          }
        >
          <Login />
        </Suspense>
      ),
      path: "/login",
    },
    {
      element: (
        <Suspense
          fallback={
            <div className="h-dvh w-full justify-center items-center flex">
              <Loader />
            </div>
          }
        >
          <LoginVerify />
        </Suspense>
      ),
      path: "/auth/success/",
    },

    {
      element: (
        <Suspense
          fallback={
            <div className="h-dvh w-full justify-center items-center flex">
              <Loader />
            </div>
          }
        >
          <Home />
        </Suspense>
      ),
      path: "/",
      errorElement: <ErrorBoundary />,
    },
    {
      element: (
        <ProtectedRoutes>
          <Suspense
            fallback={
              <div className="h-dvh w-full justify-center items-center flex">
                <Loader />
              </div>
            }
          >
            <Subject />
          </Suspense>
        </ProtectedRoutes>
      ),
      path: "/subject/:subjectId",
      errorElement: <ErrorBoundary />,
    },
    {
      element: (
        <ProtectedRoutes>
          <Suspense
            fallback={
              <div className="h-dvh w-full justify-center items-center flex">
                <Loader />
              </div>
            }
          >
            <PdfViewer />
          </Suspense>
        </ProtectedRoutes>
      ),
      path: "/pdf/:id",
      errorElement: <ErrorBoundary />,
    },
    {
      element: (
        <ProtectedRoutes>
          <Suspense
            fallback={
              <div className="h-dvh w-full justify-center items-center flex">
                <Loader />
              </div>
            }
          >
            <AllSubject />
          </Suspense>
        </ProtectedRoutes>
      ),
      path: "/all-subjects",
      errorElement: <ErrorBoundary />,
    },
    {
      element: (
        <ProtectedRoutes>
          <Suspense
            fallback={
              <div className="h-dvh w-full justify-center items-center flex">
                <Loader />
              </div>
            }
          >
            <Profile />
          </Suspense>
        </ProtectedRoutes>
      ),
      path: "/profile",
      errorElement: <ErrorBoundary />,
    },
    // {
    //   path: "/bookmark",
    //   element: <Bookmark />,
    // },
    {
      path: "/search",
      errorElement: <ErrorBoundary />,
      element: (
        <ProtectedRoutes>
          <Suspense
            fallback={
              <div className="h-dvh w-full justify-center items-center flex">
                <Loader />
              </div>
            }
          >
            <Search />
          </Suspense>
        </ProtectedRoutes>
      ),
    },
    {
      path: "/download/subject/:subjectId",
      errorElement: <ErrorBoundary />,
      element: (
        <Suspense
          fallback={
            <div className="h-dvh w-full justify-center items-center flex">
              <Loader />
            </div>
          }
        >
          <DownloadSubject />
        </Suspense>
      ),
    },
    {
      element: (
        <Suspense
          fallback={
            <div className="h-dvh w-full justify-center items-center flex">
              <Loader />
            </div>
          }
        >
          <DownloadPdfViewer />
        </Suspense>
      ),
      path: "/download/pdf",
      errorElement: <ErrorBoundary />,
    },

    {
      element: (
        <AdminProtected>
          <Suspense
            fallback={
              <div className="h-dvh w-full justify-center items-center flex">
                <Loader />
              </div>
            }
          >
            <Admin />
          </Suspense>
        </AdminProtected>
      ),
      path: "/admin/:page",
      errorElement: <ErrorBoundary />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <PWAInstallProvider>
        <RouterProvider router={routes} />
      </PWAInstallProvider>
    </QueryClientProvider>
  );
}

export default App;
