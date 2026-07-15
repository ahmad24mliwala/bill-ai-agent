import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import DashboardPage from "../pages/Dashboard/DashboardPage";
import ExportPage from "../pages/Export/ExportPage";

import CreateFirmPage from "../pages/Firms/CreateFirmPage";
import EditFirmPage from "../pages/Firms/EditFirmPage";
import FirmsPage from "../pages/Firms/FirmsPage";

import InvoiceDetailsPage from "../pages/InvoiceDetails/InvoiceDetailsPage";
import InvoicesPage from "../pages/Invoices/InvoicesPage";

import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";

import SettingsPage from "../pages/Settings/SettingsPage";

import UploadInvoicePage from "../pages/Upload/UploadInvoicePage";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =====================================
                    Public Routes
        ====================================== */}

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* =====================================
                  Protected Routes
        ====================================== */}

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Invoice Upload */}

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadInvoicePage />
            </ProtectedRoute>
          }
        />

        {/* Invoice Management */}

        <Route
          path="/invoices"
          element={
            <ProtectedRoute>
              <InvoicesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/invoices/:invoiceId"
          element={
            <ProtectedRoute>
              <InvoiceDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* Firm Management */}

        <Route
          path="/firms"
          element={
            <ProtectedRoute>
              <FirmsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/firms/new"
          element={
            <ProtectedRoute>
              <CreateFirmPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/firms/:firmId/edit"
          element={
            <ProtectedRoute>
              <EditFirmPage />
            </ProtectedRoute>
          }
        />

        {/* Export */}

        <Route
          path="/export"
          element={
            <ProtectedRoute>
              <ExportPage />
            </ProtectedRoute>
          }
        />

        {/* Settings */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* =====================================
                  Future Modules
        ====================================== */}

        {/*
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
        */}

      </Routes>

    </BrowserRouter>

  );

}
