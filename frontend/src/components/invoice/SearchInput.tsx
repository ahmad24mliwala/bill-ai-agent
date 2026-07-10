import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <div className="relative w-full">

      <MagnifyingGlassIcon
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

    </div>
  );
}
