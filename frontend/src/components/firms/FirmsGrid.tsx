import type { Firm } from "../../api/firms";

import FirmCard from "./FirmCard";

interface FirmsGridProps {
  firms: Firm[];
  onEdit: (id: string) => void;
  onDelete: (firm: Firm) => void;
}

export default function FirmsGrid({
  firms,
  onEdit,
  onDelete,
}: FirmsGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {firms.map((firm) => (

        <FirmCard
          key={firm.id}
          firm={firm}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      ))}

    </div>
  );
}
