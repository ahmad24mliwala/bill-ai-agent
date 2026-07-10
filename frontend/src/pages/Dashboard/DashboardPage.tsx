import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Layout from "../../components/layout/Layout";

import DashboardCards from "../../components/dashboard/DashboardCards";
import MonthlyRevenueChart from "../../components/dashboard/MonthlyRevenueChart";
import GSTPieChart from "../../components/dashboard/GSTPieChart";
import TopVendors from "../../components/dashboard/TopVendors";
import RecentInvoices from "../../components/dashboard/RecentInvoices";

import {
  getDashboard,
} from "../../api/dashboard";

import type {
  DashboardResponse,
} from "../../api/dashboard";

export default function DashboardPage() {

  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadDashboard() {

      try {

        const data =
          await getDashboard();

        setDashboard(data);

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to load dashboard."
        );

      } finally {

        setLoading(false);

      }

    }

    loadDashboard();

  }, []);

  if (loading) {

    return (

      <Layout>

        <div className="flex h-[80vh] items-center justify-center">

          <div className="text-center">

            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

            <h2 className="text-xl font-semibold">

              Loading Dashboard...

            </h2>

          </div>

        </div>

      </Layout>

    );

  }

  if (!dashboard) {

    return (

      <Layout>

        <div className="flex h-[80vh] items-center justify-center">

          <h2 className="text-xl text-red-600">

            Unable to load dashboard.

          </h2>

        </div>

      </Layout>

    );

  }

  return (

    <Layout>

      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-4xl font-bold text-slate-800">

            📊 AI Bill Dashboard

          </h1>

          <p className="mt-2 text-slate-500">

            Monitor invoices, GST verification,
            vendors and AI processing insights.

          </p>

        </div>

        {/* KPI Cards */}

        <DashboardCards

          totalInvoices={
            dashboard.summary.total_invoices
          }

          totalRevenue={
            dashboard.summary.total_amount
          }

          gstVerified={
            dashboard.summary.gst_verified
          }

          gstMismatch={
            dashboard.summary.gst_mismatched
          }

        />

        {/* Charts */}

        <div className="grid gap-8 lg:grid-cols-2">

          <MonthlyRevenueChart
            data={
              dashboard.monthly_trend
            }
          />

          <GSTPieChart
            data={
              dashboard.gst_distribution
            }
          />

        </div>

        {/* Vendors + Recent */}

        <div className="grid gap-8 xl:grid-cols-3">

          <div>

            <TopVendors
              vendors={
                dashboard.top_vendors
              }
            />

          </div>

          <div className="xl:col-span-2">

            <RecentInvoices
              invoices={
                dashboard.recent_invoices
              }
            />

          </div>

        </div>

      </div>

    </Layout>

  );

}
