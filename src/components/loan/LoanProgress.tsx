import { formatMNT, calculateProgress } from '../../lib/format';

interface LoanProgressProps {
  repaid: bigint;
  total: bigint;
  showLabels?: boolean;
}

export function LoanProgress({ repaid, total, showLabels = true }: LoanProgressProps) {
  const progress = calculateProgress(repaid, total);

  return (
    <div>
      {showLabels && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Repaid: {formatMNT(repaid)}</span>
          <span>{progress}%</span>
        </div>
      )}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#F2A9DD] via-[#C8B2F5] to-[#F7FAE4] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
