import type { Firm } from "../../api/firms";

import FirmCard from "./FirmCard";

interface FirmsGridProps {
  firms: Firm[];
  onEdit: (id: string) => void;
}

export default function FirmsGrid({
  firms,
  onEdit,
}: FirmsGridProps) {

  return (

    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

      {firms.map((firm) => (

        <FirmCard
          key={firm.id}
          firm={firm}
          onEdit={onEdit}
        />

      ))}

    </div>

  );

}
