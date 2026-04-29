import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "@/layouts/AppLayout";
import { LoginPage } from "@/pages/Login/LoginPage";
import { DashboardPage } from "@/pages/Dashboard/DashboardPage";
import { AnalyticsPage } from "@/pages/Analytics/AnalyticsPage";
import { PatientsPage } from "@/pages/Patients/PatientsPage";
import { PatientDetailPage } from "@/pages/PatientDetail/PatientDetailPage";
import { NotFoundPage } from "@/pages/NotFound/NotFoundPage";
import { Spinner } from "@/components/ui/Spinner";
import { ROUTES } from "@/constants/routes";

const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center">
    <Spinner size="lg" />
  </div>
);

export const AppRouter: React.FC = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path={ROUTES.LOGIN}
            element={
              isAuthenticated ? (
                <Navigate to={ROUTES.DASHBOARD} replace />
              ) : (
                <LoginPage />
              )
            }
          />

          <Route
            path="/"
            element={
              <Navigate
                to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN}
                replace
              />
            }
          />

          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <AppLayout>
                  <DashboardPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ANALYTICS}
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AnalyticsPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PATIENTS}
            element={
              <ProtectedRoute>
                <AppLayout>
                  <PatientsPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PATIENT_DETAIL}
            element={
              <ProtectedRoute>
                <AppLayout>
                  <PatientDetailPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
