import { useState } from "react";

import type {
  FirmRequest,
} from "../../api/firms";

interface FirmFormProps {
  initialValues?: FirmRequest;
  loading?: boolean;
  submitLabel: string;
  onSubmit: (
    values: FirmRequest,
  ) => Promise<void>;
}

export default function FirmForm({
  initialValues,
  loading = false,
  submitLabel,
  onSubmit,
}: FirmFormProps) {

  const [form, setForm] =
    useState<FirmRequest>({
      name: initialValues?.name ?? "",
      gst_number:
        initialValues?.gst_number ?? "",
      phone:
        initialValues?.phone ?? "",
      email:
        initialValues?.email ?? "",
      address:
        initialValues?.address ?? "",
      is_active:
        initialValues?.is_active ?? true,
    });

  function updateField(
    field: keyof FirmRequest,
    value: string | boolean,
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    await onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Name */}

      <div>

        <label className="mb-2 block font-medium">
          Firm Name
        </label>

        <input
          required
          value={form.name}
          onChange={(e) =>
            updateField(
              "name",
              e.target.value,
            )
          }
          className="w-full rounded-xl border p-3"
        />

      </div>

      {/* GST */}

      <div>

        <label className="mb-2 block font-medium">
          GST Number
        </label>

        <input
          value={form.gst_number}
          onChange={(e) =>
            updateField(
              "gst_number",
              e.target.value,
            )
          }
          className="w-full rounded-xl border p-3"
        />

      </div>

      {/* Phone */}

      <div>

        <label className="mb-2 block font-medium">
          Phone
        </label>

        <input
          value={form.phone}
          onChange={(e) =>
            updateField(
              "phone",
              e.target.value,
            )
          }
          className="w-full rounded-xl border p-3"
        />

      </div>

      {/* Email */}

      <div>

        <label className="mb-2 block font-medium">
          Email
        </label>

        <input
          type="email"
          value={form.email}
          onChange={(e) =>
            updateField(
              "email",
              e.target.value,
            )
          }
          className="w-full rounded-xl border p-3"
        />

      </div>

      {/* Address */}

      <div>

        <label className="mb-2 block font-medium">
          Address
        </label>

        <textarea
          rows={4}
          value={form.address}
          onChange={(e) =>
            updateField(
              "address",
              e.target.value,
            )
          }
          className="w-full rounded-xl border p-3"
        />

      </div>

      {/* Active */}

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) =>
            updateField(
              "is_active",
              e.target.checked,
            )
          }
        />

        <label>

          Active Firm

        </label>

      </div>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
      >

        {loading
          ? "Saving..."
          : submitLabel}

      </button>

    </form>
  );
}
