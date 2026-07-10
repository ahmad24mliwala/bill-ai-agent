interface UploadProgressProps {
  visible: boolean;
}

export default function UploadProgress({
  visible,
}: UploadProgressProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">

      <h3 className="mb-4 text-lg font-semibold text-blue-700">
        🤖 AI Processing Invoice...
      </h3>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">

        <div className="h-full w-full animate-pulse rounded-full bg-blue-600" />

      </div>

      <p className="mt-4 text-gray-600">
        Uploading file...
      </p>

      <p className="text-gray-600">
        Extracting invoice using Gemini AI...
      </p>

      <p className="text-gray-600">
        Verifying GST...
      </p>

      <p className="text-gray-600">
        Saving invoice...
      </p>

    </div>
  );
}
