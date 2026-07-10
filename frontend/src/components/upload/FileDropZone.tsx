import {
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";

import {
  useRef,
  useState,
} from "react";

interface FileDropZoneProps {
  file: File | null;
  onFileSelect: (
    file: File | null
  ) => void;
}

export default function FileDropZone({
  file,
  onFileSelect,
}: FileDropZoneProps) {

  const inputRef =
    useRef<HTMLInputElement>(null);

  const [dragging, setDragging] =
    useState(false);

  function handleFiles(
    files: FileList | null
  ) {
    if (!files?.length) return;

    onFileSelect(files[0]);
  }

  function handleDrop(
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();

    setDragging(false);

    handleFiles(
      event.dataTransfer.files
    );
  }

  function handleBrowse(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    handleFiles(
      event.target.files
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() =>
        setDragging(false)
      }
      onDrop={handleDrop}
      onClick={() =>
        inputRef.current?.click()
      }
      className={`
        cursor-pointer
        rounded-2xl
        border-2
        border-dashed
        p-10
        text-center
        transition-all
        duration-300

        ${
          dragging
            ? "border-blue-600 bg-blue-50"
            : "border-slate-300 bg-slate-50 hover:border-blue-500 hover:bg-blue-50"
        }
      `}
    >

      <CloudArrowUpIcon
        className="mx-auto h-16 w-16 text-blue-600"
      />

      <h3 className="mt-4 text-xl font-semibold">
        Drag & Drop Invoice
      </h3>

      <p className="mt-2 text-gray-500">
        PDF or Image
      </p>

      <button
        type="button"
        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
      >
        Browse Files
      </button>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".pdf,image/*"
        onChange={handleBrowse}
      />

      {file && (

        <div className="mt-8 rounded-xl bg-white p-5 shadow">

          <p className="text-lg font-semibold">
            📄 {file.name}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {(file.size / 1024 / 1024).toFixed(2)}
            {" "}MB
          </p>

        </div>

      )}

    </div>
  );
}
