interface DeleteFirmDialogProps {

  open: boolean;

  firmName: string;

  onCancel: () => void;

  onDelete: () => void;

}

export default function DeleteFirmDialog({

  open,

  firmName,

  onCancel,

  onDelete,

}: DeleteFirmDialogProps) {

  if (!open) {

    return null;

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-2xl bg-white p-8">

        <h2 className="mb-4 text-2xl font-bold">

          Delete Firm

        </h2>

        <p className="mb-8">

          Are you sure you want to delete

          <strong>

            {" "}
            {firmName}

          </strong>

          ?

        </p>

        <div className="flex justify-end gap-4">

          <button
            onClick={onCancel}
            className="rounded-xl border px-5 py-2"
          >

            Cancel

          </button>

          <button
            onClick={onDelete}
            className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >

            Delete

          </button>

        </div>

      </div>

    </div>

  );

}
