import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../../components/layout/Layout";
import FileDropZone from "../../components/upload/FileDropZone";
import UploadProgress from "../../components/upload/UploadProgress";

import { getFirms } from "../../api/firms";
import { uploadInvoice } from "../../api/upload";

interface Firm {
  id: string;
  name: string;
}

export default function UploadInvoicePage() {
  const navigate = useNavigate();

  const [firms, setFirms] = useState<Firm[]>([]);

  const [firmId, setFirmId] = useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadFirms() {
      try {
        const data = await getFirms();
        setFirms(data);
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load firms."
        );
      }
    }

    loadFirms();
  }, []);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!firmId) {
      setError(
        "Please select a firm."
      );
      return;
    }

    if (!file) {
      setError(
        "Please select an invoice."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      await uploadInvoice(
        firmId,
        file
      );

      toast.success(
        "Invoice uploaded successfully!"
      );

      navigate("/invoices");

    } catch (error) {
      console.error(error);

      toast.error(
        "Upload failed."
      );

      setError(
        "Upload failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>

      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-slate-800">
            📤 Upload Invoice
          </h1>

          <p className="mt-2 text-gray-500">
            Upload your invoice and let Gemini AI
            automatically extract all invoice
            information.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          <div>

            <label className="mb-2 block font-semibold">
              Select Firm
            </label>

            <select
              value={firmId}
              onChange={(e) =>
                setFirmId(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >

              <option value="">
                Select Firm
              </option>

              {firms.map((firm) => (
                <option
                  key={firm.id}
                  value={firm.id}
                >
                  {firm.name}
                </option>
              ))}

            </select>

          </div>

          <div>

            <label className="mb-3 block font-semibold">
              Invoice File
            </label>

            <FileDropZone
              file={file}
              onFileSelect={setFile}
            />

          </div>

          <UploadProgress
            visible={loading}
          />

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >

            {loading
              ? "🤖 Processing Invoice..."
              : "🚀 Upload Invoice"}

          </button>

        </form>

      </div>

    </Layout>
  );
}
