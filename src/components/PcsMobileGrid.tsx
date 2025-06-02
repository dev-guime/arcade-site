
import { PcCard } from "@/components/PcCard";

interface PcsMobileGridProps {
  pcs: Array<{
    id: number;
    name: string;
    price: string;
    description: string;
    specs: string[];
    highlight: boolean;
  }>;
  hoveredId: number | null;
  borderColors: {[key: number]: string};
  setHoveredId: (id: number | null) => void;
}

export const PcsMobileGrid = ({ pcs, hoveredId, borderColors, setHoveredId }: PcsMobileGridProps) => {
  return (
    <div className="block md:hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pcs.map((pc) => (
          <PcCard
            key={pc.id}
            pc={pc}
            hoveredId={hoveredId}
            borderColors={borderColors}
            onMouseEnter={() => setHoveredId(pc.id)}
            onMouseLeave={() => setHoveredId(null)}
            variant="mobile"
          />
        ))}
      </div>
    </div>
  );
};
