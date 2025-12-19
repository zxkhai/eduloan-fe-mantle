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
        <div className="flex justify-between text-xs text-[#4b6b80] mb-1">
          <span>Repaid: {formatMNT(repaid)}</span>
          <span>{progress}%</span>
        </div>
      )}
      <div className="h-2 bg-ocean/10 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--ocean-600), var(--ocean-400))' }}
        />
      </div>
    </div>
  );
}
