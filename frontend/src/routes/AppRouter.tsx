import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import DashboardPage from "../pages/Dashboard/DashboardPage";
import FirmsPage from "../pages/Firms/FirmsPage";
import InvoiceDetailsPage from "../pages/InvoiceDetails/InvoiceDetailsPage";
import InvoicesPage from "../pages/Invoices/InvoicesPage";
import LoginPage from "../pages/Login/LoginPage";
import UploadInvoicePage from "../pages/Upload/UploadInvoicePage";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ===========================
            Public Routes
        =========================== */}

        <Route
          path="/"
          element={<LoginPage />}
        />

        {/* ===========================
            Protected Routes
        =========================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadInvoicePage />
            </ProtectedRoute>
          }
        />

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

        {/* ===========================
            Firm Management
        =========================== */}

        <Route
          path="/firms"
          element={
            <ProtectedRoute>
              <FirmsPage />
            </ProtectedRoute>
          }
        />

        {/* ===========================
            Future Modules
        =========================== */}

        {/* Create Firm */}

        {/*
        <Route
          path="/firms/new"
          element={
            <ProtectedRoute>
              <CreateFirmPage />
            </ProtectedRoute>
          }
        />
        */}

        {/* Edit Firm */}

        {/*
        <Route
          path="/firms/:firmId/edit"
          element={
            <ProtectedRoute>
              <EditFirmPage />
            </ProtectedRoute>
          }
        />
        */}

        {/* Export */}

        {/*
        <Route
          path="/export"
          element={
            <ProtectedRoute>
              <ExportPage />
            </ProtectedRoute>
          }
        />
        */}

        {/* Settings */}

        {/*
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        */}

        {/* Profile */}

        {/*
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        */}

        {/* 404 */}

        {/*
        <Route
          path="*"
          element={<NotFoundPage />}
        />
        */}

      </Routes>

    </BrowserRouter>
  );
}
