import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface FirmSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FirmSearch({
  value,
  onChange,
}: FirmSearchProps) {
  return (
    <div className="relative">

      <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search firms..."
        className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600"
      />

    </div>
  );
}
