import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../../components/layout/Layout";

import {
  deleteFirm,
  getFirms,
} from "../../api/firms";

import type {
  Firm,
} from "../../api/firms";

import DeleteFirmDialog from "../../components/firms/DeleteFirmDialog";
import EmptyFirmState from "../../components/firms/EmptyFirmState";
import FirmSearch from "../../components/firms/FirmSearch";
import FirmsGrid from "../../components/firms/FirmsGrid";

export default function FirmsPage() {

  const navigate = useNavigate();

  const [firms, setFirms] =
    useState<Firm[]>([]);

  const [filteredFirms, setFilteredFirms] =
    useState<Firm[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedFirm, setSelectedFirm] =
    useState<Firm | null>(null);

  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);

  async function loadFirms() {

    try {

      setLoading(true);

      const data =
        await getFirms();

      setFirms(data);

      setFilteredFirms(data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to load firms."
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadFirms();

  }, []);

  useEffect(() => {

    const keyword =
      search.toLowerCase();

    setFilteredFirms(

      firms.filter((firm) =>

        firm.name
          .toLowerCase()
          .includes(keyword) ||

        (firm.gst_number ?? "")
          .toLowerCase()
          .includes(keyword)

      )

    );

  }, [
    search,
    firms,
  ]);

  function handleEdit(
    firmId: string,
  ) {

    navigate(
      `/firms/${firmId}/edit`
    );

  }

  function handleDelete(
    firm: Firm,
  ) {

    setSelectedFirm(firm);

    setShowDeleteDialog(true);

  }

  async function confirmDelete() {

    if (!selectedFirm) {

      return;

    }

    try {

      await deleteFirm(
        selectedFirm.id
      );

      toast.success(
        "Firm deleted successfully."
      );

      setShowDeleteDialog(false);

      setSelectedFirm(null);

      await loadFirms();

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to delete firm."
      );

    }

  }

  return (

    <Layout>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">

          <div>

            <h1 className="text-3xl font-bold">

              🏢 Firm Management

            </h1>

            <p className="mt-2 text-gray-500">

              Manage companies used for invoice
              processing.

            </p>

          </div>

          <button

            onClick={() =>
              navigate("/firms/new")
            }

            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"

          >

            + New Firm

          </button>

        </div>

        {/* Search */}

        <FirmSearch

          value={search}

          onChange={setSearch}

        />

        {/* Content */}

        {loading ? (

          <div className="rounded-2xl bg-white p-12 text-center shadow">

            <p className="text-lg font-medium">

              Loading firms...

            </p>

          </div>

        ) : filteredFirms.length === 0 ? (

          <EmptyFirmState />

        ) : (

          <FirmsGrid

            firms={filteredFirms}

            onEdit={handleEdit}

            onDelete={handleDelete}

          />

        )}

      </div>

      <DeleteFirmDialog

        open={showDeleteDialog}

        firmName={
          selectedFirm?.name ?? ""
        }

        onCancel={() => {

          setShowDeleteDialog(false);

          setSelectedFirm(null);

        }}

        onDelete={confirmDelete}

      />

    </Layout>

  );

}
