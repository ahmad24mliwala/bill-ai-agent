import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import Layout from "../../components/layout/Layout";
import FirmForm from "../../components/firms/FirmForm";

import {
  getFirm,
  updateFirm,
} from "../../api/firms";

import type {
  Firm,
  FirmRequest,
} from "../../api/firms";

export default function EditFirmPage() {

  const navigate = useNavigate();

  const { firmId } = useParams();

  const [firm, setFirm] =
    useState<Firm | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    async function loadFirm() {

      if (!firmId) {

        toast.error("Invalid firm.");

        navigate("/firms");

        return;

      }

      try {

        setLoading(true);

        const data =
          await getFirm(firmId);

        setFirm(data);

      } catch (error) {

        console.error(error);

        toast.error(
          "Unable to load firm."
        );

        navigate("/firms");

      } finally {

        setLoading(false);

      }

    }

    loadFirm();

  }, [
    firmId,
    navigate,
  ]);

  async function handleSubmit(
    values: FirmRequest,
  ) {

    if (!firmId) {

      return;

    }

    try {

      setSaving(true);

      await updateFirm(
        firmId,
        values,
      );

      toast.success(
        "Firm updated successfully."
      );

      navigate("/firms");

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to update firm."
      );

    } finally {

      setSaving(false);

    }

  }

  if (loading) {

    return (

      <Layout>

        <div className="p-10 text-center">

          Loading firm...

        </div>

      </Layout>

    );

  }

  if (!firm) {

    return (

      <Layout>

        <div className="p-10 text-center">

          Firm not found.

        </div>

      </Layout>

    );

  }

  return (

    <Layout>

      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">

        <h1 className="mb-8 text-3xl font-bold">

          ✏ Edit Firm

        </h1>

        <FirmForm

          initialValues={{

            name: firm.name,

            gst_number:
              firm.gst_number ?? "",

            phone:
              firm.phone ?? "",

            email:
              firm.email ?? "",

            address:
              firm.address ?? "",

            is_active:
              firm.is_active,

          }}

          loading={saving}

          submitLabel="Update Firm"

          onSubmit={handleSubmit}

        />

      </div>

    </Layout>

  );

}
