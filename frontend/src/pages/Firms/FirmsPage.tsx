import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  PlusIcon,
} from "@heroicons/react/24/outline";

import Layout from "../../components/layout/Layout";

import FirmSearch from "../../components/firms/FirmSearch";
import FirmsGrid from "../../components/firms/FirmsGrid";
import EmptyFirmState from "../../components/firms/EmptyFirmState";

import {
  getFirms,
} from "../../api/firms";

import type {
  Firm,
} from "../../components/firms/FirmCard";

export default function FirmsPage() {

  const navigate = useNavigate();

  const [firms, setFirms] =
    useState<Firm[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    async function loadFirms() {

      try {

        const data =
          await getFirms();

        setFirms(data);

      } catch (error) {

        console.error(error);

        toast.error(
          "Unable to load firms."
        );

      } finally {

        setLoading(false);

      }

    }

    loadFirms();

  }, []);

  const filteredFirms =
    useMemo(() => {

      const keyword =
        search.toLowerCase();

      return firms.filter((firm) =>
        firm.name
          .toLowerCase()
          .includes(keyword)
      );

    }, [
      firms,
      search,
    ]);

  function handleEdit(
    id: string,
  ) {

    navigate(
      `/firms/${id}/edit`
    );

  }

  return (

    <Layout>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">

              🏢 Firm Management

            </h1>

            <p className="mt-2 text-slate-500">

              Manage companies that upload invoices.

            </p>

          </div>

          <button
            onClick={() =>
              navigate("/firms/new")
            }
            className="flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >

            <PlusIcon className="mr-2 h-5 w-5" />

            Add Firm

          </button>

        </div>

        {/* Search */}

        <FirmSearch
          value={search}
          onChange={setSearch}
        />

        {/* Loading */}

        {loading ? (

          <div className="rounded-2xl bg-white p-16 text-center shadow">

            <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

            <p className="text-lg font-semibold">

              Loading Firms...

            </p>

          </div>

        ) : filteredFirms.length === 0 ? (

          <EmptyFirmState />

        ) : (

          <FirmsGrid
            firms={filteredFirms}
            onEdit={handleEdit}
          />

        )}

      </div>

    </Layout>

  );

}
