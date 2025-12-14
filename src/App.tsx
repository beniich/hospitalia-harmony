import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import DashboardPage from "@/app/dashboard/DashboardPage";
import PatientsPage from "@/app/patients/PatientsPage";
import StaffPage from "@/app/staff/StaffPage";
import AppointmentsPage from "@/app/appointments/AppointmentsPage";
import ServicesPage from "@/app/services/ServicesPage";
import BillingPage from "@/app/billing/BillingPage";
import ReportsPage from "@/app/reports/ReportsPage";
import InventoryPage from "@/app/inventory/InventoryPage";
import SettingsPage from "@/app/settings/SettingsPage";
import CalendarPage from "@/app/calendar/CalendarPage";

import { ThemeProvider } from "@/components/theme/ThemeProvider";

const queryClient = new QueryClient();

import { AuthProvider, useAuth } from "@/context/AuthContext";
import LoginPage from "@/app/auth/LoginPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div>Chargement...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/inventory" element={<InventoryPage />} />
                        <Route path="/calendar" element={<CalendarPage />} />
                        <Route path="/patients" element={<PatientsPage />} />
                        <Route path="/staff" element={<StaffPage />} />
                        <Route path="/appointments" element={<AppointmentsPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/billing" element={<BillingPage />} />
                        <Route path="/reports" element={<ReportsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;