import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../../components/layout/Layout";
import FirmForm from "../../components/firms/FirmForm";

import {
  createFirm,
} from "../../api/firms";

import type {
  FirmRequest,
} from "../../api/firms";

export default function CreateFirmPage() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    values: FirmRequest,
  ) {

    try {

      setLoading(true);

      await createFirm(values);

      toast.success(
        "Firm created successfully."
      );

      navigate("/firms");

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to create firm."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <Layout>

      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">

        <h1 className="mb-8 text-3xl font-bold">

          ➕ Create Firm

        </h1>

        <FirmForm

          submitLabel="Create Firm"

          loading={loading}

          onSubmit={handleSubmit}

        />

      </div>

    </Layout>

  );

}
