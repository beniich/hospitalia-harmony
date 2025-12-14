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
import SettingsPage from "@/app/settings/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;