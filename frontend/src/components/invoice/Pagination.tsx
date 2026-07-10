interface PaginationProps {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="mt-8 flex items-center justify-between">

      <button
        onClick={onPrevious}
        disabled={page === 1}
        className="rounded-xl bg-slate-700 px-5 py-3 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        ← Previous
      </button>

      <div className="text-lg font-semibold text-slate-700">
        Page {page} of {totalPages}
      </div>

      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Next →
      </button>

    </div>
  );
}
